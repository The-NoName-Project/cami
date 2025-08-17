"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Upload, X, Plus, GripVertical } from "lucide-react"

interface ImageData {
  id: string
  url: string
  caption: string
}

interface MultiImageUploadProps {
  onImagesChange: (images: ImageData[]) => void
  initialImages?: ImageData[]
}

export function MultiImageUpload({ onImagesChange, initialImages = [] }: MultiImageUploadProps) {
  const [images, setImages] = useState<ImageData[]>(initialImages)
  const [uploading, setUploading] = useState(false)

  const addImage = () => {
    const newImage: ImageData = {
      id: Math.random().toString(36).substr(2, 9),
      url: "",
      caption: "",
    }
    const updatedImages = [...images, newImage]
    setImages(updatedImages)
    onImagesChange(updatedImages)
  }

  const removeImage = (id: string) => {
    const updatedImages = images.filter((img) => img.id !== id)
    setImages(updatedImages)
    onImagesChange(updatedImages)
  }

  const updateImage = (id: string, field: "url" | "caption", value: string) => {
    const updatedImages = images.map((img) => (img.id === id ? { ...img, [field]: value } : img))
    setImages(updatedImages)
    onImagesChange(updatedImages)
  }

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>, imageId: string) => {
    const file = event.target.files?.[0]
    if (!file) return

    setUploading(true)

    try {
      // Simulamos la subida de imagen - en producción usarías un servicio como Cloudinary, AWS S3, etc.
      const reader = new FileReader()
      reader.onload = (e) => {
        const url = e.target?.result as string
        updateImage(imageId, "url", url)
        setUploading(false)
      }
      reader.readAsDataURL(file)
    } catch (error) {
      console.error("Error subiendo imagen:", error)
      setUploading(false)
    }
  }

  const moveImage = (fromIndex: number, toIndex: number) => {
    const updatedImages = [...images]
    const [movedImage] = updatedImages.splice(fromIndex, 1)
    updatedImages.splice(toIndex, 0, movedImage)
    setImages(updatedImages)
    onImagesChange(updatedImages)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label className="text-base font-medium">Imágenes del Proyecto</Label>
        <Button type="button" variant="outline" size="sm" onClick={addImage}>
          <Plus className="w-4 h-4 mr-2" />
          Añadir Imagen
        </Button>
      </div>

      {images.length === 0 ? (
        <Card className="border-2 border-dashed border-gray-300">
          <CardContent className="flex items-center justify-center py-12">
            <div className="text-center">
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 mb-4">No hay imágenes añadidas</p>
              <Button type="button" variant="outline" onClick={addImage}>
                <Plus className="w-4 h-4 mr-2" />
                Añadir Primera Imagen
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {images.map((image, index) => (
            <Card key={image.id} className="p-4">
              <div className="flex items-start gap-4">
                <div className="flex flex-col items-center gap-2">
                  <GripVertical className="w-5 h-5 text-gray-400 cursor-move" />
                  <span className="text-sm text-gray-500">#{index + 1}</span>
                </div>

                <div className="flex-1 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Subir archivo</Label>
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileUpload(e, image.id)}
                        disabled={uploading}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>O URL de imagen</Label>
                      <Input
                        type="url"
                        placeholder="https://ejemplo.com/imagen.jpg"
                        value={image.url}
                        onChange={(e) => updateImage(image.id, "url", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Descripción de la imagen (opcional)</Label>
                    <Textarea
                      placeholder="Describe esta imagen..."
                      value={image.caption}
                      onChange={(e) => updateImage(image.id, "caption", e.target.value)}
                      className="min-h-[80px]"
                    />
                  </div>

                  {image.url && (
                    <div className="mt-4">
                      <img
                        src={image.url || "/placeholder.svg"}
                        alt={image.caption || `Imagen ${index + 1}`}
                        className="w-full h-48 object-cover rounded-lg border"
                      />
                    </div>
                  )}
                </div>

                <Button type="button" variant="destructive" size="sm" onClick={() => removeImage(image.id)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Hidden inputs para el formulario */}
      {images.map((image, index) => (
        <div key={`hidden-${image.id}`}>
          <input type="hidden" name="imageUrls" value={image.url} />
          <input type="hidden" name="imageCaptions" value={image.caption} />
        </div>
      ))}
    </div>
  )
}

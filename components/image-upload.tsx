"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Upload, X } from "lucide-react"
import Image from "next/image";

interface ImageUploadProps {
  onImageUpload: (url: string) => void
  currentImage?: string
}

export function ImageUpload({ onImageUpload, currentImage }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [imageUrl, setImageUrl] = useState(currentImage || "")

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setUploading(true)

    try {
      // Simulamos la subida de imagen - en producción usarías un servicio como Cloudinary, AWS S3, etc.
      // Por ahora, creamos una URL temporal para demostración
      const reader = new FileReader()
      reader.onload = (e) => {
        const url = e.target?.result as string
        setImageUrl(url)
        onImageUpload(url)
        setUploading(false)
      }
      reader.readAsDataURL(file)
    } catch (error) {
      console.error("Error subiendo imagen:", error)
      setUploading(false)
    }
  }

  const handleUrlInput = (url: string) => {
    setImageUrl(url)
    onImageUpload(url)
  }

  const clearImage = () => {
    setImageUrl("")
    onImageUpload("")
  }

  return (
    <div className="space-y-4">
      <Label>Imagen de la Maquinaria</Label>

      {imageUrl ? (
        <div className="relative">
          <Image
            src={imageUrl || "/placeholder.svg"}
            alt="Preview"
            className="w-full h-48 object-cover rounded-lg border"
          />
          <Button type="button" variant="destructive" size="sm" className="absolute top-2 right-2" onClick={clearImage}>
            <X className="w-4 h-4" />
          </Button>
        </div>
      ) : (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 mb-4">Sube una imagen o ingresa una URL</p>
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="file-upload">Subir archivo</Label>
        <Input id="file-upload" type="file" accept="image/*" onChange={handleFileUpload} disabled={uploading} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="image-url">O ingresa una URL de imagen</Label>
        <Input
          id="image-url"
          type="url"
          placeholder="https://ejemplo.com/imagen.jpg"
          value={imageUrl}
          onChange={(e) => handleUrlInput(e.target.value)}
        />
      </div>

      <input type="hidden" name="imageUrl" value={imageUrl} />
    </div>
  )
}

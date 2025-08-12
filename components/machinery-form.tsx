"use client"

import {useActionState, useState} from "react"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {Textarea} from "@/components/ui/textarea"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {ImageUpload} from "./image-upload"
import {createMachinery, updateMachinery} from "@/app/actions/machinery"

interface MachineryFormProps {
    machinery?: {
        id: number
        name: string
        description: string | null
        ability: boolean
        image: string | null
    }
    onSuccess?: () => void
}

interface ActionResult {
    success: boolean
    message: string
}

export function MachineryForm({machinery, onSuccess}: MachineryFormProps) {
    const [image, setImageUrl] = useState(machinery?.image || "")
    const [condition, setCondition] = useState<string>(
        machinery?.ability ? "true" : "false"
    )

    const action = machinery
        ? (_: ActionResult | null, formData: FormData) =>
            updateMachinery(machinery.id, formData)
        : (_: ActionResult | null, formData: FormData) =>
            createMachinery(formData)

    const [state, formAction, isPending] = useActionState(action, null)


    const handleSubmit = async (
        formData: FormData) => {
        formData.set("ability", condition)
        formData.set("image", image)

        const result = await formAction(formData)
        if (result?.success && onSuccess) {
            onSuccess()
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>{machinery ? "Editar Maquinaria" : "Crear Nueva Maquinaria"}</CardTitle>
            </CardHeader>
            <CardContent>
                <form action={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Nombre *</Label>
                            <Input
                                id="name"
                                name="name"
                                defaultValue={machinery?.name}
                                placeholder="Ej: Excavadora CAT 320"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Disponible *</Label>
                            <Select value={condition} onValueChange={setCondition} required>
                                <SelectTrigger>
                                    <SelectValue placeholder="Selecciona la condición"/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="true">Disponible</SelectItem>
                                    <SelectItem value="false">No Disponible</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">Descripción</Label>
                        <Textarea
                            id="description"
                            name="description"
                            defaultValue={machinery?.description || ""}
                            placeholder="Descripción detallada de la maquinaria..."
                            className="min-h-[100px]"
                        />
                    </div>

                    <ImageUpload onImageUpload={setImageUrl} currentImage={machinery?.image || ""}/>

                    <div className="flex gap-4">
                        <Button type="submit" disabled={isPending} className="flex-1">
                            {isPending ? "Guardando..." : machinery ? "Actualizar" : "Crear"}
                        </Button>
                    </div>

                    {state?.success === false && <div className="text-red-500 text-sm">{state.message}</div>}
                    {state?.success === true && <div className="text-green-600 text-sm">{state.message}</div>}
                </form>
            </CardContent>
        </Card>
    )
}

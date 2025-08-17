"use client"

import {useActionState, useState} from "react"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {Textarea} from "@/components/ui/textarea"
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {MultiImageUpload} from "./multi-image-upload"
import {createProject, updateProject} from "@/app/actions/projects"

interface ProjectFormProps {
    project?: {
        id: string
        name: string
        description: string | null
        images: Array<{
            id: string
            url: string
            caption: string | null
            order: number
            projectId: string
            createdAt: Date
        }>
        createdAt: Date
        updatedAt: Date
    }
    onSuccess?: () => void
}

interface ActionResult {
    success: boolean
    message: string
}

export function ProjectForm({project, onSuccess}: ProjectFormProps) {
    const [images, setImages] = useState(
        project?.images.map((img) => ({
            id: img.id,
            url: img.url,
            caption: img.caption || "",
        })) || [],
    )

    const action: (_: ActionResult | null, formData: FormData) => Promise<ActionResult> = project
        ? (_: ActionResult | null, formData: FormData) => updateProject(project.id, formData)
        : (_: ActionResult | null, formData: FormData) => createProject(formData)


    const [state, formAction, isPending] = useActionState(action, null)

    const handleSubmit = (formData: FormData) => {
        const result = formAction(formData) as unknown as ActionResult | null
        if (result?.success && onSuccess) {
            onSuccess()
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>{project ? "Editar Proyecto" : "Crear Nuevo Proyecto"}</CardTitle>
            </CardHeader>
            <CardContent>
                <form action={handleSubmit} className="space-y-6">
                    {/*<div className="grid grid-cols-1 md:grid-cols-2 gap-4">*/}
                    <div className="space-y-2">
                        <Label htmlFor="name">Nombre del Proyecto *</Label>
                        <Input
                            id="name"
                            name="name"
                            defaultValue={project?.name}
                            placeholder="Ej: Construcción de Edificio Corporativo"
                            required
                        />
                    </div>
                    {/*</div>*/}

                    <div className="space-y-2">
                        <Label htmlFor="description">Descripción del Proyecto</Label>
                        <Textarea
                            id="description"
                            name="description"
                            defaultValue={project?.description || ""}
                            placeholder="Describe los detalles del proyecto, objetivos, alcance, etc."
                            className="min-h-[120px]"
                        />
                    </div>

                    <MultiImageUpload onImagesChange={setImages} initialImages={images}/>

                    <div className="flex gap-4">
                        <Button type="submit" disabled={isPending} className="flex-1">
                            {isPending ? "Guardando..." : project ? "Actualizar Proyecto" : "Crear Proyecto"}
                        </Button>
                    </div>

                    {state?.success === false && <div className="text-red-500 text-sm">{state.message}</div>}
                    {state?.success === true && <div className="text-green-600 text-sm">{state.message}</div>}
                </form>
            </CardContent>
        </Card>
    )
}

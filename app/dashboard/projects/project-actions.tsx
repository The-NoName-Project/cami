"use client"

import {useState} from "react"
import {Button} from "@/components/ui/button"
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {MoreHorizontal, Edit, Trash2} from "lucide-react"
import {deleteProject} from "@/app/actions/projects"
import Link from "next/link"

interface ProjectActionsProps {
    project: {
        id: string
        name: string
        images: {
            caption: string | null;
            id: string
            url: string
            order: number
            createdAt: Date
            projectId: string
        }[];
        createdAt: Date
        updatedAt: Date
        description: string | null;
    }
}

export function ProjectActions({project}: ProjectActionsProps) {
    const [showDeleteDialog, setShowDeleteDialog] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const handleDelete = async () => {
        setIsLoading(true)
        const result = await deleteProject(project.id)
        setIsLoading(false)
        setShowDeleteDialog(false)

        if (result.success) {
            window.location.reload()
        }
    }

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                        <MoreHorizontal className="w-4 h-4"/>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                        <Link href={`/dashboard/projects/edit/${project.id}`}>
                            <Edit className="w-4 h-4 mr-2"/>
                            Editar
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setShowDeleteDialog(true)} className="text-red-600">
                        <Trash2 className="w-4 h-4 mr-2"/>
                        Eliminar
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Esta acción no se puede deshacer. Se eliminará permanentemente el
                            proyecto &#34;{project.name}&#34; y todas sus
                            imágenes de la base de datos.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete} disabled={isLoading}
                                           className="bg-red-600 hover:bg-red-700">
                            {isLoading ? "Eliminando..." : "Eliminar"}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}

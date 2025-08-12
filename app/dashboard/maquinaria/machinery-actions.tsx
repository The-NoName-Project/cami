"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
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
import { MoreHorizontal, Edit, Trash2, Eye, EyeOff } from "lucide-react"
import { deleteMachinery, toggleMachineryStatus } from "@/app/actions/machinery"
import Link from "next/link"

interface MachineryActionsProps {
  machinery: {
    id: number
    name: string
    description: string
    image: string
    ability: boolean
    createdAt: Date
    updatedAt: Date
  }
}

export function MachineryActions({ machinery }: MachineryActionsProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleDelete = async () => {
    setIsLoading(true)
    const result = await deleteMachinery(machinery.id)
    setIsLoading(false)
    setShowDeleteDialog(false)

    if (result.success) {
      window.location.reload()
    }
  }

  const handleToggleStatus = async () => {
    setIsLoading(true)
    const result = await toggleMachineryStatus(machinery.id)
    setIsLoading(false)

    if (result.success) {
      window.location.reload()
    }
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem asChild>
            <Link href={`/dashboard/machinery/edit/${machinery.id}`}>
              <Edit className="w-4 h-4 mr-2" />
              Editar
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleToggleStatus} disabled={isLoading}>
            {machinery.ability ? (
              <>
                <EyeOff className="w-4 h-4 mr-2" />
                Desactivar
              </>
            ) : (
              <>
                <Eye className="w-4 h-4 mr-2" />
                Activar
              </>
            )}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setShowDeleteDialog(true)} className="text-red-600">
            <Trash2 className="w-4 h-4 mr-2" />
            Eliminar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. Se eliminará permanentemente la maquinaria "{machinery.name}" de la base
              de datos.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} disabled={isLoading} className="bg-red-600 hover:bg-red-700">
              {isLoading ? "Eliminando..." : "Eliminar"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

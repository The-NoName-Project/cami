"use client"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import { deleteContactMessage } from "@/app/actions/contact"

interface DeleteMessageButtonProps {
  messageId: number
}

export function DeleteMessageButton({ messageId }: DeleteMessageButtonProps) {
  const deleteAction = async () => {
    const result = await deleteContactMessage(messageId)
    if (result.success) {
      window.location.reload() // Recargar la página para mostrar los cambios
    }
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={deleteAction}
      className="text-red-600 hover:text-red-700 hover:bg-red-50 bg-transparent"
    >
      <Trash2 className="w-4 h-4" />
    </Button>
  )
}

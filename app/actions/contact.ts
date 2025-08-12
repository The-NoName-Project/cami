"use server"

import prisma from "@/lib/prisma"

export async function getRecentContactMessages() {
  try {
    const twentyDaysAgo = new Date()
    twentyDaysAgo.setDate(twentyDaysAgo.getDate() - 20)

    const messages = await prisma.quote.findMany({
      where: {
        createdAt: {
          gte: twentyDaysAgo,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return messages
  } catch (error) {
    console.error("Error obteniendo mensajes:", error)
    return []
  }
}

export async function deleteContactMessage(id: number) {
  try {
    await prisma.quote.delete({
      where: { id },
    })
    return { success: true, message: "Mensaje eliminado correctamente." }
  } catch (error) {
    console.error("Error eliminando mensaje:", error)
    return { success: false, message: "Error al eliminar el mensaje." }
  }
}

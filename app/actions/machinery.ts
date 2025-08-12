"use server"

import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import {equals} from "effect/Cron";

export async function createMachinery(formData: FormData) {
  const name = formData.get("name") as string
  const description = formData.get("description") as string
  const image = formData.get("imageUrl") as string

  if (!name) {
    return { success: false, message: "Todos los campos obligatorios deben ser completados." }
  }

  try {
    await prisma.tools.create({
      data: {
        name,
        description,
        ability: true,
        image: image,
      },
    })

    revalidatePath("/dashboard/maquinaria")
    return { success: true, message: "Maquinaria creada exitosamente." }
  } catch (error) {
    console.error("Error creando maquinaria:", error)
    return { success: false, message: "Error al crear la maquinaria." }
  }
}

export async function updateMachinery(id: number, formData: FormData) {
  const name = formData.get("name") as string
  const description = formData.get("description") as string
  const image = formData.get("imageUrl") as string

  if (!name) {
    return { success: false, message: "Todos los campos obligatorios deben ser completados." }
  }

  try {
    await prisma.tools.update({
      where: { id },
      data: {
        name,
        description,
        image: image ,
      },
    })

    revalidatePath("/dashboard/maquinaria")
    return { success: true, message: "Maquinaria actualizada exitosamente." }
  } catch (error) {
    console.error("Error actualizando maquinaria:", error)
    return { success: false, message: "Error al actualizar la maquinaria." }
  }
}

export async function deleteMachinery(id: number) {
  try {
    await prisma.tools.delete({
      where: { id },
    })

    revalidatePath("/dashboard/machinery")
    return { success: true, message: "Maquinaria eliminada exitosamente." }
  } catch (error) {
    console.error("Error eliminando maquinaria:", error)
    return { success: false, message: "Error al eliminar la maquinaria." }
  }
}

export async function getAllMachinery() {
  try {
    const machinery = await prisma.tools.findMany({
      where: { ability: true },
      orderBy: { createdAt: "desc" },
    })
    return machinery
  } catch (error) {
    console.error("Error obteniendo maquinaria:", error)
    return []
  }
}

export async function getMachineryById(id: number) {
  try {
    const machinery = await prisma.tools.findUnique({
      where: { id },
    })
    return machinery
  } catch (error) {
    console.error("Error obteniendo maquinaria:", error)
    return null
  }
}

export async function toggleMachineryStatus(id: number) {
  try {
    const machinery = await prisma.tools.findUnique({
      where: { id },
    })

    if (!machinery) {
      return { success: false, message: "Maquinaria no encontrada." }
    }

    await prisma.tools.update({
      where: { id },
      data: { ability: !machinery.ability },
    })

    revalidatePath("/dashboard/maquinaria")
    return { success: true, message: "Estado actualizado exitosamente." }
  } catch (error) {
    console.error("Error cambiando estado:", error)
    return { success: false, message: "Error al cambiar el estado." }
  }
}

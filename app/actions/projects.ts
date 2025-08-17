"use server"

import prisma from "@/lib/prisma"
import {revalidatePath} from "next/cache"
import {Prisma} from "@prisma/client";

export async function createProject(formData: FormData) {
    const name = formData.get("name") as string
    const description = formData.get("description") as string

    // Obtener las URLs de las imágenes
    const imageUrls = formData.getAll("imageUrls") as string[]
    const imageCaptions = formData.getAll("imageCaptions") as string[]

    if (!name) {
        return {success: false, message: "El nombre es obligatorio."}
    }

    const imagesData: Prisma.ProjectImageCreateWithoutProjectInput[] = imageUrls
        .filter((url) => url.trim() !== "")
        .map((url, index) => ({
            url,
            caption: imageCaptions[index] || null,
            order: index,
        }))

    try {
        const project = await prisma.projects.create({
            data: {
                name,
                description,
                images: {
                    create: imagesData
                },
            },
        })

        return {success: true, message: "Proyecto creado exitosamente.", projectId: project.id}
    } catch (error) {
        console.error("Error creando proyecto:", error)
        return {success: false, message: "Error al crear el proyecto."}
    }
}

export async function updateProject(id: string, formData: FormData) {
    const name = formData.get("name") as string
    const description = formData.get("description") as string

    // Obtener las URLs de las imágenes
    const imageUrls = formData.getAll("imageUrls") as string[]
    const imageCaptions = formData.getAll("imageCaptions") as string[]

    if (!name) {
        return {success: false, message: "El nombre es obligatorio."}
    }

    try {
        // Eliminar imágenes existentes
        await prisma.projectImage.deleteMany({
            where: {projectId: id},
        })

        // Actualizar proyecto con nuevas imágenes
        await prisma.projects.update({
            where: {id},
            data: {
                name,
                description,
                images: {
                    create: imageUrls
                        .filter((url) => url.trim() !== "")
                        .map((url, index) => ({
                            url,
                            caption: imageCaptions[index] || null,
                            order: index,
                        })),
                },
            },
        })

        revalidatePath("/dashboard/projects")
        return {success: true, message: "Proyecto actualizado exitosamente."}
    } catch (error) {
        console.error("Error actualizando proyecto:", error)
        return {success: false, message: "Error al actualizar el proyecto."}
    }
}

export async function deleteProject(id: string) {
    try {
        await prisma.projects.delete({
            where: {id},
        })

        revalidatePath("/dashboard/projects")
        return {success: true, message: "Proyecto eliminado exitosamente."}
    } catch (error) {
        console.error("Error eliminando proyecto:", error)
        return {success: false, message: "Error al eliminar el proyecto."}
    }
}

export async function getAllProjects() {
    try {
        const projects = await prisma.projects.findMany({
            include: {
                images: {
                    orderBy: {order: "asc"},
                },
            },
            orderBy: {createdAt: "desc"},
        })
        return projects
    } catch (error) {
        console.error("Error obteniendo proyectos:", error)
        return []
    }
}

export async function getProjectById(id: string) {
    try {
        const project = await prisma.projects.findUnique({
            where: {id},
            include: {
                images: {
                    orderBy: {order: "asc"},
                },
            },
        })
        return project
    } catch (error) {
        console.error("Error obteniendo proyecto:", error)
        return null
    }
}

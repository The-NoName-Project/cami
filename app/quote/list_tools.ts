"use server"

import prisma from "@/lib/prisma"

export async function getAllTools() {
    const tools = await prisma.tools.findMany({
        orderBy: {
            name: "asc"
        }
    })
    return tools
}

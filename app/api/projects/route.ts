import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET() {
    const tools = await prisma.projects.findMany({
        include: {
            images: {
                orderBy: {order: "asc"},
            },
        },
        orderBy: { name: "asc" }
    })

    return NextResponse.json(tools)
}

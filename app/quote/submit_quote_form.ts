"use server"

import prisma from "@/lib/prisma"


type SubmitState = { success: boolean; message: string } | null

export async function submitQuoteForm(
    _prevState: SubmitState,
    formData: FormData
): Promise<SubmitState> {
    const name = formData.get("name") as string
    const number = formData.get("number") as string
    const email = formData.get("email") as string
    const details = formData.get("message") as string
    const start_date = new Date(formData.get("start_date") as string)
    const end_date = new Date(formData.get("end_date") as string)
    const tool_id = parseInt(formData.get("tool_id") as string)

    if (!email || !details || !name) {
        return { success: false, message: "El correo electrónico y el mensaje son obligatorios." }
    }

    try {
        await prisma.quote.create({
            data: {
                name,
                number,
                email,
                details,
                start_date,
                end_date,
                tool_id,
            },
        })

        // Opcional: Revalidar una ruta si tienes una página que muestra los mensajes
        // revalidatePath("/contact-messages")
        // Opcional: Redirigir a una página de éxito
        // redirect("/success")

        return { success: true, message: "¡Gracias, tu mensaje ha sido enviado!" }
    } catch (error) {
        console.error("Error al guardar el mensaje:", error)
        return { success: false, message: "Hubo un error al enviar el formulario. Inténtalo de nuevo." }
    }
}
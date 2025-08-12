"use server"

import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function submitContactForm(formData: FormData) {
  const email = formData.get("email") as string
  const message = formData.get("message") as string

  if (!email || !message) {
    return { success: false, message: "El correo electrónico y el mensaje son obligatorios." }
  }

  try {
    await prisma.contactMessage.create({
      data: {
        email,
        message,
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

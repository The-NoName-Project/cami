"use server"

import prisma from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

type SubmitState = { success: boolean; message: string } | null

export async function loginUser(
    _prevState: SubmitState,
    formData: FormData
): Promise<SubmitState> {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  if (!email || !password) {
    return { success: false, message: "Email y contraseña son obligatorios." }
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      return { success: false, message: "Credenciales inválidas." }
    }

    const isValidPassword = await bcrypt.compare(password, user.password)

    if (!isValidPassword) {
      return { success: false, message: "Credenciales inválidas." }
    }

    const cookieStore = await cookies()
    cookieStore.set("user-session", user.id.toString(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 7 días
      path: "/",
    })
  } catch (error) {
    console.error("Error en login:", error)
    return { success: false, message: "Error interno del servidor." }
  }
  redirect("/dashboard")
}

export async function registerUser(
    _prevState: SubmitState,
    formData: FormData
): Promise<SubmitState> {
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const name = formData.get("name") as string

  if (!email || !password) {
    return { success: false, message: "Email y contraseña son obligatorios." }
  }

  try {
    // Verificar si el usuario ya existe
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return { success: false, message: "El usuario ya existe." }
    }

    // Hash de la contraseña
    const hashedPassword = await bcrypt.hash(password, 12)

    // Crear el usuario
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    })

    // Crear sesión
    const cookieStore = await cookies()
    cookieStore.set("user-session", user.id.toString(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 7 días
      path: "/",
    })

  } catch (error) {
    console.error("Error en registro:", error)
      return { success: false, message: "Error interno del servidor." }
  }
  redirect("/dashboard")
}

export async function logoutUser() {
  const cookieStore = await cookies()
  cookieStore.delete("user-session")
  redirect("/")
}

export async function getCurrentUser() {
  try {
    const cookieStore = await cookies()
    const sessionCookie = cookieStore.get("user-session")

    if (!sessionCookie) {
      return null
    }

    const user = await prisma.user.findUnique({
      where: { id: parseInt(sessionCookie.value) },
      select: { id: true, email: true, name: true },
    })

    return user
  } catch (error) {
    console.error("Error obteniendo usuario:", error)
    return null
  }
}

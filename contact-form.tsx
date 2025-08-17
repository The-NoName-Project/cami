"use client"

import { useActionState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { submitContactForm } from "@/app/actions" // Importa la Server Action

export default function ContactForm() {
  const [state, formAction, isPending] = useActionState(submitContactForm, null)

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-950 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Contáctanos</CardTitle>
          <CardDescription>Envíanos un mensaje y nos pondremos en contacto contigo.</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-4"> {/* Usa la Server Action aquí */}
            <div className="space-y-2">
              <Label htmlFor="email">Correo electrónico</Label>
              <Input
                id="email"
                type="email"
                name="email" // Asegúrate de que el 'name' coincida con el que usas en la Server Action
                placeholder="tu@ejemplo.com"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Mensaje</Label>
              <Textarea
                id="message"
                name="message" // Asegúrate de que el 'name' coincida con el que usas en la Server Action
                placeholder="Escribe tu mensaje aquí..."
                required
                className="min-h-[100px]"
              />
            </div>
            <Button type="submit" disabled={isPending} className="w-full">
              {isPending ? "Enviando..." : "Enviar"}
            </Button>
          </form>
          {state?.success === false && (
            <div className="mt-4 text-red-500 text-sm">Error: {state.message}</div>
          )}
          {state?.success === true && (
            <p className="mt-4 text-green-600 text-sm">{state.message}</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

"use client"

import { useActionState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { loginUser, registerUser } from "@/app/actions/auth"

export default function LoginPage() {
  const [loginState, loginAction, loginPending] = useActionState(loginUser, null)
  const [registerState, registerAction, registerPending] = useActionState(registerUser, null)

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-950 p-4">
      <Card className="w-full max-w-md py-6">
        <CardHeader>
          <CardTitle>Acceso al Panel</CardTitle>
          <CardDescription>Inicia sesión o crea una cuenta para acceder al dashboard.</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Iniciar Sesión</TabsTrigger>
              <TabsTrigger value="register">Registrarse</TabsTrigger>
            </TabsList>

            <TabsContent value="login" className="space-y-4">
              <form action={loginAction} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email">Correo electrónico</Label>
                  <Input id="login-email" type="email" name="email" placeholder="tu@ejemplo.com" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="login-password">Contraseña</Label>
                  <Input id="login-password" type="password" name="password" placeholder="••••••••" required />
                </div>
                <Button type="submit" disabled={loginPending} className="w-full">
                  {loginPending ? "Iniciando sesión..." : "Iniciar Sesión"}
                </Button>
              </form>
              {loginState?.success === false && <div className="text-red-500 text-sm">{loginState.message}</div>}
            </TabsContent>

            <TabsContent value="register" className="space-y-4">
              <form action={registerAction} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="register-name">Nombre (opcional)</Label>
                  <Input id="register-name" type="text" name="name" placeholder="Tu nombre" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-email">Correo electrónico</Label>
                  <Input id="register-email" type="email" name="email" placeholder="tu@ejemplo.com" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-password">Contraseña</Label>
                  <Input
                    id="register-password"
                    type="password"
                    name="password"
                    placeholder="••••••••"
                    required
                    minLength={6}
                  />
                </div>
                <Button type="submit" disabled={registerPending} className="w-full">
                  {registerPending ? "Creando cuenta..." : "Crear Cuenta"}
                </Button>
              </form>
              {registerState?.success === false && <div className="text-red-500 text-sm">{registerState.message}</div>}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

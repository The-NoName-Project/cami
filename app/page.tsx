'use client'
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Target, Eye, Handshake } from 'lucide-react'
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useActionState, useState, useEffect } from "react";
import { submitQuoteForm } from "@/app/quote/submit_quote_form";

type Tool = {
    id: number;
    name: string;
    ability: boolean;
    description: string;
    image: string;
}

export default function Component() {
    const [state, formAction, isPending] = useActionState(submitQuoteForm, null)
    const [tool_id, setToolId] = useState("")

    const [tools, setTools] = useState<Tool[]>([])

    useEffect(() => {
        const fetchTools = async () => {
            try {
                const res = await fetch("/api/tools")
                const data = await res.json()
                setTools(data)
            } catch (error) {
                console.error("Error al obtener tools:", error)
            }
        }

        fetchTools()
    }, [])

    return (
    <div className="flex flex-col min-h-dvh">
      <header className="fixed top-0 left-0 right-0 z-50 px-4 lg:px-6 h-14 flex items-center border-b bg-white shadow-sm">
        <Link href="#" className="flex items-center justify-center gap-4 sm:gap-6" prefetch={false}>
          <Image src='/cami.png' alt="CAMI" width={50} height={50} />
          <span className="text-sm hover:underline underline-offset-4 font-bold">CAMI</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link href="#proyectos" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
            Proyectos
          </Link>
          <Link href="#nosotros" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
            Nosotros
          </Link>
          <Link href="#alquiler" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
            Alquiler
          </Link>
          <Link href="#contacto" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
            Contacto
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-r from-gray-900 to-gray-700 text-white">
          <div className="px-4 md:px-6 text-center">
            <div className="space-y-4">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none">
                Comercializadora de Acero y Montajes Industriales
              </h1>
                <p className="mx-auto max-w-[800px] text-gray-200 md:text-4xl">
                    &#34;En CAMI lideramos con pasión y calidad en cada solución&#34;
                </p>
              <p className="mx-auto max-w-[800px] text-gray-300 md:text-xl">
                Tu socio confiable para proyectos de construcción y alquiler de maquinaria pesada.
              </p>
              <div className="space-x-4">
                <Link
                  href="#alquiler"
                  className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  prefetch={false}
                >
                  Alquilar Maquinaria
                </Link>
                <Link
                  href="#proyectos"
                  className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium text-gray-900 shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  prefetch={false}
                >
                  Ver Proyectos
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Proyectos y Maquinaria Section */}
        <section id="proyectos" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
          <div className="px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Nuestros Proyectos y Maquinaria</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Explora algunos de nuestros proyectos exitosos y la amplia gama de maquinaria que utilizamos y ofrecemos.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-[1200px] mx-auto">
              <Card>
                <Image
                  src="/edificio-en-construccion.png"
                  width={400}
                  height={300}
                  alt="Proyecto de Construcción"
                  className="rounded-t-lg object-cover w-full h-48"
                />
                <CardHeader>
                  <CardTitle>Construcción de Edificio Residencial</CardTitle>
                  <CardDescription>Proyecto completado en tiempo récord con alta calidad.</CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <Image
                  src="/excavadora-en-obra.png"
                  width={400}
                  height={300}
                  alt="Excavadora"
                  className="rounded-t-lg object-cover w-full h-48"
                />
                <CardHeader>
                  <CardTitle>Excavadora Caterpillar 320</CardTitle>
                  <CardDescription>Ideal para movimientos de tierra y demoliciones.</CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <Image
                  src="/vial-infrastructure-project.png"
                  width={400}
                  height={300}
                  alt="Proyecto Vial"
                  className="rounded-t-lg object-cover w-full h-48"
                />
                <CardHeader>
                  <CardTitle>Ampliación de Vía Principal</CardTitle>
                  <CardDescription>Mejorando la conectividad urbana con infraestructura moderna.</CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <Image
                  src="/retroexcavadora.png"
                  width={400}
                  height={300}
                  alt="Retroexcavadora"
                  className="rounded-t-lg object-cover w-full h-48"
                />
                <CardHeader>
                  <CardTitle>Retroexcavadora John Deere 310SL</CardTitle>
                  <CardDescription>Versátil para excavación y carga en espacios reducidos.</CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <Image
                  src="/urbanizacion-plan.png"
                  width={400}
                  height={300}
                  alt="Proyecto Urbanización"
                  className="rounded-t-lg object-cover w-full h-48"
                />
                <CardHeader>
                  <CardTitle>Desarrollo de Urbanización</CardTitle>
                  <CardDescription>Creación de espacios residenciales con servicios completos.</CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <Image
                  src="/placeholder-2mqjf.png"
                  width={400}
                  height={300}
                  alt="Rodillo Compactador"
                  className="rounded-t-lg object-cover w-full h-48"
                />
                <CardHeader>
                  <CardTitle>Rodillo Compactador Dynapac CA2500</CardTitle>
                  <CardDescription>Esencial para la compactación de suelos y asfaltos.</CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        {/* Misión, Visión, Objetivos Section */}
        <section id="nosotros" className="w-full py-12 md:py-24 lg:py-32">
          <div className="px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Sobre Nosotros</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  En CAMI contamos con más de 20 años de experiencia en soluciones industriales. Nos especializamos en laminación de estructuras,
                    diseño de arcos y montaje de instalaciones complejas, ofreciendo proyectos eficientes, seguros y adaptados a cada cliente
                    del sector público y privado.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-[1200px] mx-auto">
              <Card className="flex flex-col items-center text-center p-6">
                <Target className="h-12 w-12 text-primary mb-4" />
                <CardTitle className="mb-2">Misión</CardTitle>
                <CardContent>
                  <p className="text-muted-foreground">
                      Ofrecer soluciones integrales en construcción, obra civil, hidráulica y mantenimiento, con compromiso y excelencia en cada etapa del proyecto.
                  </p>
                </CardContent>
              </Card>
              <Card className="flex flex-col items-center text-center p-6">
                <Eye className="h-12 w-12 text-primary mb-4" />
                <CardTitle className="mb-2">Visión</CardTitle>
                <CardContent>
                  <p className="text-muted-foreground">
                    Ser lideres en construcción industrial, distinguiéndonos por la calidad, profesionalismo y plena satisfaccion de nuestros clientes.
                  </p>
                </CardContent>
              </Card>
              <Card className="flex flex-col items-center text-center p-6">
                <Handshake className="h-12 w-12 text-primary mb-4" />
                <CardTitle className="mb-2">Objetivos</CardTitle>
                <CardContent>
                  <ul className="list-disc list-inside text-muted-foreground text-left">
                    <li>Expandir nuestra flota de maquinaria moderna.</li>
                    <li>Mantener los más altos estándares de seguridad.</li>
                    <li>Fomentar el desarrollo profesional de nuestro equipo.</li>
                    <li>Implementar tecnologías sostenibles en nuestros procesos.</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Maquinaria en Alquiler Section */}
        <section id="alquiler" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
          <div className="px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Maquinaria en Alquiler</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Contamos con una amplia variedad de maquinaria pesada disponible para alquiler, adaptada a tus necesidades.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-[1200px] mx-auto">
                {
                    tools.map((tool: Tool) => (
                        <Card key={tool.id} className="hover:scale-105 transition-transform duration-300">
                            <Image
                                src={tool.image}
                                width={400}
                                height={300}
                                alt="Cargador Frontal"
                                className="rounded-t-lg object-cover w-full h-48"
                            />
                            <CardHeader>
                                <CardTitle>{tool.name}</CardTitle>
                                <CardDescription>{tool.description}</CardDescription>
                            </CardHeader>
                            <CardFooter className="flex justify-end">
                                {
                                    tool.ability === true ?
                                        (<Button>Alquilar Ahora</Button>)
                                        :
                                        (
                                            <Button disabled={true}>
                                                No Disponible
                                            </Button>
                                        )
                                }
                            </CardFooter>
                        </Card>
                    ))
                }
                <Card>
                    <Image
                        src="/cargador-frontal.png"
                        width={400}
                        height={300}
                        alt="Cargador Frontal"
                        className="rounded-t-lg object-cover w-full h-48"
                    />
                    <CardHeader>
                        <CardTitle>Cargador Frontal Volvo L120H</CardTitle>
                        <CardDescription>Ideal para carga de materiales y movimiento de tierras.</CardDescription>
                    </CardHeader>
                    <CardFooter className="flex justify-end">
                        <Button>Alquilar Ahora</Button>
                    </CardFooter>
                </Card>
              <Card>
                <Image
                  src="/volquete-en-construccion.png"
                  width={400}
                  height={300}
                  alt="Camión Volquete"
                  className="rounded-t-lg object-cover w-full h-48"
                />
                <CardHeader>
                  <CardTitle>Camión Volquete Mercedes-Benz Actros</CardTitle>
                  <CardDescription>Gran capacidad para transporte de áridos y escombros.</CardDescription>
                </CardHeader>
                <CardFooter className="flex justify-end">
                  <Button>Alquilar Ahora</Button>
                </CardFooter>
              </Card>
              <Card>
                <Image
                  src="/placeholder-058bz.png"
                  width={400}
                  height={300}
                  alt="Motoniveladora"
                  className="rounded-t-lg object-cover w-full h-48"
                />
                <CardHeader>
                  <CardTitle>Motoniveladora Komatsu GD655-6</CardTitle>
                  <CardDescription>Perfecta para nivelación de terrenos y construcción de carreteras.</CardDescription>
                </CardHeader>
                <CardFooter className="flex justify-end">
                  <Button>Alquilar Ahora</Button>
                </CardFooter>
              </Card>
              <Card>
                <Image
                  src="/mini-excavator.png"
                  width={400}
                  height={300}
                  alt="Miniexcavadora"
                  className="rounded-t-lg object-cover w-full h-48"
                />
                <CardHeader>
                  <CardTitle>Miniexcavadora Bobcat E35</CardTitle>
                  <CardDescription>Compacta y potente para trabajos en espacios reducidos.</CardDescription>
                </CardHeader>
                <CardFooter className="flex justify-end">
                  <Button>Alquilar Ahora</Button>
                </CardFooter>
              </Card>
              <Card>
                <Image
                  src="/iluminacion-torre.png"
                  width={400}
                  height={300}
                  alt="Torre de Iluminación"
                  className="rounded-t-lg object-cover w-full h-48"
                />
                <CardHeader>
                  <CardTitle>Torre de Iluminación Wacker Neuson</CardTitle>
                  <CardDescription>Iluminación eficiente para obras nocturnas.</CardDescription>
                </CardHeader>
                <CardFooter className="flex justify-end">
                  <Button>Alquilar Ahora</Button>
                </CardFooter>
              </Card>
              <Card>
                <Image
                  src="/placeholder.svg?height=300&width=400"
                  width={400}
                  height={300}
                  alt="Generador Eléctrico"
                  className="rounded-t-lg object-cover w-full h-48"
                />
                <CardHeader>
                  <CardTitle>Generador Eléctrico Cummins 150 kVA</CardTitle>
                  <CardDescription>Suministro de energía confiable para cualquier obra.</CardDescription>
                </CardHeader>
                <CardFooter className="flex justify-end">
                  <Button>Alquilar Ahora</Button>
                </CardFooter>
              </Card>
            </div>
          <div className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
          <div className="px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Solicita tu Cotización</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Completa el siguiente formulario y nos pondremos en contacto contigo para tu solicitud de cotización.
                </p>
              </div>
            </div>
            <div className="mx-auto w-full max-w-2xl">
              <form action={formAction} className="grid gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nombre Completo</Label>
                    <Input id="name" name="name" placeholder="Tu nombre" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" type="email" placeholder="tu@ejemplo.com" required />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="number">Teléfono</Label>
                    <Input id="number" name="number" type="tel" placeholder="+XX XXX XXX XXX" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tool_id">Tipo de Maquinaria</Label>
                    <Select name="tool_id" required value={tool_id} onValueChange={setToolId}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecciona una opción" />
                      </SelectTrigger>
                      <SelectContent>
                          {tools.map((tool: Tool) => (
                              <SelectItem key={tool.id} value={tool.id.toString()}>
                                  {tool.name}
                              </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="start_date">Fecha de Inicio</Label>
                    <Input id="start_date" name="start_date" type="date" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="end_date">Fecha de Fin</Label>
                    <Input id="end_date" name="end_date" type="date" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Mensaje / Detalles Adicionales</Label>
                  <Textarea id="message" name="message" placeholder="Describe tus necesidades o proyecto" className="min-h-[100px]" />
                </div>
                <Button type="submit" className="w-full" disabled={isPending}>
                    { isPending ? "Enviando" : "Enviar Solicitud" }
                </Button>
              </form>
                {state?.success === false && (
                    <div className="mt-4 text-red-500 text-sm">Error: {state.message}</div>
                )}
                {state?.success === true && (
                    <p className="mt-4 text-green-600 text-sm">{state.message}</p>
                )}
            </div>
          </div>
        </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contacto" className="w-full py-12 md:py-24 lg:py-32 border-t">
          <div className="grid items-center justify-center gap-4 px-4 text-center md:px-6 lg:gap-10">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Contáctanos</h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                ¿Tienes alguna pregunta o necesitas una cotización? Estamos aquí para ayudarte.
              </p>
            </div>
            <div className="flex justify-center space-x-4">
              <Link
                href="#"
                className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                prefetch={false}
              >
                Enviar Mensaje
              </Link>
              <Link
                href="#"
                className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                prefetch={false}
              >
                Llamar Ahora
              </Link>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} CAMI. Todos los derechos reservados.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Términos de Servicio
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Política de Privacidad
          </Link>
        </nav>
      </footer>
    </div>
  )
}

import { getAllMachinery } from "@/app/actions/machinery"
import { getCurrentUser } from "@/app/actions/auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus } from "lucide-react"
import Link from "next/link"
import { MachineryActions } from "./machinery-actions"
import AuthHeader from "@/components/ui/auth/auth-header";

export default async function MachineryPage() {
  const user = await getCurrentUser()
  const machinery = await getAllMachinery()

  if (!user) {
    return <div>No autorizado</div>
  }

  const getConditionColor = (condition: boolean) => {
    switch (condition) {
      case true:
        return "bg-green-100 text-green-800"
      case false:
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950">
        <AuthHeader />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Gestión de Maquinaria</h1>
            <p className="text-gray-600 dark:text-gray-400">{machinery.length} máquinas registradas</p>
          </div>
          <Link href="/dashboard/maquinaria/create">
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Nueva Maquinaria
            </Button>
          </Link>
        </div>

        {machinery.length === 0 ? (
          <Card>
            <CardContent className="flex items-center justify-center py-12">
              <div className="text-center">
                <div className="w-12 h-12 text-gray-400 mx-auto mb-4">🏗️</div>
                <p className="text-gray-500 mb-4">No hay maquinaria registrada.</p>
                <Link href="/dashboard/maquinaria/create">
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Crear Primera Maquinaria
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {machinery.map((machine) => (
              <Card key={machine.id} className="overflow-hidden">
                {machine.image && (
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={machine.image || "/placeholder.svg"}
                      alt={machine.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg line-clamp-1">{machine.name}</CardTitle>
                    <MachineryActions machinery={(machine)} />
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge className={getConditionColor(machine.ability)}>
                        { machine.ability ? "Disponible" : "No Disponible"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {machine.description && (
                      <p className="text-sm text-gray-600 line-clamp-2 mt-2">{machine.description}</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

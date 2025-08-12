import { getCurrentUser } from "@/app/actions/auth"
import { MachineryForm } from "@/components/machinery-form"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default async function CreateMachineryPage() {
  const user = await getCurrentUser()

  if (!user) {
    return <div>No autorizado</div>
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Link href="/dashboard/maquinaria">
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver al listado
            </Button>
          </Link>
        </div>

        <MachineryForm />
      </div>
    </div>
  )
}

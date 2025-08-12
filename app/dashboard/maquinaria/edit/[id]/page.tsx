import { getCurrentUser } from "@/app/actions/auth"
import { getMachineryById } from "@/app/actions/machinery"
import { MachineryForm } from "@/components/machinery-form"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { notFound } from "next/navigation"

interface EditMachineryPageProps {
  params: Promise<{ id: string }>
}

export default async function EditMachineryPage({ params }: EditMachineryPageProps) {
  const { id } = await params
  const user = await getCurrentUser()
  const machinery = await getMachineryById(id)

  if (!user) {
    return <div>No autorizado</div>
  }

  if (!machinery) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Link href="/dashboard/machinery">
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver al listado
            </Button>
          </Link>
        </div>

        <MachineryForm machinery={machinery} />
      </div>
    </div>
  )
}

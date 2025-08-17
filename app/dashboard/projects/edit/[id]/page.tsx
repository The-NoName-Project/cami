import {getCurrentUser} from "@/app/actions/auth"
import {getProjectById} from "@/app/actions/projects"
import {ProjectForm} from "@/components/project-form"
import Link from "next/link"
import {Button} from "@/components/ui/button"
import {ArrowLeft} from "lucide-react"
import {notFound, redirect} from "next/navigation"
import AuthHeader from "@/components/ui/auth/auth-header";

interface EditProjectPageProps {
    params: Promise<{ id: string }>
}

export default async function EditProjectPage({params}: EditProjectPageProps) {
    const {id} = await params
    const user = await getCurrentUser()
    const project = await getProjectById(id)

    if (!user) {
        redirect('/dashboard')
    }

    if (!project) {
        notFound()
    }

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-950">
            <AuthHeader />
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-6">
                    <Link href="/dashboard/projects">
                        <Button variant="outline" size="sm">
                            <ArrowLeft className="w-4 h-4 mr-2"/>
                            Volver al listado
                        </Button>
                    </Link>
                </div>

                <ProjectForm project={project}/>
            </div>
        </div>
    )
}

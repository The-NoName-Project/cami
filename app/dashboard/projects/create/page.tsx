import {getCurrentUser} from "@/app/actions/auth"
import {ProjectForm} from "@/components/project-form"
import Link from "next/link"
import {Button} from "@/components/ui/button"
import {ArrowLeft} from "lucide-react"
import AuthHeader from "@/components/ui/auth/auth-header";
import {redirect} from "next/navigation";

export default async function CreateProjectPage() {
    const user = await getCurrentUser()

    if (!user) {
        redirect('/dashboard')
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

                <ProjectForm/>
            </div>
        </div>
    )
}

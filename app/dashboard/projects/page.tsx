import {getAllProjects} from "@/app/actions/projects"
import {getCurrentUser} from "@/app/actions/auth"
import {Button} from "@/components/ui/button"
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {Plus} from "lucide-react"
import Link from "next/link"
import {ProjectActions} from "./project-actions"
import AuthHeader from "@/components/ui/auth/auth-header";
import {Project} from "@/app/page";

export default async function ProjectsPage() {
    const user = await getCurrentUser()
    const projects = await getAllProjects()

    if (!user) {
        return <div>No autorizado</div>
    }

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-950">
            <AuthHeader/>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Gestión de Proyectos</h1>
                        <p className="text-gray-600 dark:text-gray-400">{projects.length} proyectos registrados</p>
                    </div>
                    <Link href="/dashboard/projects/create">
                        <Button>
                            <Plus className="w-4 h-4 mr-2"/>
                            Nuevo Proyecto
                        </Button>
                    </Link>
                </div>

                {projects.length === 0 ? (
                    <Card>
                        <CardContent className="flex items-center justify-center py-12">
                            <div className="text-center">
                                <div className="w-12 h-12 text-gray-400 mx-auto mb-4">🏗️</div>
                                <p className="text-gray-500 mb-4">No hay proyectos registrados.</p>
                                <Link href="/dashboard/projects/create">
                                    <Button>
                                        <Plus className="w-4 h-4 mr-2"/>
                                        Crear Primer Proyecto
                                    </Button>
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {projects.map((project: Project) => (
                            <Card key={project.id} className="overflow-hidden">
                                {project.images.length > 0 && (
                                    <div className="aspect-video overflow-hidden relative">
                                        <img
                                            src={project.images[0].url || "/placeholder.svg"}
                                            alt={project.images[0].caption || project.name}
                                            className="w-full h-full object-cover"
                                        />
                                        {project.images.length > 1 && (
                                            <div
                                                className="absolute top-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
                                                +{project.images.length - 1} más
                                            </div>
                                        )}
                                    </div>
                                )}
                                <CardHeader className="pb-3">
                                    <div className="flex items-start justify-between">
                                        <CardTitle className="text-lg line-clamp-2">{project.name}</CardTitle>
                                        <ProjectActions project={project}/>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-3">
                                        {project.description && (
                                            <p className="text-sm text-gray-600 line-clamp-3 mt-3 pt-3 border-t">{project.description}</p>
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

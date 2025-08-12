import Image from "next/image";
import { getCurrentUser, logoutUser } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

export default async function AuthHeader() {
    const user = await getCurrentUser()

    if (!user) {
        return null;
    }

    return (
        <header className="bg-white dark:bg-gray-900 shadow-sm border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-4">
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <Image src='/cami.png' alt="CAMI" width={50} height={50}/>
                            <a href="/dashboard" className="text-2xl font-bold text-gray-900 dark:text-white">CAMI</a>
                            {/*<p className="text-gray-600 dark:text-gray-400">Bienvenido, {user.name || user.email}</p>*/}
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center justify-between gap-2 mb-4">
                            <a href="/dashboard/maquinaria" className="text-gray-600 dark:text-gray-400">Maquinaria</a>
                            <a className="text-gray-600 dark:text-gray-400">Proyectos</a>
                        </div>
                    </div>
                    <form action={logoutUser}>
                        <Button variant="outline" type="submit">
                            <LogOut className="w-4 h-4 mr-2"/>
                            Cerrar Sesión
                        </Button>
                    </form>
                </div>
            </div>
        </header>
    )
}
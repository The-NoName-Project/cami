"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Home, FolderOpen, Wrench, LogOut, Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import Image from "next/image";

interface SidebarProps {
    user: {
        id: number
        email: string
        name: string | null
    }
    onLogout: () => void
}

const menuItems = [
    {
        title: "Inicio",
        href: "/dashboard",
        icon: Home,
    },
    {
        title: "Proyectos",
        href: "/dashboard/projects",
        icon: FolderOpen,
    },
    {
        title: "Maquinaria",
        href: "/dashboard/maquinaria",
        icon: Wrench,
    }
]

export function Sidebar({ user, onLogout }: SidebarProps) {
    const [isCollapsed, setIsCollapsed] = useState(false)
    const [isMobileOpen, setIsMobileOpen] = useState(false)
    const pathname = usePathname()

    const getUserInitials = (name: string | null, email: string) => {
        if (name) {
            return name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()
                .slice(0, 2)
        }
        return email.slice(0, 2).toUpperCase()
    }

    const SidebarContent = () => (
        <div className="flex flex-col h-full">
            {/* Header */}
            <div className="p-4 border-b">
                <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center">
                        {/*<span className="text-white font-bold text-sm">*/}
                            <Image src='/cami.png' alt="CAMI" width={50} height={50} className="rounded-lg object-cover"/>
                        {/*</span>*/}
                    </div>
                    {!isCollapsed && (
                        <div>
                            <h2 className="font-semibold text-gray-900 dark:text-white">CAMI</h2>
                            <p className="text-xs text-gray-500">Panel de Control</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4">
                <ul className="space-y-2">
                    {menuItems.map((item) => {
                        const Icon = item.icon
                        const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href))

                        return (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    className={cn(
                                        "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                                        isActive
                                            ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                                            : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800",
                                    )}
                                    onClick={() => setIsMobileOpen(false)}
                                >
                                    <Icon className="w-5 h-5 flex-shrink-0" />
                                    {!isCollapsed && <span>{item.title}</span>}
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </nav>

            {/* User Profile */}
            <div className="p-4 border-t">
                <div className="space-y-2">
                    <Link
                        href="#"
                        className={cn(
                            "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                            pathname === "/dashboard/profile"
                                ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                                : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800",
                        )}
                        onClick={() => setIsMobileOpen(false)}
                    >
                        <Avatar className="w-5 h-5">
                            <AvatarImage src="/placeholder.svg" />
                            <AvatarFallback className="text-xs">{getUserInitials(user.name, user.email)}</AvatarFallback>
                        </Avatar>
                        {!isCollapsed && <span>Mi Perfil</span>}
                    </Link>

                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={onLogout}
                        className={cn(
                            "w-full justify-start gap-3 px-3 py-2 text-sm font-medium",
                            "text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20",
                        )}
                    >
                        <LogOut className="w-5 h-5 flex-shrink-0" />
                        {!isCollapsed && <span>Cerrar Sesión</span>}
                    </Button>
                </div>

                {!isCollapsed && (
                    <div className="mt-4 pt-4 border-t">
                        <div className="flex items-center gap-3">
                            <Avatar className="w-8 h-8">
                                <AvatarImage src="/placeholder.svg" />
                                <AvatarFallback className="text-xs">{getUserInitials(user.name, user.email)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{user.name || "Usuario"}</p>
                                <p className="text-xs text-gray-500 truncate">{user.email}</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )

    return (
        <>
            {/* Mobile Menu Button */}
            <Button
                variant="ghost"
                size="sm"
                className="fixed top-4 left-4 z-50 md:hidden"
                onClick={() => setIsMobileOpen(!isMobileOpen)}
            >
                {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>

            {/* Mobile Overlay */}
            {isMobileOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" onClick={() => setIsMobileOpen(false)} />
            )}

            {/* Desktop Sidebar */}
            <div
                className={cn(
                    "hidden md:flex flex-col bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transition-all duration-300",
                    isCollapsed ? "w-16" : "w-64",
                )}
            >
                <div className="flex items-center justify-end p-2">
                    <Button variant="ghost" size="sm" onClick={() => setIsCollapsed(!isCollapsed)} className="w-8 h-8 p-0">
                        <Menu className="w-4 h-4" />
                    </Button>
                </div>
                <SidebarContent />
            </div>

            {/* Mobile Sidebar */}
            <div
                className={cn(
                    "fixed left-0 top-0 z-50 h-full w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transform transition-transform duration-300 md:hidden",
                    isMobileOpen ? "translate-x-0" : "-translate-x-full",
                )}
            >
                <SidebarContent />
            </div>
        </>
    )
}

import type React from "react"
import { getCurrentUser, logoutUser } from "@/app/actions/auth"
import { Sidebar } from "@/components/sidebar"
import { redirect } from "next/navigation"

export default async function DashboardLayout({
                                                  children,
                                              }: {
    children: React.ReactNode
}) {
    const user = await getCurrentUser()

    if (!user) {
        redirect("/login")
    }

    return (
        <div className="flex h-screen bg-gray-50 dark:bg-gray-950">
            <Sidebar user={user} onLogout={logoutUser} />
            <main className="flex-1 overflow-auto">{children}</main>
        </div>
    )
}
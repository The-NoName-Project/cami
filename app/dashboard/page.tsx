import { getRecentContactMessages } from "@/app/actions/contact"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Mail, Calendar } from "lucide-react"
import { DeleteMessageButton } from "./delete-message-button"
import AuthHeader from "@/components/ui/auth/auth-header";

type Message = {
    id: number
    name: string
    number: string
    email: string
    start_date: Date
    end_date: Date
    details: string
    createdAt: Date
    updatedAt: Date
    tool_id: number
}

export default async function DashboardPage() {
    const messages = await getRecentContactMessages()

    const formatDate = (date: Date) => {
        return new Intl.DateTimeFormat("es-ES", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        }).format(new Date(date))
    }

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-950">
            <AuthHeader />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-6">
                    <div className="flex items-center gap-2 mb-4">
                        <Mail className="w-5 h-5" />
                        <h2 className="text-xl font-semibold">Mensajes de Cotización</h2>
                        <Badge variant="secondary">{messages.length} mensajes (últimos 20 días)</Badge>
                    </div>

                    {messages.length === 0 ? (
                        <Card>
                            <CardContent className="flex items-center justify-center py-12">
                                <div className="text-center">
                                    <Mail className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                    <p className="text-gray-500">No hay mensajes de contacto en los últimos 20 días.</p>
                                </div>
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="grid gap-4">
                            {messages.map((message: Message) => (
                                <Card key={message.id}>
                                    <CardHeader className="pb-3">
                                        <div className="flex items-start justify-between">
                                            <div className="flex items-center gap-2">
                                                <div className="flex items-center gap-1">
                                                    <Badge variant="secondary">{message.name}</Badge>
                                                </div>
                                                <CardTitle className="text-lg">{message.email}</CardTitle>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <div className="flex items-center gap-1 text-sm text-gray-500">
                                                    <Calendar className="w-4 h-4" />
                                                    {formatDate(message.createdAt)}
                                                </div>
                                                <DeleteMessageButton messageId={message.id} />
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{message.details}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
            </main>
        </div>
    )
}

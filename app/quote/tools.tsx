"use client"

import {getAllTools} from "@/app/quote/list_tools";
import {Card} from "@/components/ui/card";

export default async function Tools() {
    const tools = await getAllTools()
    return (
        <Card>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {tools.map((tool) => (
                    <div key={tool.id} className="flex flex-col gap-2">
                        <h3 className="text-lg font-semibold">{tool.name}</h3>
                        <p className="text-sm text-muted-foreground">{tool.description}</p>
                    </div>
                ))}
            </div>
        </Card>
    )
}
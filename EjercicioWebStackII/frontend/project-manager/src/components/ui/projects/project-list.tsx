import {
    Card,
    CardContent
} from "@/components/ui/card";
import type { Project } from "@/interfaces/Project";
import { useState } from "react";
import { ScrollArea } from "../scroll-area";

export function ProjectList(props: { projects: Project[], onSelectProject: (project: Project) => void }) {
    const { projects, onSelectProject } = props;
    const [selectedId, setSelectedId] = useState<number | null>(null);

    return (
        <ScrollArea className="h-75 w-87.5 rounded-md border p-4">
            <div className="flex flex-col gap-2">
                <h2 className="text-xl mb-4">Proyectos: </h2>
                {projects.map((project) => (
                    <Card key={project.id} className={`select-none hover:border-primary/50 transition-colors max-w-md w-full rounded-xs hover:bg-sky-700 cursor-pointer ${project.id === selectedId ? 'border-primary bg-purple-500' : ''}`}
                        onClick={() => {
                            setSelectedId(project.id);
                            onSelectProject(project);
                        }}
                    >
                        <CardContent>
                            <h3 className="text-xl font-mono font-bold">
                                {project.titulo}
                            </h3>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </ScrollArea>
    );
}
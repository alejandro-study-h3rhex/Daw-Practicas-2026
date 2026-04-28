import {
    Card,
    CardContent
} from "@/components/ui/card";
import type { Task } from "@/interfaces/Task";
import { Badge } from "../badge";
import { Button } from "../common/button";
import { ScrollArea } from "../scroll-area";

export function TaskList(props: { tasks: Task[], onSelectTask: (task: Task) => void, onCompleteTask: (taskId: number) => void, onDeleteTask: (taskId: number) => void }) {
    const { tasks, onSelectTask, onCompleteTask, onDeleteTask } = props;

    const getStatusColor = (estado: string) => {
        switch (estado) {
            case 'pendiente':
                return 'bg-yellow-500';
            case 'en progreso':
                return 'bg-blue-500';
            case 'completada':
                return 'bg-green-500';
            default:
                return 'bg-gray-500';
        }
    };

    return (
        <ScrollArea className="h-75 w-150 rounded-md border p-4 bg-zinc-400">
            <div className="flex flex-col items-center gap-3">
                <h2 className="text-xl mb-4 font-semibold text-center text-gray-950">Tareas</h2>
                {tasks.map((task) => (
                    <Card key={task.id} className="group select-none hover:border-primary/50 transition-all duration-200 max-w-md w-full rounded-lg hover:shadow-md cursor-pointer shadow-md shadow-slate-500"
                        onClick={() => onSelectTask(task)}
                    >
                        <CardContent className="p-4">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="text-lg font-semibold text-shadow-white">
                                    {task.titulo}
                                </h3>
                                <Badge className={`${getStatusColor(task.estado)} text-white text-xs px-2 py-1`}>
                                    {task.estado.toUpperCase()}
                                </Badge>
                            </div>
                            {task.descripcion && (
                                <p className="text-sm text-gray-600 mb-2 leading-relaxed">
                                    {task.descripcion}
                                </p>
                            )}
                            {task.fecha_limite && (
                                <p className="text-xs text-gray-500 mb-3">
                                    {task.fecha_limite}
                                </p>
                            )}
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex justify-end gap-2">
                                {task.estado !== 'completada' && (
                                    <Button
                                        size="sm"
                                        className="bg-green-500 text-white hover:bg-green-600 text-xs px-3 py-1 rounded"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onCompleteTask(task.id);
                                        }}
                                    >
                                        ✓ Completar
                                    </Button>
                                )}
                                <Button
                                    size="sm"
                                    className="bg-red-500 text-white hover:bg-red-600 text-xs px-3 py-1 rounded"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onDeleteTask(task.id);
                                    }}
                                >
                                    ✕ Eliminar
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </ScrollArea>
    );
}
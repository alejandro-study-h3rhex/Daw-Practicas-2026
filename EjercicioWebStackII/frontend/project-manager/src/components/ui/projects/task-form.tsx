import type { Task } from "@/interfaces/Task";
import { useState } from "react";
import { Button } from "../common/button";

interface TaskFormProps {
    show: boolean;
    onClose: () => void;
    onAddTask: (titulo: string, descripcion?: string, fecha_inicio?: string, fecha_limite?: string) => void;
    task?: Task;
    onEditTask?: (taskId: number, titulo: string, descripcion?: string, fecha_inicio?: string, fecha_limite?: string) => void;
}

export function TaskForm({ show, onClose, onAddTask, task, onEditTask }: TaskFormProps) {
    const [titulo, setTitulo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [fecha_inicio, setFechaInicio] = useState('');
    const [fecha_limite, setFechaLimite] = useState('');

    const isEditing = !!task;

    const handleSubmit = () => {
        if (titulo.trim()) {
            if (isEditing && onEditTask && task) {
                onEditTask(task.id, titulo, descripcion || undefined, fecha_inicio || undefined, fecha_limite || undefined);
            } else {
                onAddTask(titulo, descripcion || undefined, fecha_inicio || undefined, fecha_limite || undefined);
            }
            if (!isEditing) {
                setTitulo('');
                setDescripcion('');
                setFechaInicio('');
                setFechaLimite('');
            }
            onClose();
        }
    };

    if (!show) return null;

    return (
        <div className="fixed inset-0 bg-background/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-card p-6 rounded-lg shadow-lg max-w-md w-full mx-4 border">
                <h3 className="text-lg font-bold mb-4 text-card-foreground">{isEditing ? 'Editar Tarea' : 'Nueva Tarea'}</h3>
                <label htmlFor="titulo" className="text-sm text-muted-foreground mb-1">Titulo:</label>
                <input
                    type="text"
                    placeholder="Título"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                    className="w-full p-2 mb-2 border border-input rounded bg-input text-foreground"
                />
                <label htmlFor="descripcion" className="text-sm text-muted-foreground mb-1">Descripción:</label>
                <textarea
                    placeholder="Descripción (opcional)"
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                    className="w-full p-2 mb-2 border border-input rounded bg-input text-foreground"
                    rows={3}
                />
                <label htmlFor="fecha_inicio" className="text-sm text-muted-foreground mb-1">Fecha de inicio:</label>
                <input
                    type="date"
                    placeholder="Fecha de inicio (opcional)"
                    value={fecha_inicio}
                    onChange={(e) => setFechaInicio(e.target.value)}
                    className="w-full p-2 mb-4 border border-input rounded bg-input text-foreground"
                />
                <label htmlFor="fecha_limite" className="text-sm text-muted-foreground mb-1">Fecha límite:</label>
                <input
                    type="date"
                    placeholder="Fecha límite (opcional)"
                    value={fecha_limite}
                    onChange={(e) => setFechaLimite(e.target.value)}
                    className="w-full p-2 mb-4 border border-input rounded bg-input text-foreground"
                />
                <div className="flex gap-2">
                    <Button onClick={handleSubmit} className="bg-primary text-primary-foreground hover:bg-primary/90 flex-1 cursor-pointer">
                        {isEditing ? 'Guardar' : 'Añadir'}
                    </Button>
                    <Button onClick={onClose} className="bg-secondary text-secondary-foreground hover:bg-secondary/80 flex-1 cursor-pointer">
                        Cancelar
                    </Button>
                </div>
            </div>
        </div>
    );
}
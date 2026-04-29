import { useProjects } from "@/hooks/use-projects";
import type { Task } from "@/interfaces/Task";
import { useEffect, useState } from "react";
import { Button } from "../common/button";
import { ProjectForm } from "./project-form";
import { ProjectList } from "./project-list";
import { TaskForm } from "./task-form";
import { TaskList } from "./task-list";

export function ProjectManager() {
    const {
        projects,
        selectedProject: selectedProjectId,
        setSelectedProject: setSelectedProjectId,
        isLoading,
        isSaving,
        error,
        getProjects,
        addProject,
        delProject,
        addTaskToProject,    // Función del hook
        delTaskFromProject,  // Función del hook
        toggleTaskStatus,    // Función del hook
        updateTaskToProject  // Función del hook
    } = useProjects();

    useEffect(() => {
        getProjects();
    }, []);

    const selectedProject = projects.find(p => p.id === selectedProjectId);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    const [showAddForm, setShowAddForm] = useState(false);
    const [showAddTaskForm, setShowAddTaskForm] = useState(false);
    const [editingTask, setEditingTask] = useState<Task | undefined>(undefined);

    // --- MANEJO DE TAREAS SIMPLIFICADO ---

    const handleCompleteTask = async (taskId: number) => {
        if (selectedProjectId) {
            await toggleTaskStatus(selectedProjectId, taskId);

            // Actualizamos la tarea seleccionada localmente si es la que se completó
            if (selectedTask?.id === taskId) {
                setSelectedTask(prev => prev ? { ...prev, estado: prev.estado === 'completada' ? 'pendiente' : 'completada' } : null);
            }
        }
    };

    const handleDeleteTask = async (taskId: number) => {
        if (selectedProjectId) {
            await delTaskFromProject(selectedProjectId, taskId);
            if (selectedTask?.id === taskId) setSelectedTask(null);
        }
    };

    const handleAddTask = async (titulo: string, descripcion?: string, fecha_inicio?: string, fecha_limite?: string) => {
        if (selectedProjectId) {
            await addTaskToProject(selectedProjectId, {
                titulo,
                descripcion,
                fecha_inicio,
                fecha_limite
            });
            setShowAddTaskForm(false);
        }
    };

    const handleEditTask = async (taskId: number, titulo: string, descripcion?: string, fecha_inicio?: string, fecha_limite?: string) => {
        if (selectedProjectId) {
            await updateTaskToProject(selectedProjectId, taskId, {
                titulo,
                descripcion,
                fecha_inicio,
                fecha_limite
            });
            setEditingTask(undefined);
        }
    };

    return (
        <div className="grid grid-cols-[280px_600px_320px] gap-6 bg-background">

            {/* COLUMNA IZQUIERDA (Pequeña) */}
            <div className="flex flex-col">
                <ProjectForm
                    show={showAddForm}
                    onClose={() => setShowAddForm(false)}
                    onAddProject={(titulo, precio, tipo, fecha_inicio, fecha_fin) => {
                        addProject({ titulo, precio, tipo, tareas: [], fecha_inicio, fecha_fin });
                        setShowAddForm(false);
                    }}
                />
                <h2 className="font-bold text-lg mb-4">Proyectos</h2>
                <div className="flex-1">
                    {isLoading ? <p>Cargando...</p> : (
                        <ProjectList
                            projects={projects}
                            onSelectProject={(p) => setSelectedProjectId(p.id)}
                        />
                    )}
                </div>
                <Button onClick={() => setShowAddForm(true)} className="mt-4 bg-primary text-primary-foreground py-2 rounded-md">
                    + Nuevo Proyecto
                </Button>
                {error && <p className="text-destructive text-xs mt-2 text-center">{error}</p>}
            </div>

            {/* COLUMNA CENTRAL (Más grande) */}
            <div className="flex flex-col bg-card border rounded-lg p-6 overflow-y-auto shadow-sm ">
                {!selectedProject ? (
                    <div className="flex items-center justify-center h-full text-muted-foreground">
                        <p>Selecciona un proyecto para ver sus tareas.</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <div className="flex justify-between items-center border-b pb-2">
                            <h2 className="text-xl font-bold">{selectedProject.titulo}</h2>
                            <Button onClick={() => setShowAddTaskForm(true)} className="bg-primary text-primary-foreground text-sm px-3 py-1 rounded-md">
                                + Añadir Tarea
                            </Button>
                        </div>
                        <TaskForm show={showAddTaskForm || !!editingTask} onClose={() => { setShowAddTaskForm(false); setEditingTask(undefined); }} onAddTask={handleAddTask} task={editingTask} onEditTask={handleEditTask} />
                        <TaskList
                            tasks={selectedProject.tareas}
                            onSelectTask={setSelectedTask}
                            onCompleteTask={handleCompleteTask}
                            onDeleteTask={handleDeleteTask}
                            onEditTask={setEditingTask}
                        />
                    </div>
                )}
            </div>

            {/* COLUMNA DERECHA (Pequeña) */}
            <div className="overflow-y-auto">
                {selectedProject && (
                    <div className="p-4 border rounded-lg shadow-sm">
                        <h3 className="text-md font-bold mb-4 text-primary">Detalle del Proyecto</h3>
                        <div className="space-y-3 text-sm">
                            <p><strong>Título:</strong> {selectedProject.titulo}</p>
                            <p><strong>Presupuesto:</strong> ${selectedProject.precio}</p>
                            <p><strong>Categoría:</strong> <span className="capitalize">{selectedProject.tipo}</span></p>
                            {selectedProject.fecha_inicio && <p><strong>Fecha de inicio:</strong> {selectedProject.fecha_inicio}</p>}
                            {selectedProject.fecha_fin && <p><strong>Fecha de fin:</strong> {selectedProject.fecha_fin}</p>}
                        </div>
                        <div className="mt-6 pt-4 border-t">
                            <Button
                                onClick={delProject}
                                disabled={isSaving}
                                className="w-full bg-destructive text-destructive-foreground py-2 rounded-md hover:bg-destructive/90"
                            >
                                {isSaving ? "Borrando..." : "Eliminar Proyecto"}
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
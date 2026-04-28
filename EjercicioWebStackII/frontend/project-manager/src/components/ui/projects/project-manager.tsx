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
        toggleTaskStatus     // Función del hook
    } = useProjects();

    useEffect(() => {
        getProjects();
    });

    const selectedProject = projects.find(p => p.id === selectedProjectId);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    const [showAddForm, setShowAddForm] = useState(false);
    const [showAddTaskForm, setShowAddTaskForm] = useState(false);

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

    return (
        <div className="flex w-full flex-col items-start justify-between gap-6 md:flex-row p-6">
            {/* COLUMNA IZQUIERDA */}
            <div className="flex flex-col gap-4 w-full md:w-64">
                <ProjectForm
                    show={showAddForm}
                    onClose={() => setShowAddForm(false)}
                    onAddProject={(titulo, precio, tipo) => {
                        addProject({ titulo, precio, tipo, tareas: [] });
                        setShowAddForm(false);
                    }}
                />
                <div className="flex flex-col gap-2">
                    <h2 className="font-bold text-lg">Proyectos</h2>
                    {isLoading ? <p>Cargando...</p> : (
                        <ProjectList
                            projects={projects}
                            onSelectProject={(p) => setSelectedProjectId(p.id)}
                        />
                    )}
                    <Button onClick={() => setShowAddForm(true)} className="bg-blue-500 text-white hover:bg-blue-600 rounded-md">
                        + Nuevo Proyecto
                    </Button>
                </div>
            </div>

            {/* COLUMNA CENTRAL */}
            <div className="flex-1 w-full">
                {!selectedProject ? (
                    <div className="text-center text-gray-500 mt-10">
                        <p>Selecciona un proyecto para ver sus tareas.</p>
                    </div>
                ) : (
                    <div className="flex flex-col gap-4">
                        <TaskForm show={showAddTaskForm} onClose={() => setShowAddTaskForm(false)} onAddTask={handleAddTask} />
                        <TaskList
                            tasks={selectedProject.tareas}
                            onSelectTask={setSelectedTask}
                            onCompleteTask={handleCompleteTask}
                            onDeleteTask={handleDeleteTask}
                        />
                        <Button onClick={() => setShowAddTaskForm(true)} className="bg-blue-500 text-white hover:bg-blue-600 text-sm rounded-md">
                            + Añadir Tarea
                        </Button>
                    </div>
                )}
            </div>

            {/* COLUMNA DERECHA */}
            {selectedProject && (
                <div className="w-full md:w-80 p-4 border rounded-lg bg-white shadow-sm">
                    <h3 className="text-md font-bold mb-4 text-gray-800">Detalle del Proyecto</h3>
                    <div className="space-y-2 text-sm text-gray-600">
                        <p><strong>Título:</strong> {selectedProject.titulo}</p>
                        <p><strong>Presupuesto:</strong> ${selectedProject.precio}</p>
                        <p><strong>Categoría:</strong> <span className="capitalize">{selectedProject.tipo}</span></p>
                    </div>
                    <div className="mt-6 pt-4 border-t">
                        <Button
                            onClick={delProject}
                            disabled={isSaving}
                            className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-md transition-colors"
                        >
                            {isSaving ? "Borrando..." : "Eliminar Proyecto"}
                        </Button>
                        {error && <p className="text-red-500 text-xs mt-2 text-center font-medium">{error}</p>}
                    </div>
                </div>
            )}
        </div>
    );
}
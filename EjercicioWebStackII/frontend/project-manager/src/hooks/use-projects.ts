import type { Project } from "@/interfaces/Project";
import type { Task } from "@/interfaces/Task";
import { useState } from "react";

export function useProjects() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [selectedProject, setSelectedProject] = useState<number>(); // Guardamos solo el id
    const [isLoading, setIsLoading] = useState(false);
    const [isSaving , setIsSaving] = useState(false);
    const [isSavedLastChange, setIsSavedLastChange] = useState(false); // Por defecto usamos false, ya que al cargar el proyecto no se ha guardado ningún cambio
    const [error, setError] = useState<string | null>(null);
    const API_URL = "http://localhost:8000";

    
    const getProjects = async () => {
        if(isLoading) return;
        setIsLoading(true);
        setError(null);

        try{
            const response = await fetch(`${API_URL}/proyectos`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json', // CRITICAL: Para que FastAPI entienda el cuerpo
                }
            });

            if(!response.ok){
                setError("Error al cargar los proyectos: " + response.status);    
            }
            
           const rawData = await response.json(); // Esto devuelve 'any' por defecto en fetch

            const cleanedData: Project[] = rawData.map((item: Project): Project => {
                // Aquí obligamos a que el objeto devuelto cumpla la interfaz Project
                return {
                    id: item.id,
                    titulo: item.titulo,
                    precio: Number(item.precio) || 0,
                    tipo: item.tipo,
                    tareas: Array.isArray(item.tareas) ? item.tareas : []
                };
            });

            setProjects(cleanedData);

        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : "Ocurrió un error inesperado");
        } finally {
            setIsLoading(false);
        }
    }

    const addProject = async (newProject: Omit<Project, 'id'>) => {
        setIsSaving(true);
        setError(null);
        setIsSavedLastChange(false);

        try {
            const response = await fetch(`${API_URL}/proyectos`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newProject)
            });

            if (!response.ok) {
                throw new Error(`Error del servidor: ${response.status}`);
            }

            const createdProject: Project = await response.json();
            setProjects(prev => [...prev, createdProject]);
            setIsSavedLastChange(true);

        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : "Ocurrió un error inesperado");
        } finally {
            setIsSaving(false);
        }
    };

    const updateProject = async (updatedProject: Project) => {
        setIsSaving(true);
        setError(null);
        setIsSavedLastChange(false);

        try {
            const response = await fetch(`${API_URL}/proyectos/${updatedProject.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedProject)
            });

            if (!response.ok) {
                throw new Error(`Error del servidor: ${response.status}`);
            }

            const savedProject: Project = await response.json();
            setProjects(prev => prev.map(p => p.id === updatedProject.id ? savedProject : p));
            setIsSavedLastChange(true);

        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : "Ocurrió un error inesperado");
        } finally {
            setIsSaving(false);
        }
    };

    const delProject = async () => {
        // 1. Verificación inicial: ¿Hay algo seleccionado?
        if (!selectedProject) return;

        setIsSaving(true);
        setError(null);
        setIsSavedLastChange(false);

        // Guardamos el ID en una constante para que sea más fácil de usar
        const idToDelete = selectedProject;

        try {
            const response = await fetch(`${API_URL}/proyectos/${idToDelete}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' }
            });

            if (!response.ok) {
                // Si el servidor falla, lanzamos error para ir al catch
                throw new Error(`Error del servidor: ${response.status}`);
            }

            
            // Filtramos la lista global
            setProjects(prev => prev.filter(p => p.id !== idToDelete));
            
            // Limpiamos el proyecto seleccionado (vaciamos las columnas derecha y central)
            setSelectedProject(undefined);
            
            setIsSavedLastChange(true);

        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : "Ocurrió un error inesperado");
        } finally {
            setIsSaving(false);
        }
    };


    const addTaskToProject = async (projectId: number, taskData: Omit<Task, 'id' | 'estado'>) => {
        const project = projects.find(p => p.id === projectId);
        if (!project) return;

        // Generamos un ID temporal o dejamos que el backend lo gestione. 
        // Aquí seguimos tu lógica de buscar el ID máximo.
        const newTaskId = project.tareas.length > 0 
            ? Math.max(...project.tareas.map(t => t.id)) + 1 
            : 1;

        const newTask: Task = {
            ...taskData,
            id: newTaskId,
            estado: 'pendiente'
        };

        const updatedProject = {
            ...project,
            tareas: [...project.tareas, newTask]
        };

        // Reutilizamos la lógica de updateProject para persistir en FastAPI
        await updateProject(updatedProject);
    };

    const delTaskFromProject = async (projectId: number, taskId: number) => {
        const project = projects.find(p => p.id === projectId);
        if (!project) return;

        const updatedProject = {
            ...project,
            tareas: project.tareas.filter(t => t.id !== taskId)
        };

        await updateProject(updatedProject);
    };

    const toggleTaskStatus = async (projectId: number, taskId: number) => {
        const project = projects.find(p => p.id === projectId);
        if (!project) return;

        const updatedProject = {
            ...project,
            tareas: project.tareas.map(t => {
                if (t.id === taskId) {
                    return { 
                        ...t, 
                    estado: (t.estado === 'completada' ? 'pendiente' : 'completada') as 'pendiente' | 'completada'                    }
                    ;
                }
                return t;
            })
        };

        await updateProject(updatedProject);
    };

    const updateTaskToProject = async (projectId: number, taskId: number, updatedTask: Partial<Omit<Task, 'id' | 'estado'>>) => {
        const project = projects.find(p => p.id === projectId);
        if (!project) return;

        const updatedProject = {
            ...project,
            tareas: project.tareas.map(t => t.id === taskId ? { ...t, ...updatedTask } : t)
        };

        await updateProject(updatedProject);
    };

    return {
        projects,
        selectedProject,
        setSelectedProject,
        isLoading,
        isSaving,
        isSavedLastChange,
        error,
        getProjects,
        addProject,
        updateProject,
        delProject,
        addTaskToProject,
        delTaskFromProject,
        toggleTaskStatus,
        updateTaskToProject
    };
}
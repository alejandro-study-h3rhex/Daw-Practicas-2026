import type { Task } from "./Task";

interface Project {
  id: number;
  titulo: string;
  precio: number;
  tipo: 'web' | 'mobile' | 'desktop' | 'otro';
  fecha_inicio?: string;
  tareas: Task[];
}

export type { Project };

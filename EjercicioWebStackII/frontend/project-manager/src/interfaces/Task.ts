interface Task {
  id: number;
  titulo: string;
  descripcion?: string;
  fecha_inicio?: string;
  fecha_limite?: string;
  estado: 'pendiente' | 'en progreso' | 'completada';
}

export type { Task };

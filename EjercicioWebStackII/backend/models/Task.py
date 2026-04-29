from pydantic import BaseModel
from typing import Optional, Literal

# Definimos el tipo literal para que coincida con el frontend
EstadoTarea = Literal["pendiente", "en progreso", "completada"]


class Task(BaseModel):
    id: int
    titulo: str
    descripcion: Optional[str] = None
    fecha_inicio: Optional[str] = None
    fecha_limite: Optional[str] = None
    estado: EstadoTarea = "pendiente"

    class Config:
        # Esto permite que la clase sea compatible si usas ORMs como SQLAlchemy
        from_attributes = True

    def to_json(self):
        """Retorna la representación en cadena JSON del modelo"""
        return self.model_dump_json()

    def __str__(self):
        return f"Tarea: {self.titulo} ({self.estado})"

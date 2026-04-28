from pydantic import BaseModel
from typing import List, Optional, Literal
from .Task import Task

TipoProyecto = Literal["web", "mobile", "desktop", "otro"]


class Project(BaseModel):
    id: int
    titulo: str
    precio: float
    tipo: TipoProyecto
    fecha_inicio: Optional[str] = None
    fecha_limite: Optional[str] = None
    tareas: List[Task] = []

    class Config:
        from_attributes = True

    def to_json(self):
        """Retorna la representación en cadena JSON del modelo"""
        return self.model_dump_json()

    def __str__(self):
        return f"Proyecto: {self.titulo} ({len(self.tareas)} tareas)"

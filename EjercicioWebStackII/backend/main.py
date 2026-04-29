from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

from typing import List
from models.Project import Project
from models.Task import Task

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    # Permite cualquier origen (incluyendo tu IP 172.18.0.2)
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],  # Permite GET, POST, PUT, DELETE, etc.
    allow_headers=["*"],  # Permite todos los headers (incluyendo Content-Type)
)

# Definimos los datos de prueba
tarea1 = Task(
    id=101,
    titulo="Configurar Base de Datos",
    estado="completada"
)

tarea2 = Task(
    id=102,
    titulo="Crear Endpoints de Proyecto",
    estado="pendiente"
)

nuevo_proyecto = Project(
    id=1,
    titulo="Sistema de Gestión FastAPI",
    precio=1250.50,
    tipo="web",
    tareas=[tarea1, tarea2]
)


def getListaProjectos() -> List[Project]:
    # Simplemente retornamos la lista de objetos Project
    return [nuevo_proyecto]


@app.get("/proyectos", response_model=List[Project])
async def read_projects():
    # Llamamos a la función y FastAPI la convertirá a JSON automáticamente
    return getListaProjectos()


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)

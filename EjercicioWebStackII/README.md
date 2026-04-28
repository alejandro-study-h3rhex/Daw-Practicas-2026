# Project Manager Stack (FastAPI + React)

Este es un gestor de proyectos y tareas simple construido con un stack moderno y configurado completamente mediante **Dev Containers** para asegurar un entorno de desarrollo idéntico en cualquier máquina.

## Stack Tecnológico

- **Backend:** FastAPI (Python 3.11) + SQLAlchemy + Alembic
- **Frontend:** React + Vite + TypeScript + ShadCN UI + Taildwind CSS
- **Base de Datos:** PostgreSQL 15
- **Entorno:** Dev Containers (Docker)

## Estructura del Proyecto

```text
.
├── .devcontainer/     # Configuración del entorno virtualizado
├── backend/            # API REST (FastAPI)
├── frontend/           # Interfaz de usuario (React)
├── docker-compose.yml  # Orquestación de servicios (App + DB)

```
## Cómo empezar

### 1. Requisitos previos
1. Linux con Docker Engine instalado (recomendado) o Docker Desktop.
2. Visual Studio Code con la extensión Dev Containers.

### 2. Levantar el entorno
1. Abre la carpeta del proyecto en VS Code.
2. Pulsa F1 y selecciona: Dev Containers: Reopen in Container.
3. Espera a que el contenedor se construya (la primera vez descargará Node y las dependencias de Python).

### 3. Configuración Inicial (Dentro del contenedor)
#### Frontend (Vite + React)
```bash
# Crear el frontend (si no existe)
npm create vite@latest frontend -- --template react-ts
cd frontend
npm install
```
#### Backend (FastAPI)
```bash
# Configurar el entorno de Python
cd backend
python -m venv .venv
source .venv/bin/activate
pip install fastapi uvicorn sqlalchemy psycopg2-binary alembic
```
### Base de Datos
El servicio de PostgreSQL está disponible automáticamente dentro de la red de Docker.
~~~
Host: db
Puerto: 5432
Usuario: root
Password: 12345
Base de datos: project_db
~~~

## Notas de Desarrollo

Los archivos se sincronizan en tiempo real entre el contenedor y tu máquina host.
El formateo de código (Prettier y Black) se aplica automáticamente al guardar.
Las carpetas pesadas como node_modules y __pycache__ están ocultas en el explorador de archivos para mayor limpieza.

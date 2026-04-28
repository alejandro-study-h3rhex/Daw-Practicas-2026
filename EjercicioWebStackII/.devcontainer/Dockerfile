# Usamos una imagen de Python oficial
FROM mcr.microsoft.com/vscode/devcontainers/python:3.11

# Instalamos Node.js (LTS) manualmente
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs

# Instalamos dependencias para Postgres
RUN apt-get update && apt-get install -y \
    postgresql-client \
    libpq-dev \
    gcc \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

WORKDIR /workspace
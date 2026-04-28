# Agentic RAG: Recuperación con Autocorrección

## Orquestado con LangGraph & OpenAI
Este ejercicio implementa un flujo de Generación Aumentada por Recuperación (RAG) de tipo agéntico. A diferencia de un RAG lineal, este sistema utiliza un bucle de retroalimentación para validar la relevancia de los documentos y reescribir consultas si la búsqueda inicial falla.

## Arquitectura del Sistema
El flujo sigue una lógica de grafo cíclico donde la IA actúa como su propio supervisor de calidad.

<img src="docs/graph.png" width=800px style="border-radius:20px;"/>

### Descripción de los Nodos

1.  **Agent (Planner)**: Recibe la pregunta del usuario y decide si necesita consultar fuentes externas mediante la herramienta de búsqueda.
2.  **Retrieval Tool**: Recupera fragmentos de información (chunks) utilizando modelos de **Embeddings** de OpenAI y una base de datos vectorial.
3.  **Grader (Evaluador)**: Un nodo crítico que actúa como filtro de calidad. Determina si los documentos recuperados son realmente relevantes para la pregunta.
4.  **Rewrite**: Si el Grader detecta que la información no es útil, el sistema reescribe la pregunta original para intentar una búsqueda más precisa y vuelve al nodo del Agente.
5.  **Generate**: Una vez validada la relevancia, el LLM (`gpt-4o-mini`) sintetiza la respuesta final basándose exclusivamente en el contexto verificado.

## Estructura del Código
Para entender cómo está construido, estas son las piezas fundamentales:

1. **tools.py:** Configuración de los documentos, el VectorStore y la herramienta de recuperación.

2. **nodes.py:** Contiene las funciones lógicas de cada nodo (Agent, Grader, Rewriter, Generator).

3. **state.py:** Define el esquema del estado que viaja por el grafo (una lista de mensajes).

4. **graph.py:** El "plano" donde se conectan los nodos mediante aristas condicionales1.

5. **main.py:** Script de ejecución para realizar consultas.

## Ejemplo de "Pensamiento" del Agente
```
--- INICIANDO AGENTIC RAG ---
1. [NODO: agent] -> "Necesito buscar sobre reward hacking."
2. [NODO: retrieve] -> Recuperando documentos...
3. [NODO: grader] -> RELEVANCIA: NO (El contenido no es suficientemente claro).
4. [NODO: rewrite] -> "Reformulando pregunta para ser más específico..."
5. [NODO: agent] -> Nueva búsqueda con pregunta optimizada.
6. [NODO: grader] -> RELEVANCIA: SÍ (¡Encontrado!).
7. [NODO: generate] -> Generando respuesta basada en evidencia.

--- RESPUESTA FINAL ---
The two main categories of reward hacking according to Lilian Weng are environment and goal.
```
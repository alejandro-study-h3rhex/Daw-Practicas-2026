from langchain_core.tools import tool

@tool
def search(query: str) -> str:
    """Busca información factual."""
    fake_db = {
        "langgraph":"LangGraph es una librería de LangChain para crear agentes con grafos y estado.",
        "openai":"OpenAI ofrece modelos de lenguaje accesibles vía API."
    }
    
    return fake_db.get(query.lower(),"No se encontró información relevante.")


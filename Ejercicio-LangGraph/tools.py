from dotenv import load_dotenv
from langchain_community.tools import TavilySearchResults
from langchain_core.tools import tool
from langchain_tavily import TavilySearch

load_dotenv()

# k=3 significa que nos traerá los 3 mejores resultados de internet
tavily_tool = TavilySearch(max_results=3)

@tool
def search(query: str) -> str:
    """Busca información factual y actualizada en internet sobre el tema especificado."""    
    print(f"Realizando búsqueda en internet para: {query}")
    results = tavily_tool.run(query)
    
    if not results:
        return "No se encontraron resultados."
    return results
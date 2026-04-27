from langchain_core.messages import HumanMessage
from graph import app

result = app.invoke({
    "question":"¿Qué es LangGraph y para qué sirve?",
    "messages": [HumanMessage(content="¿Qué es LangGraph y para qué sirve?")],
    "research_notes":"",
    "draft":"",
    "approved":False,
    "iterations":0
})

print(result["draft"])

# En tu main.py, después de 'app = build_graph()'
print("\n--- ESTRUCTURA DEL GRAFO ---")
app.get_graph().print_ascii()
print("------------------------------\n")

from graph import app
from langchain_core.messages import HumanMessage
from dotenv import load_dotenv

def run_agentic_rag(query: str):
    load_dotenv()
    inputs = {"messages": [("user", query)]}
    print(f"--- INICIANDO AGENTIC RAG ---")
    
    final_output = None
    for output in app.stream(inputs, stream_mode="updates"):
        for node, value in output.items():
            print(f"\n[Nodo Finalizado: {node}]")
            final_output = value # Guardamos el último valor generado
    
    # Extraemos el mensaje del último nodo que se ejecutó (que debería ser 'generate')
    if final_output and "messages" in final_output:
        last_message = final_output["messages"][-1]
        print("\n--- RESPUESTA FINAL ---")
        print(last_message.content)
        print("\n--- FIN DEL AGENTIC RAG ---")

if __name__ == "__main__":
    run_agentic_rag("What are the two main categories of reward hacking according to Lilian Weng?")
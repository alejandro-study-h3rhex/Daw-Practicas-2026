from dotenv import load_dotenv
from langchain.messages import HumanMessage, SystemMessage
from langchain_openai import ChatOpenAI
from state import State
import state
from tools import search

# Load environment variables from .env file (OpenAI api key)
load_dotenv()

llm = ChatOpenAI(model="gpt-4o-mini")
llm_with_tools = llm.bind_tools([search])

def planner(state: State):
    """
    Decide si es necesario investigar antes de responder.
    Devuelve una clave booleana (needs_research).
    """
    print("--- NODO: PLANNER ---")
    
    prompt = [
        SystemMessage(content="""Eres un planificador experto. 
        Analiza la pregunta del usuario y decide si necesitas buscar información externa para dar una respuesta precisa y actualizada.
        Responde estrictamente con una palabra: 'YES' si necesitas investigar, o 'NO' si puedes responder con total seguridad."""),
        HumanMessage(content=state["question"])
    ]

    response = llm.invoke(prompt)
    decision = response.content.strip().upper()
    needs_research = "YES" in decision

    # Prints for debugging purposes
    if needs_research:
        print("El planificador ha decidido que se necesita investigación.")
    else:
        print("El planificador ha decidido que no se necesita investigación.")

    return {
        "messages": [response], 
        "needs_research": needs_research, # Update state with the planner's decision
        "iterations": state["iterations"] + 1 
    }

def researcher(state: State):
    """
    Usa la tool de búsqueda y guarda notas en el estado.
    """
    print("--- NODO: RESEARCHER ---")

    query = state["question"]

    try:
        search_results = search.invoke(query)
    except Exception as e:
        print(f"Ha ocurrido un error realizando la busqueda de informacion: {e}")
        search_results = []

    print(f"Investigación completada para: {query}")

    return {
        "research_notes": search_results, # Update state with research findings
        "iterations": state["iterations"] + 1 
    }

def drafter(state: State):
    """
    Redacta una respuesta usando research_notes.
    """

    print("--- NODO: DRAFTER ---")

    question = state["question"]
    research_notes = state.get("research_notes", "")

    prompt = [
        SystemMessage(content="""Eres un redactor experto. 
        Redacta una respuesta clara y completa a la pregunta del usuario, utilizando la información de investigación proporcionada si está disponible."""),
        HumanMessage(content=f"Pregunta: {question}\nNotas de investigación: {research_notes}")
    ]

    # Generate an answer using the LLM, which may include information from the research if it was conducted
    response = llm.invoke(prompt)
    return {
        "draft": [response.content],
        "messages": [response],
        "iterations": state["iterations"] + 1
    }

def reviewer(state: State):
    """
    Revisa la respuesta y decide si está aprobada.
    Incrementa el contador de iteraciones.
    """
    print("--- NODO: REVIEWER ---")
    question = state["question"]
    draft = state.get("draft", "")

    prompt = [
        SystemMessage(content="""Eres un revisor crítico de respuestas. 
        Tu única misión es decidir si la respuesta actual es satisfactoria, verídica y responde completamente a la pregunta.
        
        CRITERIOS DE APROBACIÓN:
        1. La respuesta responde directamente a lo que se preguntó.
        2. No hay contradicciones.
        3. Si se requería investigación, la información está presente.

        Responde ÚNICAMENTE con la palabra 'TRUE' si la respuesta es correcta o 'FALSE' si debe ser mejorada o necesita más investigación."""),
        HumanMessage(content=f"Pregunta original: {question}\nRespuesta a evaluar: {draft}")
    ]

    response = llm.invoke(prompt)
    decision = response.content.strip().upper()
    approved = "TRUE" in decision
    if approved:
        print("El revisor ha aprobado la respuesta.")
    else:
        print("El revisor ha rechazado la respuesta. Se requerirá una nueva iteración.")
    
    return {
        "approved": approved,
        "iterations": state["iterations"] + 1
    }

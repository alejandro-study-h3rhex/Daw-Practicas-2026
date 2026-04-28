from langgraph.graph import MessagesState
from langchain.chat_models import init_chat_model
from tools import retriever_tool
from pydantic import BaseModel, Field
from typing import Literal
from langchain_core.messages import convert_to_messages
from langchain.messages import HumanMessage


response_model = init_chat_model("gpt-4o-mini", model_provider="openai", temperature=0)

def generate_query_or_respond(state: MessagesState):
    """Decide si usar la herramienta o responder directamente."""
    print("--- NODO: GENERATE QUERY OR RESPOND ---")
    response = response_model.bind_tools([retriever_tool]).invoke(state["messages"])
    return {"messages": [response]}

# Grade Documents Node

class GradeDocuments(BaseModel):
    """Esquema para la salida estructurada del evaluador."""
    binary_score: str = Field(
        description="Relevance score: 'yes' if relevant, or 'no' if not relevant"
    )

GRADE_PROMPT = (
    "You are a grader assessing relevance of a retrieved document to a user question. \n "
    "Here is the retrieved document: \n\n {context} \n\n"
    "Here is the user question: {question} \n"
    "If the document contains keyword(s) or semantic meaning related to the user question, grade it as relevant. \n"
    "Give a binary score 'yes' or 'no' score to indicate whether the document is relevant to the question."
)


grader_model = init_chat_model("gpt-4o-mini", temperature=0)


def grade_documents(
    state: MessagesState,
) -> Literal["generate_answer", "rewrite_question"]:
    """Determine whether the retrieved documents are relevant to the question."""
    question = state["messages"][0].content
    context = state["messages"][-1].content

    prompt = GRADE_PROMPT.format(question=question, context=context)

    response = (
        grader_model.with_structured_output(GradeDocuments).invoke([{"role": "user", "content": prompt}])
    )
    score = response.binary_score

    if score == "yes":
        print("--- RELEVANCIA: SÍ ---")
        return "generate"
    else:
        print("--- RELEVANCIA: NO ---")
        return "rewrite"

# Rewrite Question Node

REWRITE_PROMPT = (
    "Look at the input and try to reason about the underlying semantic intent / meaning.\n"
    "Here is the initial question:"
    "\n ------- \n"
    "{question}"
    "\n ------- \n"
    "Formulate an improved question:"
)

def rewrite_question(state: MessagesState):
    """Rewrite the original user question."""
    messages = state["messages"]
    question = messages[0].content
    prompt = REWRITE_PROMPT.format(question=question)
    response = response_model.invoke([{"role": "user", "content": prompt}])
    return {"messages": [HumanMessage(content=response.content)]}

# Generate Answer Node
GENERATE_PROMPT = (
    "You are an assistant for question-answering tasks. "
    "Use the following pieces of retrieved context to answer the question. "
    "If you don't know the answer, just say that you don't know. "
    "Use three sentences maximum and keep the answer concise.\n"
    "Question: {question} \n"
    "Context: {context}"
)


def generate_answer(state: MessagesState):
    """Generate an answer."""
    question = state["messages"][0].content
    context = state["messages"][-1].content
    prompt = GENERATE_PROMPT.format(question=question, context=context)
    response = response_model.invoke([{"role": "user", "content": prompt}])
    return {"messages": [response]}


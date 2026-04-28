from langgraph.graph import StateGraph, START, END
from langgraph.prebuilt import tools_condition, ToolNode
from tools import retriever_tool
from nodes import generate_answer, generate_query_or_respond, grade_documents, rewrite_question
from state import State

workflow = StateGraph(State)

workflow.add_node("agent", generate_query_or_respond)
workflow.add_node("retrieve", ToolNode([retriever_tool]))
workflow.add_node("rewrite", rewrite_question)
workflow.add_node("generate", generate_answer)

workflow.add_edge(START, "agent")

workflow.add_conditional_edges(
    "agent",
    tools_condition,
    {
        "tools": "retrieve",
        "__end__": END,
    },
)

workflow.add_conditional_edges(
    "retrieve",
    grade_documents,
    {
        "generate": "generate",
        "rewrite": "rewrite", 
    }
)
workflow.add_edge("rewrite", "agent")
workflow.add_edge("generate", END)

app = workflow.compile()
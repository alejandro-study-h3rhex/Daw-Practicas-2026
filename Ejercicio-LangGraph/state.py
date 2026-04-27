from typing import TypedDict, Annotated
from langchain_core.messages import BaseMessage
from langgraph.graph import add_messages

class State(TypedDict):
    question: str
    messages: Annotated[list[BaseMessage], add_messages ]
    needs_research: bool
    research_notes: str
    draft: str
    approved: bool
    iterations: int
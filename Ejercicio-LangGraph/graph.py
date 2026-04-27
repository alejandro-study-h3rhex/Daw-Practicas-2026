from langgraph.graph import StateGraph, END
from state import State
from nodes import planner, researcher, drafter, reviewer
import state

def build_graph():
    graph_builder = StateGraph(State)

    graph_builder.add_node("planner", planner)
    graph_builder.add_node("researcher", researcher)
    graph_builder.add_node("drafter", drafter)
    graph_builder.add_node("reviewer", reviewer)

    # Planner
    graph_builder.set_entry_point("planner")

    def route_after_planner(state: State):
        if state.get("needs_research", False):
            return "researcher"
        else:
            return "drafter"
    
    graph_builder.add_conditional_edges(
        "planner",              # Origin node
        route_after_planner,    # Direction function that decides the next node based on the state
        {
            "researcher": "researcher", # if route_after_planner returns "researcher", va al nodo researcher
            "drafter": "drafter"        # if route_after_planner returns "drafter", va al nodo drafter
        }
    )

    # Simple connections for the rest of the flow
    graph_builder.add_edge("researcher", "drafter")
    graph_builder.add_edge("drafter", "reviewer")

    def route_after_reviewer(state: State):
        """
        - Si approved es True → END
        - Si iterations >= 3 → END
        - En otro caso → research
        """
         
        if state.get("approved", False):
            return "END"
        
        if state.get("iterations", 0) >= 3:
            print("--- MÁXIMAS ITERACIONES ALCANZADAS ---")
            return "END"
        
        return "reintentar"
        
    graph_builder.add_conditional_edges(
        "reviewer",
        route_after_reviewer,
        {
            "END": END,              
            "reintentar": "researcher"
        }
    )

    app = graph_builder.compile()
    return app

app = build_graph()
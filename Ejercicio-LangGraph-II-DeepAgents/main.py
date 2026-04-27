from agents import agent

def main():
    result = agent.invoke({"messages": [{"role": "user", "content": "What is langgraph?"}]})

    # Print the agent's response
    print("Agent's response:")
    print(result["messages"][-1].content)

if __name__ == "__main__":
    main()
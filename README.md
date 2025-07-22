# Mr. Agent AI

This is a conceptual project designed to explore and demonstrate the core principles of **Agentic AI** using TypeScript. The project simulates an AI agent that can perceive input, reason, plan, act using tools, and learn from interactions.

## Guiding Principles

The agent's design is metaphorically broken down into a few key steps:

1.  **Define the Purpose**: What is the agent's ultimate goal?
2.  **Design the Spirit**: The agent's "brain" or **spirit**. This is the core `Agent` class that orchestrates everything.
3.  **Choose Alchemy and Tools**: The agent's memory (`Memory` class) and capabilities (`tools`).
4.  **Craft its Voice, Forge its Tools**: The orchestration logic that connects perception to action.

## How it Works

The agent operates on a continuous loop, similar to human cognition:

**Perception -> Reasoning & Planning -> Action -> Learning**

1.  **Perception**: The agent receives raw input (e.g., a text string from a user).
2.  **Reasoning & Planning**: It analyzes the input, retrieves relevant information from its memory, and decides on the best course of action. This might involve choosing a specific tool or formulating a direct response.
3.  **Action**: The agent executes the chosen plan. If a tool was selected (like `searchWeb` or `sendEmail`), it runs it.
4.  **Learning**: The agent reflects on the outcome of its action and updates its long-term memory with new knowledge.

## How to Run

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Build the Project**:
    This command compiles both the backend server and the frontend client code.
    ```bash
    npm run build
    ```

3.  **Start the Server**:
    ```bash
    npm start
    ```

4.  Open your browser and navigate to `http://localhost:3000`. You can now interact with the agent through the web interface.

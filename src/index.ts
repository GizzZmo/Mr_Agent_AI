import { Agent } from './agent';
import { Memory } from './memory';
import { tools } from './tools';

async function main() {
  console.log("\n--- Agentic AI Application Simulation ---");

  // Step 1: Define the Purpose
  const agentPurpose = "To assist users by providing information, summarizing content, and performing actions via available tools.";

  // Step 2 & 3: Instantiate Memory and the Agent
  const agentMemory = new Memory();
  const myAgent = new Agent("InquisitorBot", agentPurpose, tools, agentMemory);

  console.log("\nAgent initialized. Simulating interaction steps...");

  // Simulate a sequence of interactions
  const interactions = [
    "Hello, what can you do?",
    "Search for Agentic AI benefits.",
    "Can you summarize this text for me: Agentic AI allows for autonomous decision-making, goal-driven actions, and adaptive learning, making systems more intelligent and proactive.",
    "Send email to info@example.com about project update saying The project is progressing well, expecting completion next week.",
    "Tell me more about yourself.",
    "What are the challenges of Agentic AI?"
  ];

  for (let i = 0; i < interactions.length; i++) {
    const input = interactions[i];
    console.log(`\n--- User Input ${i + 1} ---`);
    console.log(`User says: "${input}"`);

    // The core agent loop: Perceive -> Reason & Plan -> Act
    const perception = await myAgent.perceive(input);
    const action = await myAgent.reasonAndPlan(perception);
    const result = await myAgent.act(action);
    myAgent.communicate(result);

    // Simulate learning from feedback on specific interactions
    if (i === 2) {
      myAgent.learn("Successfully summarized text and provided accurate output.");
    } else if (i === 4) {
      myAgent.learn("Need to improve direct responses about self-description.");
    }
  }

  // **FIXED LINE**
  console.log("\n--- Simulation Complete ---");
  
  console.log("Final Long-term Memory:", agentMemory.retrieve('agent purpose').longTerm);
}

main().catch(console.error);

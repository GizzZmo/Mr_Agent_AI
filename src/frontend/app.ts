document.addEventListener('DOMContentLoaded', () => {
  // --- Element Selection ---
  const promptInput = document.getElementById('prompt-input') as HTMLInputElement;
  const sendButton = document.getElementById('send-button') as HTMLButtonElement;
  const chatOutput = document.getElementById('chat-output') as HTMLDivElement;

  // Exit if essential elements are not found
  if (!promptInput || !sendButton || !chatOutput) {
    console.error("Essential chat elements not found!");
    return;
  }

  // --- Functions ---
  /**
   * Appends a message to the chat output in a secure way.
   * @param sender - 'User' or 'Agent'
   * @param message - The message content
   */
  function appendMessage(sender: string, message: string) {
    const messageDiv = document.createElement('div');
    messageDiv.className = sender === 'User' ? 'user-message' : 'agent-message';

    // Use textContent and createTextNode to prevent XSS vulnerabilities
    const senderStrong = document.createElement('strong');
    senderStrong.textContent = `${sender}: `;
    
    const messageText = document.createTextNode(message);

    messageDiv.appendChild(senderStrong);
    messageDiv.appendChild(messageText);
    chatOutput.appendChild(messageDiv);

    // Scroll to the latest message
    chatOutput.scrollTop = chatOutput.scrollHeight;
  }

  /**
   * Handles sending a message and getting a simulated agent response.
   */
  function handleSend() {
    const prompt = promptInput.value.trim();
    if (!prompt) return; // Do nothing if input is empty

    appendMessage('User', prompt);
    promptInput.value = '';

    let agentResponse: string;
    const lowerCasePrompt = prompt.toLowerCase();

    // --- Simulate Agent Response Logic ---
    if (lowerCasePrompt.includes('hello')) {
      agentResponse = "Hello there! I am an Agentic AI. How can I assist you today?";
    } else if (lowerCasePrompt.includes('your purpose')) {
      agentResponse = "My purpose is to demonstrate the principles of Agentic AI, including perception, reasoning, action, memory, and learning.";
    } else if (lowerCasePrompt.includes('search for')) {
      const query = lowerCasePrompt.replace('search for', '').trim();
      agentResponse = `Simulating a web search for '${query}'. Found conceptual results about it.`;
    } else if (lowerCasePrompt.includes('summarize')) {
      agentResponse = "Simulating text summarization. I've conceptually processed your request.";
    } else if (lowerCasePrompt.includes('send email')) {
      agentResponse = "Simulating sending an email. The email has been conceptually dispatched.";
    } else if (lowerCasePrompt.includes('agentic ai')) {
      agentResponse = "Agentic AI refers to intelligent systems that can perceive, reason, plan, act, and learn autonomously to achieve defined goals.";
    } else {
      agentResponse = "That's an interesting thought! Could you elaborate or ask a different question?";
    }

    // Simulate a delay for the agent to 'think'
    setTimeout(() => {
      appendMessage('Agent', agentResponse);
    }, 500);
  }

  // --- Event Listeners ---
  sendButton.addEventListener('click', handleSend);

  promptInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      handleSend();
    }
  });

  // --- Initial Message ---
  appendMessage('Agent', 'Hello! I am a conceptual Agentic AI assistant. What can I do for you?');
});

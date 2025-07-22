document.addEventListener('DOMContentLoaded', () => {
  const promptInput = document.getElementById('prompt-input') as HTMLInputElement;
  const sendButton = document.getElementById('send-button') as HTMLButtonElement;
  const chatOutput = document.getElementById('chat-output') as HTMLDivElement;

  if (!promptInput || !sendButton || !chatOutput) {
    console.error("Essential chat elements not found!");
    return;
  }

  function appendMessage(sender: 'User' | 'Agent', message: string) {
    const messageDiv = document.createElement('div');
    messageDiv.className = sender === 'User' ? 'user-message' : 'agent-message';

    const senderStrong = document.createElement('strong');
    senderStrong.textContent = `${sender}: `;
    
    const messageText = document.createTextNode(message);

    messageDiv.appendChild(senderStrong);
    messageDiv.appendChild(messageText);
    chatOutput.appendChild(messageDiv);
    chatOutput.scrollTop = chatOutput.scrollHeight;
  }

  async function handleSend() {
    const prompt = promptInput.value.trim();
    if (!prompt) return;

    appendMessage('User', prompt);
    promptInput.value = '';
    sendButton.disabled = true;

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.statusText}`);
      }

      const data = await response.json();
      appendMessage('Agent', data.response);

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
      appendMessage('Agent', `Error: Could not connect to the agent. ${errorMessage}`);
    } finally {
      sendButton.disabled = false;
      promptInput.focus();
    }
  }

  sendButton.addEventListener('click', handleSend);
  promptInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      handleSend();
    }
  });

  appendMessage('Agent', 'Hello! I am an Agentic AI assistant. What can I do for you?');
});

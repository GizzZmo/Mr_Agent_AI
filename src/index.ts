import express from 'express';
import path from 'path';
import { Agent } from './agent';
import { Memory } from './memory';
import { tools } from './tools';

const app = express();
const port = 3000;

// Initialize the Agent
const agentPurpose = "To assist users by providing information, summarizing content, and performing actions via available tools.";
const agentMemory = new Memory();
const myAgent = new Agent("InquisitorBot", agentPurpose, tools, agentMemory);

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

// API Endpoint to interact with the agent
app.post('/api/chat', async (req, res) => {
    const { prompt } = req.body;
    if (!prompt) {
        return res.status(400).json({ error: 'Prompt is required' });
    }

    try {
        const result = await myAgent.process(prompt);
        res.json({ response: result });
    } catch (error) {
        console.error("Error processing agent request:", error);
        res.status(500).json({ error: 'Failed to process request' });
    }
});

// Serve the frontend
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`\n--- Agentic AI Server ---`);
    console.log(`Agent "${myAgent.name}" is ready.`);
    console.log(`Server listening at http://localhost:${port}`);
});

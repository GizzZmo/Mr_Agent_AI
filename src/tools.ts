import { ITool } from './interfaces';

export const tools: ITool[] = [
  {
    name: 'searchWeb',
    description: 'Searches the web for information based on a query.',
    parameters: ['query'], // Corrected to be a string array
    execute: async (query: string): Promise<string> => {
      console.log(`Executing tool: searchWeb with query: "${query}"`);
      // In a real scenario, this would call a search API.
      const mockResults = [
        `Result 1 for "${query}": Information about Agentic AI.`,
        `Result 2 for "${query}": How AI agents work.`,
        `Result 3 for "${query}": Challenges in Agentic AI.`
      ];
      return `Mock search results for "${query}": ${mockResults.join(' ')}`;
    }
  },
  {
    name: 'summarizeText',
    description: 'Summarizes a given piece of text.',
    parameters: ['text'], // Corrected to be a string array
    execute: async (text: string): Promise<string> => {
      console.log(`Executing tool: summarizeText on text: "${text.substring(0, 50)}..."`);
      // In a real scenario, this would call a summarization LLM.
      return `Mock summary of the text: "${text.substring(0, 30)}..." - Key points highlighted.`;
    }
  },
  {
    name: 'sendEmail',
    description: 'Sends an email to a recipient with a given subject and body.',
    parameters: ['recipient', 'subject', 'body'], // Corrected to be a string array
    execute: async (recipient: string, subject: string, body: string): Promise<string> => {
      console.log(`Executing tool: sendEmail to ${recipient} with subject "${subject}"`);
      // In a real scenario, this would integrate with an email sending service.
      return `Mock email sent to ${recipient} with subject "${subject}".`;
    }
  }
];

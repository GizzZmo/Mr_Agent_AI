import { IPerceptionResult, IAction, ITool } from './interfaces';
import { Memory } from './memory';

export class Agent {
  name: string;
  purpose: string;
  tools: ITool[];
  memory: Memory;

  constructor(name: string, purpose: string, tools: ITool[], memory: Memory) {
    this.name = name;
    this.purpose = purpose;
    this.tools = tools;
    this.memory = memory;
    console.log(`Agent '${this.name}' initialized with purpose: '${this.purpose}'.`);
  }

  async perceive(input: string): Promise<IPerceptionResult> {
    console.log(`\n--- Agent '${this.name}' Perception ---`);
    console.log(`Input received: "${input}"`);
    const parsedData = {
      type: 'text_input',
      content: input,
    };
    this.memory.addShortTerm(`Perceived: ${input}`);
    return {
      rawInput: input,
      parsedData: parsedData
    };
  }

  async reasonAndPlan(perception: IPerceptionResult): Promise<IAction | null> {
    console.log(`\n--- Agent '${this.name}' Reasoning & Planning ---`);
    const lowerCaseInput = perception.rawInput.toLowerCase();
    this.memory.retrieve(perception.rawInput);
    let action: IAction | null = null;
    
    if (lowerCaseInput.includes('search for')) {
      const query = lowerCaseInput.split('search for')[1]?.trim();
      if (query) {
        action = { toolName: 'searchWeb', toolArguments: { query } };
        this.memory.addShortTerm(`Planned to search web for: ${query}`);
      }
    } else if (lowerCaseInput.includes('summarize')) {
      const textToSummarize = perception.rawInput.split(/summarize/i)[1]?.trim();
      if (textToSummarize) {
        action = { toolName: 'summarizeText', toolArguments: { text: textToSummarize } };
        this.memory.addShortTerm(`Planned to summarize text.`);
      }
    } else if (lowerCaseInput.includes('send email to')) {
      const content = lowerCaseInput.split('send email to')[1] || '';
      const [recipientPart, subjectPart] = content.split(' about ');
      const [subject, body] = subjectPart ? subjectPart.split(' saying ') : [];

      if (recipientPart?.trim() && subject?.trim() && body?.trim()) {
        const recipient = recipientPart.trim();
        action = {
          toolName: 'sendEmail',
          toolArguments: { recipient, subject: subject.trim(), body: body.trim() }
        };
        this.memory.addShortTerm(`Planned to send email to ${recipient}.`);
      } else {
        console.warn("Could not parse all required arguments for 'send email' command.");
      }
    }

    if (!action) {
        console.log("No specific tool action planned. Will generate direct response.");
        this.memory.addShortTerm(`Planned to respond directly to: ${perception.rawInput}`);
    }
    
    return action;
  }

  async act(action: IAction | null): Promise<string> {
    console.log(`\n--- Agent '${this.name}' Action ---`);
    
    if (!action) {
      const directResponse = "I have received your message. How can I assist you further?";
      console.log(`Direct Response: ${directResponse}`);
      this.memory.addShortTerm(`Responded directly.`);
      return directResponse;
    }

    const tool = this.tools.find(t => t.name === action.toolName);
    if (!tool) {
      const errorMsg = `Error: Tool '${action.toolName}' not found.`;
      console.warn(errorMsg);
      return errorMsg;
    }

    try {
      const orderedArgs = tool.parameters.map(paramName => action.toolArguments[paramName]);

      if (orderedArgs.some(arg => arg === undefined)) {
        const errorMsg = `Error: Missing one or more arguments for tool '${tool.name}'.`;
        console.error(errorMsg, 'Required:', tool.parameters, 'Received:', action.toolArguments);
        return errorMsg;
      }
      
      const result = await tool.execute(...orderedArgs);
      const resultLog = `Executed tool ${tool.name}. Result: ${result}`;
      console.log(resultLog);
      this.memory.addShortTerm(resultLog);
      return result;
    } catch (error) {
      const errorMsg = `Error executing tool ${tool.name}: ${error instanceof Error ? error.message : String(error)}`;
      console.error(errorMsg);
      this.memory.addShortTerm(errorMsg);
      return errorMsg;
    }
  }
  
  async process(input: string): Promise<string> {
      const perception = await this.perceive(input);
      const action = await this.reasonAndPlan(perception);
      const result = await this.act(action);
      return result;
  }
}

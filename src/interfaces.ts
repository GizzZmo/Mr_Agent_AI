export interface IPerceptionResult {
  rawInput: string;
  parsedData: any; // Could be a structured representation of the input
}

export interface IAction {
  toolName: string;
  toolArguments: {
    [key: string]: any;
  };
}

export interface ITool {
  name: string;
  description: string;
  /**
   * An array of parameter names in the exact order they should be passed to the execute function.
   * Example: ['recipient', 'subject', 'body']
   */
  parameters: string[];
  
  /**
   * The function to run, accepting arguments in the order defined by the `parameters` array.
   */
  execute: (...args: any[]) => Promise<any>;
}

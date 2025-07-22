export class Memory {
  private shortTermMemory: string[] = [];
  private longTermMemory: string[] = [];

  constructor() {
    // Initialize with some basic, pre-loaded knowledge
    this.longTermMemory.push("The purpose of this agent is to assist users with information retrieval and task automation.");
  }

  /**
   * Adds a new thought or action to the agent's short-term memory.
   * The memory is capped to a fixed size to only keep recent events.
   */
  addShortTerm(thought: string): void {
    this.shortTermMemory.push(thought);
    // Keep short term memory concise, e.g., last 10 interactions
    if (this.shortTermMemory.length > 10) {
      this.shortTermMemory.shift();
    }
  }

  /**
   * Adds a new piece of knowledge to the agent's long-term memory.
   */
  addLongTerm(knowledge: string): void {
    // In a real system, this would involve embedding and storing in a vector DB
    if (!this.longTermMemory.includes(knowledge)) {
      this.longTermMemory.push(knowledge);
      console.log(`Knowledge added to long-term memory: "${knowledge}"`);
    }
  }

  /**
   * Retrieves memories relevant to a given query using simple, case-insensitive matching.
   */
  retrieve(query: string): { shortTerm: string[], longTerm: string[] } {
    const lowerCaseQuery = query.toLowerCase();

    const relevantShortTerm = this.shortTermMemory.filter(m => 
      m.toLowerCase().includes(lowerCaseQuery)
    );
    const relevantLongTerm = this.longTermMemory.filter(m =>
      m.toLowerCase().includes(lowerCaseQuery)
    );

    console.log(`Memory retrieved for query "${query}".`);
    return {
      shortTerm: relevantShortTerm,
      longTerm: relevantLongTerm
    };
  }
  
  /**
   * Returns a read-only copy of the entire short-term memory history.
   * Useful for providing full context without allowing external modification.
   */
  public getShortTermHistory(): readonly string[] {
    return [...this.shortTermMemory];
  }
}

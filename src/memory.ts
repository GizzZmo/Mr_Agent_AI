export class Memory {
  private shortTermMemory: string[] = [];
  private longTermMemory: string[] = [];

  constructor() {
    this.longTermMemory.push("The purpose of this agent is to assist users with information retrieval and task automation.");
  }

  addShortTerm(thought: string): void {
    this.shortTermMemory.push(thought);
    if (this.shortTermMemory.length > 10) {
      this.shortTermMemory.shift();
    }
  }

  addLongTerm(knowledge: string): void {
    if (!this.longTermMemory.includes(knowledge)) {
      this.longTermMemory.push(knowledge);
      console.log(`Knowledge added to long-term memory: "${knowledge}"`);
    }
  }

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
  
  public getShortTermHistory(): readonly string[] {
    return [...this.shortTermMemory];
  }
}

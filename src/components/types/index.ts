export interface Message {
    id: string;
    text: string;
    sender: 'user' | 'bot' | 'loading';
    timestamp: Date;
    showFeedback?: boolean;
    sqlQuery?: string;
  }
  
  export interface Chat {
    id: string;
    title: string;
    messages: Message[];
    selected?: boolean;
  }
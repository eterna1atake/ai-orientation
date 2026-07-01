// Module 3: AI Learning Assistant Prompt Logs

export type ChatRole = "student" | "ai";

export interface ChatMessage {
  id: string;
  threadId: string;
  role: ChatRole;
  content: string;
  timestamp: string; // ISO datetime
}

export interface ChatThread {
  id: string;
  topic: string;
  lastUpdated: string; // ISO datetime
  messages: ChatMessage[];
}

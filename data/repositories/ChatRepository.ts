import { ChatThread } from "@/domain/entities";
import { mockChatThreads } from "@/data/mocks/mockDataStore";
import { withLatency } from "./delay";

export async function fetchChatThreads(): Promise<ChatThread[]> {
  return withLatency(mockChatThreads, 350);
}

import { KnowledgeGap } from "@/domain/entities";
import { mockKnowledgeGaps } from "@/data/mocks/mockDataStore";
import { withLatency } from "./delay";

export async function fetchKnowledgeGaps(): Promise<KnowledgeGap[]> {
  return withLatency(mockKnowledgeGaps, 350);
}

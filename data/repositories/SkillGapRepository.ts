import { SkillGapItem } from "@/domain/entities";
import { mockSkillGaps } from "@/data/mocks/mockDataStore";
import { withLatency } from "./delay";

export async function fetchSkillGaps(): Promise<SkillGapItem[]> {
  return withLatency(mockSkillGaps, 400);
}

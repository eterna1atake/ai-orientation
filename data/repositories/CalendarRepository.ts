import { StudyBlock } from "@/domain/entities";
import { mockStudyBlocks } from "@/data/mocks/mockDataStore";
import { withLatency } from "./delay";

export async function fetchStudyBlocks(): Promise<StudyBlock[]> {
  return withLatency(mockStudyBlocks, 350);
}

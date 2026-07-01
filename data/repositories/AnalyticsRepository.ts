import { StudyAnalytics } from "@/domain/entities";
import { mockAnalytics } from "@/data/mocks/mockDataStore";
import { withLatency } from "./delay";

export async function fetchStudyAnalytics(): Promise<StudyAnalytics> {
  return withLatency(mockAnalytics, 400);
}

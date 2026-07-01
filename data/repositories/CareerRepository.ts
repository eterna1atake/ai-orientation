import { CareerMilestone } from "@/domain/entities";
import { mockCareerMilestones } from "@/data/mocks/mockDataStore";
import { withLatency } from "./delay";

export async function fetchCareerMilestones(): Promise<CareerMilestone[]> {
  return withLatency(mockCareerMilestones, 400);
}

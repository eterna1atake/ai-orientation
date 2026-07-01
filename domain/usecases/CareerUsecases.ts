import { CareerMilestone } from "../entities";

const STATUS_WEIGHT: Record<CareerMilestone["status"], number> = {
  open_now: 3,
  recommended: 2,
  upcoming: 1,
  completed: 0,
};

export function getUpcomingCareerMilestones(milestones: CareerMilestone[]): CareerMilestone[] {
  return [...milestones]
    .filter((m) => m.status !== "completed")
    .sort((a, b) => STATUS_WEIGHT[b.status] - STATUS_WEIGHT[a.status]);
}

export function getCareerMilestonesByType(
  milestones: CareerMilestone[],
  type: CareerMilestone["type"]
): CareerMilestone[] {
  return milestones.filter((m) => m.type === type);
}

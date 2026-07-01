// Module 7: Academic & Internship Career Timelines

export type CareerMilestoneType = "certification" | "internship" | "academic" | "project" | "networking";
export type CareerMilestoneStatus = "upcoming" | "open_now" | "recommended" | "completed";

export interface CareerMilestone {
  id: string;
  title: string;
  type: CareerMilestoneType;
  status: CareerMilestoneStatus;
  windowLabel: string; // e.g. "August 2026 - October 2026"
  organization: string;
  description: string;
}

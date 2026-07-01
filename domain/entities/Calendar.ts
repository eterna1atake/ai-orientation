// Module 8: Weekly Smart Planner Calendar

export type DayOfWeek = "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";
export type StudyBlockCategory = "class" | "project" | "self_study" | "review" | "career" | "rest";

export interface StudyBlock {
  id: string;
  day: DayOfWeek;
  startTime: string; // "09:00"
  endTime: string; // "10:30"
  title: string;
  category: StudyBlockCategory;
  priorityWeight: number; // higher = scheduled/highlighted first
  completed: boolean;
}

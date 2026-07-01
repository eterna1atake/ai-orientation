// Module 2: Adaptive Learning Roadmap

export type RoadmapPhaseName = "Sophomore" | "Junior" | "Senior";
export type RoadmapTaskStatus = "completed" | "in_progress" | "locked";

export interface RoadmapTask {
  id: string;
  title: string;
  description: string;
  status: RoadmapTaskStatus;
  priorityWeight: number; // higher = more urgent
  estimatedHours: number;
}

export interface RoadmapPhase {
  id: string;
  phase: RoadmapPhaseName;
  title: string;
  timeframe: string;
  isCurrent: boolean;
  tasks: RoadmapTask[];
}

export interface Roadmap {
  id: string;
  studentId: string;
  title: string;
  generatedFromAssessment: boolean;
  overallProgressPercent: number;
  phases: RoadmapPhase[];
}

// Step 6: Workload & Burnout Risk Analysis

export type WorkloadLevel = "Light" | "Moderate" | "Heavy";
export type BurnoutRisk = "low" | "medium" | "high";

export interface WorkloadAnalysis {
  score: number; // 0-100
  level: WorkloadLevel;
  burnoutRisk: BurnoutRisk;
  totalCredits: number;
  weeklyClassHours: number;
  weeklyEffortHours: number;
  hardCourseCount: number; // courses with difficultyScore >= 4
  warnings: string[]; // Thai
  recommendations: string[]; // Thai
}

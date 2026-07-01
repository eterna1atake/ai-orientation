// Module 5: Study Analytics & Progress Logging

export interface WeeklyVelocityPoint {
  weekLabel: string; // e.g. "Week 1"
  tasksCompleted: number;
  hoursStudied: number;
}

export interface StudyAnalytics {
  studentId: string;
  roadmapCompletionPercent: number;
  totalTasksCompleted: number;
  totalTasksRemaining: number;
  currentStreakDays: number;
  averageDailyFocusMinutes: number;
  weeklyVelocity: WeeklyVelocityPoint[];
  subjectBreakdown: { subject: string; hoursStudied: number }[];
}

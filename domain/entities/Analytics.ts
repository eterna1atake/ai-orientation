// Module 5: Study Analytics & Progress Logging

export interface WeeklyVelocityPoint {
  weekLabel: string; // e.g. "Week 1"
  tasksCompleted: number;
  hoursStudied: number;
}

// Step 8: Continuous academic progress tracking
export interface GraduationMilestone {
  id: string;
  title: string;
  targetLabel: string; // e.g. "Semester 2/2026"
  completed: boolean;
}

export interface AcademicRecord {
  currentGPA: number;
  targetGPA: number;
  earnedCredits: number;
  totalCreditsRequired: number;
  graduationMilestones: GraduationMilestone[];
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
  academicRecord: AcademicRecord;
}

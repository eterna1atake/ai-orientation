import { AcademicRecord, StudyAnalytics, StudyActivityDay } from "../entities";

export function getAnalyticsSummary(analytics: StudyAnalytics) {
  const totalTasks = analytics.totalTasksCompleted + analytics.totalTasksRemaining;
  return {
    completionPercent: analytics.roadmapCompletionPercent,
    totalTasks,
    tasksCompleted: analytics.totalTasksCompleted,
    tasksRemaining: analytics.totalTasksRemaining,
    streakDays: analytics.currentStreakDays,
    avgFocusHours: Math.round((analytics.averageDailyFocusMinutes / 60) * 10) / 10,
  };
}

export function getPeakStudySubject(analytics: StudyAnalytics) {
  return [...analytics.subjectBreakdown].sort((a, b) => b.hoursStudied - a.hoursStudied)[0];
}

// Step 8: GPA / credits / graduation milestone progress
export function getAcademicProgress(record: AcademicRecord) {
  const milestonesCompleted = record.graduationMilestones.filter((m) => m.completed).length;
  return {
    gpaPercent: Math.min(100, Math.round((record.currentGPA / record.targetGPA) * 100)),
    creditPercent: Math.min(100, Math.round((record.earnedCredits / record.totalCreditsRequired) * 100)),
    creditsRemaining: Math.max(0, record.totalCreditsRequired - record.earnedCredits),
    milestonesCompleted,
    milestonesTotal: record.graduationMilestones.length,
  };
}

export function getVelocityTrend(analytics: StudyAnalytics): "up" | "down" | "flat" {
  const points = analytics.weeklyVelocity;
  if (points.length < 2) return "flat";
  const last = points.at(-1)!.tasksCompleted;
  const prev = points.at(-2)!.tasksCompleted;
  if (last > prev) return "up";
  if (last < prev) return "down";
  return "flat";
}

// Student Profile activity heatmap: bucket daily hours into an intensity scale
// and lay days out into calendar-aligned weeks (rows = Sun..Sat, columns = weeks).
export type ActivityIntensity = 0 | 1 | 2 | 3 | 4;

export interface ActivityDayCell extends StudyActivityDay {
  intensity: ActivityIntensity;
}

function getActivityIntensity(hours: number): ActivityIntensity {
  if (hours <= 0) return 0;
  if (hours < 1.5) return 1;
  if (hours < 2.5) return 2;
  if (hours < 3.5) return 3;
  return 4;
}

export function getActivityHeatmapWeeks(activityLog: StudyActivityDay[]): (ActivityDayCell | null)[][] {
  if (activityLog.length === 0) return [];

  const cells: ActivityDayCell[] = activityLog.map((day) => ({ ...day, intensity: getActivityIntensity(day.hours) }));
  const leadingBlanks = new Date(cells[0].date).getDay(); // align first cell to its Sun(0)..Sat(6) row
  const padded: (ActivityDayCell | null)[] = [...Array(leadingBlanks).fill(null), ...cells];

  const weeks: (ActivityDayCell | null)[][] = [];
  for (let i = 0; i < padded.length; i += 7) {
    weeks.push(padded.slice(i, i + 7));
  }
  return weeks;
}

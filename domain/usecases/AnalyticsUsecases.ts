import { StudyAnalytics } from "../entities";

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

export function getVelocityTrend(analytics: StudyAnalytics): "up" | "down" | "flat" {
  const points = analytics.weeklyVelocity;
  if (points.length < 2) return "flat";
  const last = points.at(-1)!.tasksCompleted;
  const prev = points.at(-2)!.tasksCompleted;
  if (last > prev) return "up";
  if (last < prev) return "down";
  return "flat";
}

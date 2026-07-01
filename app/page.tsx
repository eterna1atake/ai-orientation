"use client";

import { useDashboard } from "@/presentation/hooks/useDashboard";
import { useNotifications } from "@/presentation/hooks/useNotifications";
import { AssessmentBanner } from "@/presentation/components/dashboard/AssessmentBanner";
import { RoadmapProgressWidget } from "@/presentation/components/dashboard/RoadmapProgressWidget";
import { TodayPlannerWidget } from "@/presentation/components/dashboard/TodayPlannerWidget";
import { AnalyticsSnapshotWidget } from "@/presentation/components/dashboard/AnalyticsSnapshotWidget";
import { NotificationsFeedWidget } from "@/presentation/components/dashboard/NotificationsFeedWidget";

export default function DashboardPage() {
  const { student, roadmap, analytics, todaysBlocks, today, isLoading, toggleBlockCompletion } = useDashboard();
  const { notifications, dismissNotification } = useNotifications();

  if (isLoading || !student || !roadmap || !analytics) {
    return (
      <div className="flex h-96 items-center justify-center text-sm text-slate-400">
        Loading Dashboard data...
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
        <p className="mt-1 text-sm text-slate-500">An overview of Boss&apos;s study progress and goals for today</p>
      </div>

      <AssessmentBanner student={student} />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <RoadmapProgressWidget roadmap={roadmap} />
        <TodayPlannerWidget blocks={todaysBlocks} today={today} onToggleBlock={toggleBlockCompletion} />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <AnalyticsSnapshotWidget analytics={analytics} />
        <NotificationsFeedWidget notifications={notifications} onDismiss={dismissNotification} />
      </div>
    </div>
  );
}

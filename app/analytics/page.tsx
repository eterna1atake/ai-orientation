"use client";

import { useAnalytics } from "@/presentation/hooks/useAnalytics";
import { AnalyticsCharts } from "@/presentation/components/analytics/AnalyticsCharts";
import { KnowledgeGapHistoryList } from "@/presentation/components/analytics/KnowledgeGapHistoryList";
import { StatCard } from "@/presentation/components/ui/StatCard";
import { ListChecks, Flame, Clock, Target } from "lucide-react";

export default function AnalyticsPage() {
  const { analytics, summary, velocityTrend, knowledgeGapHistory, isLoading } = useAnalytics();

  if (isLoading || !analytics || !summary) {
    return (
      <div className="flex h-96 items-center justify-center text-sm text-slate-400">
        Loading Analytics data...
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Study Analytics</h1>
        <p className="mt-1 text-sm text-slate-500">A detailed look at Boss&apos;s study progress and knowledge gap history</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Roadmap Completion" value={`${summary.completionPercent}%`} icon={Target} accentClassName="bg-indigo-50 text-indigo-600" />
        <StatCard label="Tasks Completed" value={`${summary.tasksCompleted}/${summary.totalTasks}`} icon={ListChecks} accentClassName="bg-blue-50 text-blue-600" />
        <StatCard label="Current Streak" value={`${summary.streakDays} days`} icon={Flame} accentClassName="bg-amber-50 text-amber-600" />
        <StatCard label="Avg Focus / Day" value={`${summary.avgFocusHours}h`} icon={Clock} accentClassName="bg-emerald-50 text-emerald-600" />
      </div>

      <AnalyticsCharts analytics={analytics} velocityTrend={velocityTrend} />

      <KnowledgeGapHistoryList history={knowledgeGapHistory} />
    </div>
  );
}

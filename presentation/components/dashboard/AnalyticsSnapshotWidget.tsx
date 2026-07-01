import Link from "next/link";
import { ArrowUpRight, Flame, Clock, ListChecks } from "lucide-react";
import { StudyAnalytics } from "@/domain/entities";
import { Card } from "@/presentation/components/ui/Card";
import { SectionHeader } from "@/presentation/components/ui/SectionHeader";

export function AnalyticsSnapshotWidget({ analytics }: { analytics: StudyAnalytics }) {
  const maxHours = Math.max(...analytics.weeklyVelocity.map((w) => w.hoursStudied));

  return (
    <Card>
      <SectionHeader
        title="Study Analytics"
        description="Task velocity over the last 6 weeks"
        action={
          <Link href="/analytics" className="inline-flex items-center gap-1 text-sm font-medium text-indigo-600 hover:text-indigo-700">
            Full Analytics <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        }
      />

      <div className="mb-5 grid grid-cols-3 gap-3">
        <div className="rounded-xl bg-slate-50 p-3 text-center">
          <ListChecks className="mx-auto mb-1 h-4 w-4 text-indigo-500" />
          <p className="text-lg font-semibold text-slate-900">{analytics.totalTasksCompleted}</p>
          <p className="text-[11px] text-slate-400">Tasks Done</p>
        </div>
        <div className="rounded-xl bg-slate-50 p-3 text-center">
          <Flame className="mx-auto mb-1 h-4 w-4 text-amber-500" />
          <p className="text-lg font-semibold text-slate-900">{analytics.currentStreakDays}</p>
          <p className="text-[11px] text-slate-400">Day Streak</p>
        </div>
        <div className="rounded-xl bg-slate-50 p-3 text-center">
          <Clock className="mx-auto mb-1 h-4 w-4 text-blue-500" />
          <p className="text-lg font-semibold text-slate-900">{analytics.averageDailyFocusMinutes}m</p>
          <p className="text-[11px] text-slate-400">Avg Focus/Day</p>
        </div>
      </div>

      <div className="flex items-end gap-2">
        {analytics.weeklyVelocity.map((week) => (
          <div key={week.weekLabel} className="flex flex-1 flex-col items-center gap-1.5">
            <div className="flex h-24 w-full items-end rounded-md bg-slate-50">
              <div
                className="w-full rounded-md bg-indigo-500"
                style={{ height: `${(week.hoursStudied / maxHours) * 100}%` }}
              />
            </div>
            <span className="text-[10px] text-slate-400">{week.weekLabel.replace("Week ", "W")}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}

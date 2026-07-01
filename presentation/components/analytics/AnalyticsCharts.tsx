import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { StudyAnalytics } from "@/domain/entities";
import { Card } from "@/presentation/components/ui/Card";
import { SectionHeader } from "@/presentation/components/ui/SectionHeader";
import { ProgressBar } from "@/presentation/components/ui/ProgressBar";

const TREND_ICON = { up: TrendingUp, down: TrendingDown, flat: Minus };
const TREND_LABEL = { up: "Trending up", down: "Trending down", flat: "Flat" };
const TREND_COLOR = { up: "text-emerald-600", down: "text-rose-600", flat: "text-slate-500" };

interface AnalyticsChartsProps {
  analytics: StudyAnalytics;
  velocityTrend: "up" | "down" | "flat";
}

export function AnalyticsCharts({ analytics, velocityTrend }: AnalyticsChartsProps) {
  const maxHours = Math.max(...analytics.weeklyVelocity.map((w) => w.hoursStudied));
  const maxSubjectHours = Math.max(...analytics.subjectBreakdown.map((s) => s.hoursStudied));
  const TrendIcon = TREND_ICON[velocityTrend];

  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
      <Card>
        <SectionHeader
          title="Task Velocity"
          description="Number of tasks completed per week"
          action={
            <span className={`inline-flex items-center gap-1 text-sm font-medium ${TREND_COLOR[velocityTrend]}`}>
              <TrendIcon className="h-4 w-4" /> {TREND_LABEL[velocityTrend]}
            </span>
          }
        />
        <div className="flex items-end gap-3">
          {analytics.weeklyVelocity.map((week) => (
            <div key={week.weekLabel} className="flex flex-1 flex-col items-center gap-2">
              <div className="flex h-32 w-full items-end rounded-md bg-slate-50">
                <div
                  className="w-full rounded-md bg-indigo-500"
                  style={{ height: `${(week.hoursStudied / maxHours) * 100}%` }}
                  title={`${week.tasksCompleted} tasks, ${week.hoursStudied}h`}
                />
              </div>
              <span className="text-[11px] font-medium text-slate-500">{week.tasksCompleted} tasks</span>
              <span className="text-[10px] text-slate-400">{week.weekLabel}</span>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <SectionHeader title="Subject Breakdown" description="Study hours per category" />
        <div className="space-y-3.5">
          {analytics.subjectBreakdown.map((subject) => (
            <div key={subject.subject}>
              <div className="mb-1 flex items-center justify-between text-sm">
                <span className="text-slate-700">{subject.subject}</span>
                <span className="font-medium text-slate-500">{subject.hoursStudied}h</span>
              </div>
              <ProgressBar percent={(subject.hoursStudied / maxSubjectHours) * 100} colorClassName="bg-blue-500" />
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

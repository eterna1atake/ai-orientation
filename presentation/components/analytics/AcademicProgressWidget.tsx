import { CheckCircle2, Circle } from "lucide-react";
import { AcademicRecord } from "@/domain/entities";
import { getAcademicProgress } from "@/domain/usecases";
import { Card } from "@/presentation/components/ui/Card";
import { SectionHeader } from "@/presentation/components/ui/SectionHeader";

// Ring geometry: radius 34 in a 84x84 viewBox
const RING_CIRCUMFERENCE = 2 * Math.PI * 34;

function ProgressRing({
  percent,
  value,
  caption,
  strokeClassName,
}: {
  percent: number;
  value: string;
  caption: string;
  strokeClassName: string;
}) {
  const clamped = Math.min(100, Math.max(0, percent));
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative h-24 w-24">
        <svg viewBox="0 0 84 84" className="h-full w-full -rotate-90">
          <circle cx="42" cy="42" r="34" fill="none" strokeWidth="8" className="stroke-slate-100" />
          <circle
            cx="42"
            cy="42"
            r="34"
            fill="none"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={`${(clamped / 100) * RING_CIRCUMFERENCE} ${RING_CIRCUMFERENCE}`}
            className={`${strokeClassName} transition-all duration-700`}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-base font-semibold text-slate-900">{value}</span>
        </div>
      </div>
      <p className="text-center text-xs text-slate-500">{caption}</p>
    </div>
  );
}

export function AcademicProgressWidget({ record }: { record: AcademicRecord }) {
  const progress = getAcademicProgress(record);

  return (
    <Card>
      <SectionHeader
        title="Academic Progress"
        description="GPA, credits, and graduation milestones"
      />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-[auto_1fr] sm:items-start">
        <div className="flex justify-center gap-8 sm:justify-start">
          <ProgressRing
            percent={progress.gpaPercent}
            value={record.currentGPA.toFixed(2)}
            caption={`Current GPA vs target ${record.targetGPA.toFixed(2)}`}
            strokeClassName="stroke-indigo-500"
          />
          <ProgressRing
            percent={progress.creditPercent}
            value={`${record.earnedCredits}`}
            caption={`Earned of ${record.totalCreditsRequired} required credits`}
            strokeClassName="stroke-blue-500"
          />
        </div>

        <div>
          <p className="mb-2 text-xs font-medium uppercase tracking-wide text-slate-400">
            Graduation Milestones ({progress.milestonesCompleted}/{progress.milestonesTotal})
          </p>
          <ul className="space-y-2">
            {record.graduationMilestones.map((milestone) => (
              <li key={milestone.id} className="flex items-start gap-2.5 text-sm">
                {milestone.completed ? (
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                ) : (
                  <Circle className="mt-0.5 h-4 w-4 shrink-0 text-slate-300" />
                )}
                <span className={milestone.completed ? "text-slate-400 line-through" : "text-slate-700"}>
                  {milestone.title}
                </span>
                <span className="ml-auto shrink-0 text-xs text-slate-400">{milestone.targetLabel}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Card>
  );
}

import { Feather, Activity, Flame, AlertTriangle, Lightbulb, LucideIcon } from "lucide-react";
import { WorkloadAnalysis, WorkloadLevel, BurnoutRisk } from "@/domain/entities";
import { Card } from "@/presentation/components/ui/Card";
import { SectionHeader } from "@/presentation/components/ui/SectionHeader";
import { Badge, BadgeTone } from "@/presentation/components/ui/Badge";

const LEVEL_META: Record<WorkloadLevel, { icon: LucideIcon; stroke: string; text: string; badge: BadgeTone }> = {
  Light: { icon: Feather, stroke: "stroke-emerald-500", text: "text-emerald-600", badge: "green" },
  Moderate: { icon: Activity, stroke: "stroke-amber-500", text: "text-amber-600", badge: "amber" },
  Heavy: { icon: Flame, stroke: "stroke-rose-500", text: "text-rose-600", badge: "red" },
};

const RISK_LABEL: Record<BurnoutRisk, string> = {
  low: "Low Burnout Risk",
  medium: "Medium Burnout Risk",
  high: "High Burnout Risk",
};

const RISK_TONE: Record<BurnoutRisk, BadgeTone> = { low: "green", medium: "amber", high: "red" };

// Semicircle geometry: radius 84 centered at (100, 100)
const ARC_LENGTH = Math.PI * 84;

function WorkloadGauge({ workload }: { workload: WorkloadAnalysis }) {
  const meta = LEVEL_META[workload.level];
  const LevelIcon = meta.icon;
  const filled = (workload.score / 100) * ARC_LENGTH;

  return (
    <div className="relative mx-auto w-full max-w-[260px]">
      <svg viewBox="0 0 200 112" className="w-full">
        <path
          d="M 16 100 A 84 84 0 0 1 184 100"
          fill="none"
          strokeWidth="12"
          strokeLinecap="round"
          className="stroke-slate-100"
        />
        <path
          d="M 16 100 A 84 84 0 0 1 184 100"
          fill="none"
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={`${filled} ${ARC_LENGTH}`}
          className={`${meta.stroke} transition-all duration-700`}
        />
      </svg>
      <div className="absolute inset-x-0 bottom-0 flex flex-col items-center">
        <p className="text-4xl font-semibold text-slate-900">{workload.score}</p>
        <p className={`mt-0.5 inline-flex items-center gap-1 text-sm font-medium ${meta.text}`}>
          <LevelIcon className="h-4 w-4" /> {workload.level}
        </p>
      </div>
      <div className="mt-1 flex justify-between px-1 text-[10px] text-slate-400">
        <span>0 · Light</span>
        <span>Moderate</span>
        <span>Heavy · 100</span>
      </div>
    </div>
  );
}

export function WorkloadMeterWidget({ workload }: { workload: WorkloadAnalysis }) {
  return (
    <Card>
      <SectionHeader
        title="Workload Analysis"
        description="AI estimate for this schedule"
        action={<Badge tone={RISK_TONE[workload.burnoutRisk]}>{RISK_LABEL[workload.burnoutRisk]}</Badge>}
      />

      <WorkloadGauge workload={workload} />

      <dl className="mt-5 grid grid-cols-3 gap-2 text-center">
        <div className="rounded-xl bg-slate-50 px-2 py-2.5">
          <dt className="text-[11px] text-slate-400">Credits</dt>
          <dd className="mt-0.5 text-lg font-semibold text-slate-900">{workload.totalCredits}</dd>
        </div>
        <div className="rounded-xl bg-slate-50 px-2 py-2.5">
          <dt className="text-[11px] text-slate-400">Class hrs/wk</dt>
          <dd className="mt-0.5 text-lg font-semibold text-slate-900">{workload.weeklyClassHours}</dd>
        </div>
        <div className="rounded-xl bg-slate-50 px-2 py-2.5">
          <dt className="text-[11px] text-slate-400">Self-study hrs</dt>
          <dd className="mt-0.5 text-lg font-semibold text-slate-900">{workload.weeklyEffortHours}</dd>
        </div>
      </dl>

      {workload.warnings.length > 0 && (
        <div className="mt-4 space-y-2">
          {workload.warnings.map((warning) => (
            <p key={warning} className="flex items-start gap-2 text-sm text-amber-700">
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
              {warning}
            </p>
          ))}
        </div>
      )}

      <div className="mt-4 space-y-2 border-t border-slate-100 pt-4">
        {workload.recommendations.map((recommendation) => (
          <p key={recommendation} className="flex items-start gap-2 text-sm text-slate-600">
            <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-indigo-400" />
            {recommendation}
          </p>
        ))}
      </div>
    </Card>
  );
}

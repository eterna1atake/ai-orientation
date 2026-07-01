import Link from "next/link";
import { ArrowUpRight, CheckCircle2, Circle, Lock } from "lucide-react";
import { Roadmap } from "@/domain/entities";
import { Card } from "@/presentation/components/ui/Card";
import { ProgressBar } from "@/presentation/components/ui/ProgressBar";
import { SectionHeader } from "@/presentation/components/ui/SectionHeader";

const STATUS_ICON = {
  completed: CheckCircle2,
  in_progress: Circle,
  locked: Lock,
};

export function RoadmapProgressWidget({ roadmap }: { roadmap: Roadmap }) {
  const currentPhase = roadmap.phases.find((p) => p.isCurrent) ?? roadmap.phases[0];

  return (
    <Card>
      <SectionHeader
        title="Roadmap Progress"
        description={`${currentPhase.title} · ${currentPhase.timeframe}`}
        action={
          <Link href="/roadmap" className="inline-flex items-center gap-1 text-sm font-medium text-indigo-600 hover:text-indigo-700">
            View Roadmap <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        }
      />

      <div className="mb-4 flex items-center gap-4">
        <p className="text-3xl font-bold text-slate-900">{roadmap.overallProgressPercent}%</p>
        <div className="flex-1">
          <ProgressBar percent={roadmap.overallProgressPercent} />
        </div>
      </div>

      <ul className="space-y-2">
        {currentPhase.tasks.slice(0, 4).map((task) => {
          const Icon = STATUS_ICON[task.status];
          return (
            <li key={task.id} className="flex items-center gap-2.5 text-sm">
              <Icon
                className={`h-4 w-4 shrink-0 ${
                  task.status === "completed"
                    ? "text-emerald-500"
                    : task.status === "in_progress"
                    ? "text-indigo-500"
                    : "text-slate-300"
                }`}
              />
              <span className={task.status === "locked" ? "text-slate-400" : "text-slate-700"}>{task.title}</span>
            </li>
          );
        })}
      </ul>
    </Card>
  );
}

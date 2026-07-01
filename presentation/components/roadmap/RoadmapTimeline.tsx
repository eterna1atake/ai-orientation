import { CheckCircle2, Circle, Lock, Clock } from "lucide-react";
import { Roadmap, RoadmapTask } from "@/domain/entities";
import { Card } from "@/presentation/components/ui/Card";
import { Badge } from "@/presentation/components/ui/Badge";
import { ProgressBar } from "@/presentation/components/ui/ProgressBar";
import { calculatePhaseProgress } from "@/domain/usecases";

interface RoadmapTimelineProps {
  roadmap: Roadmap;
  onToggleTask: (taskId: string) => void;
}

function TaskRow({ task, onToggleTask }: { task: RoadmapTask; onToggleTask: (id: string) => void }) {
  const Icon = task.status === "completed" ? CheckCircle2 : task.status === "locked" ? Lock : Circle;

  return (
    <button
      onClick={() => onToggleTask(task.id)}
      disabled={task.status === "locked"}
      className={`flex w-full items-start gap-3 rounded-xl border px-3 py-3 text-left transition-colors ${
        task.status === "locked"
          ? "cursor-not-allowed border-slate-100 bg-slate-50"
          : "border-slate-100 hover:border-indigo-200 hover:bg-indigo-50/40"
      }`}
    >
      <Icon
        className={`mt-0.5 h-5 w-5 shrink-0 ${
          task.status === "completed" ? "text-emerald-500" : task.status === "in_progress" ? "text-indigo-500" : "text-slate-300"
        }`}
      />
      <div className="min-w-0 flex-1">
        <p className={`text-sm font-medium ${task.status === "locked" ? "text-slate-400" : "text-slate-800"}`}>{task.title}</p>
        <p className="mt-0.5 text-xs text-slate-400">{task.description}</p>
        <div className="mt-1.5 flex items-center gap-1.5 text-[11px] text-slate-400">
          <Clock className="h-3 w-3" /> {task.estimatedHours}h
        </div>
      </div>
    </button>
  );
}

export function RoadmapTimeline({ roadmap, onToggleTask }: RoadmapTimelineProps) {
  return (
    <div className="space-y-6">
      {roadmap.phases.map((phase, index) => {
        const progress = calculatePhaseProgress(phase);
        return (
          <div key={phase.id} className="relative flex gap-4">
            <div className="flex flex-col items-center">
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${
                  phase.isCurrent ? "bg-indigo-600 text-white" : progress === 100 ? "bg-emerald-500 text-white" : "bg-slate-200 text-slate-500"
                }`}
              >
                {index + 1}
              </div>
              {index < roadmap.phases.length - 1 && <div className="mt-1 w-px flex-1 bg-slate-200" />}
            </div>

            <Card className={`mb-2 flex-1 ${phase.isCurrent ? "border-indigo-200 ring-1 ring-indigo-100" : ""}`}>
              <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-semibold text-slate-900">{phase.title}</h3>
                    {phase.isCurrent && <Badge tone="indigo">Current Phase</Badge>}
                  </div>
                  <p className="text-xs text-slate-400">
                    {phase.phase} · {phase.timeframe}
                  </p>
                </div>
                <p className="text-sm font-semibold text-slate-700">{progress}%</p>
              </div>

              <div className="mb-4">
                <ProgressBar percent={progress} />
              </div>

              <div className="space-y-2">
                {phase.tasks.map((task) => (
                  <TaskRow key={task.id} task={task} onToggleTask={onToggleTask} />
                ))}
              </div>
            </Card>
          </div>
        );
      })}
    </div>
  );
}

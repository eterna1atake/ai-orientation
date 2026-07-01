import Link from "next/link";
import { ArrowUpRight, CheckCircle2, Circle } from "lucide-react";
import { StudyBlock, DayOfWeek } from "@/domain/entities";
import { Card } from "@/presentation/components/ui/Card";
import { SectionHeader } from "@/presentation/components/ui/SectionHeader";

const CATEGORY_DOT: Record<StudyBlock["category"], string> = {
  class: "bg-blue-400",
  project: "bg-indigo-500",
  self_study: "bg-violet-400",
  review: "bg-amber-400",
  career: "bg-emerald-400",
  rest: "bg-slate-300",
};

interface TodayPlannerWidgetProps {
  blocks: StudyBlock[];
  today: DayOfWeek;
  onToggleBlock: (blockId: string) => void;
}

export function TodayPlannerWidget({ blocks, today, onToggleBlock }: TodayPlannerWidgetProps) {
  return (
    <Card>
      <SectionHeader
        title="Today's Study Blocks"
        description={today}
        action={
          <Link href="/planner" className="inline-flex items-center gap-1 text-sm font-medium text-indigo-600 hover:text-indigo-700">
            Full Planner <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        }
      />

      {blocks.length === 0 ? (
        <p className="py-6 text-center text-sm text-slate-400">No study blocks scheduled for today — enjoy the break 🎉</p>
      ) : (
        <ul className="space-y-2.5">
          {blocks.map((block) => (
            <li key={block.id} className="flex items-center gap-3 rounded-xl border border-slate-100 px-3 py-2.5">
              <span className={`h-2 w-2 shrink-0 rounded-full ${CATEGORY_DOT[block.category]}`} />
              <div className="min-w-0 flex-1">
                <p className={`truncate text-sm font-medium ${block.completed ? "text-slate-400 line-through" : "text-slate-800"}`}>
                  {block.title}
                </p>
                <p className="text-xs text-slate-400">
                  {block.startTime} - {block.endTime}
                </p>
              </div>
              <button onClick={() => onToggleBlock(block.id)} className="shrink-0 text-slate-400 hover:text-indigo-600" aria-label="Toggle complete">
                {block.completed ? <CheckCircle2 className="h-5 w-5 text-emerald-500" /> : <Circle className="h-5 w-5" />}
              </button>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}

import { CheckCircle2, Circle } from "lucide-react";
import { DayOfWeek, StudyBlock } from "@/domain/entities";
import { Card } from "@/presentation/components/ui/Card";

const DAYS: DayOfWeek[] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const CATEGORY_STYLE: Record<StudyBlock["category"], string> = {
  class: "border-blue-200 bg-blue-50 text-blue-700",
  project: "border-indigo-200 bg-indigo-50 text-indigo-700",
  self_study: "border-violet-200 bg-violet-50 text-violet-700",
  review: "border-amber-200 bg-amber-50 text-amber-700",
  career: "border-emerald-200 bg-emerald-50 text-emerald-700",
  rest: "border-slate-200 bg-slate-50 text-slate-500",
};

interface WeeklyCalendarProps {
  blocksByDay: Record<DayOfWeek, StudyBlock[]>;
  onToggleBlock: (blockId: string) => void;
}

export function WeeklyCalendar({ blocksByDay, onToggleBlock }: WeeklyCalendarProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-7">
      {DAYS.map((day) => (
        <Card key={day} className="flex flex-col gap-2.5">
          <p className="text-sm font-semibold text-slate-900">{day}</p>
          {blocksByDay[day].length === 0 ? (
            <p className="text-xs text-slate-400">No study blocks</p>
          ) : (
            blocksByDay[day].map((block) => (
              <button
                key={block.id}
                onClick={() => onToggleBlock(block.id)}
                className={`flex items-start gap-2 rounded-lg border px-2.5 py-2 text-left ${CATEGORY_STYLE[block.category]} ${
                  block.completed ? "opacity-50" : ""
                }`}
              >
                {block.completed ? (
                  <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                ) : (
                  <Circle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                )}
                <div className="min-w-0">
                  <p className={`text-xs font-medium ${block.completed ? "line-through" : ""}`}>{block.title}</p>
                  <p className="text-[10px] opacity-75">
                    {block.startTime} - {block.endTime}
                  </p>
                </div>
              </button>
            ))
          )}
        </Card>
      ))}
    </div>
  );
}

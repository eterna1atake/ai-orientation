import { ActivityDayCell, ActivityIntensity } from "@/domain/usecases";
import { Card } from "@/presentation/components/ui/Card";
import { SectionHeader } from "@/presentation/components/ui/SectionHeader";

const INTENSITY_CLASSES: Record<ActivityIntensity, string> = {
  0: "bg-slate-100",
  1: "bg-indigo-100",
  2: "bg-indigo-300",
  3: "bg-indigo-500",
  4: "bg-indigo-700",
};

const DAY_ROW_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

interface ActivityHeatmapProps {
  weeks: (ActivityDayCell | null)[][];
}

export function ActivityHeatmap({ weeks }: ActivityHeatmapProps) {
  if (weeks.length === 0) return null;

  return (
    <Card>
      <SectionHeader title="Study Activity" description="Daily study hours over the last 10 weeks" />

      <div className="flex gap-3 overflow-x-auto pb-2">
        <div className="flex shrink-0 flex-col gap-[3px] pt-[19px] text-[10px] text-slate-400">
          {DAY_ROW_LABELS.map((label, i) => (
            <div key={label} className="flex h-[13px] w-6 items-center">
              {i % 2 === 1 ? label : ""}
            </div>
          ))}
        </div>

        <div className="flex gap-[3px]">
          {weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="flex flex-col gap-[3px]">
              {week.map((day, dayIndex) => (
                <div
                  key={dayIndex}
                  title={day ? `${day.date}: ${day.hours}h studied` : undefined}
                  className={`h-[13px] w-[13px] rounded-[3px] ${day ? INTENSITY_CLASSES[day.intensity] : "bg-transparent"}`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-3 flex items-center justify-end gap-1.5 text-[10px] text-slate-400">
        Less
        {([0, 1, 2, 3, 4] as ActivityIntensity[]).map((level) => (
          <span key={level} className={`h-[10px] w-[10px] rounded-[2px] ${INTENSITY_CLASSES[level]}`} />
        ))}
        More
      </div>
    </Card>
  );
}

import { ShieldCheck, Lock, LockOpen, AlertTriangle, MapPin, RefreshCw } from "lucide-react";
import { OptimizedSchedule, ScheduledClass } from "@/domain/entities";
import { Card } from "@/presentation/components/ui/Card";
import { SectionHeader } from "@/presentation/components/ui/SectionHeader";
import { Badge } from "@/presentation/components/ui/Badge";

interface OptimizedScheduleViewProps {
  schedule: OptimizedSchedule;
  scheduleByDay: { day: string; classes: ScheduledClass[] }[];
  isLocked: boolean;
  isLocking: boolean;
  onFinalize: () => void;
  onUnlock: () => void;
  onRegenerate: () => void;
}

export function OptimizedScheduleView({
  schedule,
  scheduleByDay,
  isLocked,
  isLocking,
  onFinalize,
  onUnlock,
  onRegenerate,
}: OptimizedScheduleViewProps) {
  return (
    <Card>
      <SectionHeader
        title="Optimized Schedule"
        description={`Semester 1/2026 · ${schedule.totalCredits} credits scheduled`}
        action={
          <Badge tone="green">
            <ShieldCheck className="h-3.5 w-3.5" /> {schedule.conflictCount} Time Conflicts
          </Badge>
        }
      />

      {isLocked && (
        <div className="mb-4 flex items-start gap-2.5 rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-800 ring-1 ring-inset ring-emerald-200">
          <Lock className="mt-0.5 h-4 w-4 shrink-0" />
          <div>
            <p className="font-medium">Schedule Locked</p>
            <p className="mt-0.5 text-emerald-700">
              This schedule has been confirmed. The system will sync it with your Weekly Planner for Semester 1/2026.
            </p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-5">
        {scheduleByDay.map(({ day, classes }) => (
          <div key={day} className="rounded-xl bg-slate-50 p-3">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">{day}</p>
            <div className="space-y-2">
              {classes.map((cls) => (
                <div
                  key={`${cls.courseId}-${cls.slot.day}-${cls.slot.startTime}`}
                  className="rounded-lg border border-indigo-100 bg-white p-2.5"
                >
                  <p className="text-[11px] font-medium text-indigo-600">
                    {cls.slot.startTime} - {cls.slot.endTime}
                  </p>
                  <p className="mt-0.5 text-sm font-medium leading-snug text-slate-800">{cls.courseName}</p>
                  <p className="mt-1 text-[11px] text-slate-400">
                    {cls.courseCode} · {cls.sectionLabel}
                  </p>
                  <p className="mt-0.5 inline-flex items-center gap-1 text-[11px] text-slate-400">
                    <MapPin className="h-3 w-3" /> {cls.slot.room}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {schedule.skippedCourses.length > 0 && (
        <div className="mt-4 space-y-2">
          {schedule.skippedCourses.map((skipped) => (
            <div
              key={skipped.courseCode}
              className="flex items-start gap-2.5 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-800 ring-1 ring-inset ring-amber-200"
            >
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
              <div>
                <p className="font-medium">
                  Could not schedule: {skipped.courseName} ({skipped.courseCode})
                </p>
                <p className="mt-0.5 text-amber-700">{skipped.reason}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-5 flex flex-wrap gap-3">
        {isLocked ? (
          <button
            onClick={onUnlock}
            className="inline-flex items-center gap-2 rounded-xl bg-slate-100 px-4 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-200"
          >
            <LockOpen className="h-4 w-4" /> Unlock & Rebuild
          </button>
        ) : (
          <>
            <button
              onClick={onFinalize}
              disabled={isLocking}
              className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-indigo-700 disabled:opacity-60"
            >
              <Lock className="h-4 w-4" /> {isLocking ? "Locking..." : "Finalize & Lock Schedule"}
            </button>
            <button
              onClick={onRegenerate}
              className="inline-flex items-center gap-2 rounded-xl bg-slate-100 px-4 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-200"
            >
              <RefreshCw className="h-4 w-4" /> Regenerate
            </button>
          </>
        )}
      </div>
    </Card>
  );
}

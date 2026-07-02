"use client";

import Link from "next/link";
import { CalendarRange, Wand2, BookOpen } from "lucide-react";
import { useScheduleBuilder } from "@/presentation/hooks/useScheduleBuilder";
import { OptimizedScheduleView } from "@/presentation/components/schedule/OptimizedScheduleView";
import { WorkloadMeterWidget } from "@/presentation/components/schedule/WorkloadMeterWidget";
import { Card } from "@/presentation/components/ui/Card";

export default function ScheduleBuilderPage() {
  const {
    selectedCourses,
    schedule,
    scheduleByDay,
    workload,
    isLoading,
    isGenerating,
    isLocking,
    isLocked,
    generateSchedule,
    finalizeSchedule,
    unlockSchedule,
  } = useScheduleBuilder();

  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center text-sm text-slate-400">
        Loading Schedule Builder...
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Schedule Builder</h1>
        <p className="mt-1 text-sm text-slate-500">
          Let the AI build a conflict-free class schedule and assess workload before you confirm enrollment
        </p>
      </div>

      {selectedCourses.length === 0 && !schedule ? (
        <Card className="mx-auto max-w-xl">
          <div className="flex flex-col items-center py-8 text-center">
            <CalendarRange className="h-10 w-10 text-slate-300" />
            <h2 className="mt-3 text-base font-semibold text-slate-900">No courses selected yet</h2>
            <p className="mt-1 max-w-sm text-sm text-slate-500">
              Your cart is empty — pick AI-recommended courses first, then come back here to build your schedule
            </p>
            <Link
              href="/course-selection"
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-indigo-700"
            >
              <BookOpen className="h-4 w-4" /> Browse Recommended Courses
            </Link>
          </div>
        </Card>
      ) : !schedule ? (
        <Card className="mx-auto max-w-xl">
          <div className="flex flex-col items-center py-8 text-center">
            {isGenerating ? (
              <>
                <div className="h-10 w-10 animate-spin rounded-full border-[3px] border-indigo-100 border-t-indigo-600" />
                <p className="mt-4 text-sm font-medium text-slate-700">AI is building your best schedule...</p>
                <p className="mt-1 text-xs text-slate-400">Checking for time conflicts and picking the highest-rated sections</p>
              </>
            ) : (
              <>
                <Wand2 className="h-10 w-10 text-indigo-500" />
                <h2 className="mt-3 text-base font-semibold text-slate-900">
                  Ready to build from {selectedCourses.length} selected courses
                </h2>
                <p className="mt-1 max-w-sm text-sm text-slate-500">
                  The AI will automatically pick sections with no time conflicts and the best instructor ratings
                </p>
                <button
                  onClick={generateSchedule}
                  className="mt-5 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-indigo-700"
                >
                  <Wand2 className="h-4 w-4" /> Generate Optimized Schedule
                </button>
              </>
            )}
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 items-start gap-6 xl:grid-cols-[1fr_360px]">
          <OptimizedScheduleView
            schedule={schedule}
            scheduleByDay={scheduleByDay}
            isLocked={isLocked}
            isLocking={isLocking}
            onFinalize={finalizeSchedule}
            onUnlock={unlockSchedule}
            onRegenerate={generateSchedule}
          />
          {workload && <WorkloadMeterWidget workload={workload} />}
        </div>
      )}
    </div>
  );
}

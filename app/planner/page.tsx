"use client";

import { usePlanner } from "@/presentation/hooks/usePlanner";
import { WeeklyCalendar } from "@/presentation/components/planner/WeeklyCalendar";

export default function PlannerPage() {
  const { blocksByDay, isLoading, toggleBlockCompletion } = usePlanner();

  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center text-sm text-slate-400">
        Loading weekly study schedule...
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Study Planner</h1>
        <p className="mt-1 text-sm text-slate-500">Your smart weekly study plan, Monday through Sunday</p>
      </div>

      <WeeklyCalendar blocksByDay={blocksByDay} onToggleBlock={toggleBlockCompletion} />
    </div>
  );
}

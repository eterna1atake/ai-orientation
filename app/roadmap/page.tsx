"use client";

import { useRoadmap } from "@/presentation/hooks/useRoadmap";
import { RoadmapTimeline } from "@/presentation/components/roadmap/RoadmapTimeline";
import { SkillGapMatrix } from "@/presentation/components/roadmap/SkillGapMatrix";
import { CareerTimelineList } from "@/presentation/components/roadmap/CareerTimelineList";

export default function RoadmapPage() {
  const { roadmap, skillsByCategory, skillGapSummary, careerMilestones, isLoading, toggleTaskStatus } = useRoadmap();

  if (isLoading || !roadmap) {
    return (
      <div className="flex h-96 items-center justify-center text-sm text-slate-400">
        Loading Roadmap and Skill Gap data...
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Career & Skill Gap</h1>
        <p className="mt-1 text-sm text-slate-500">
          A roadmap tailored to your AI assessment, with skill gap analysis and career path guidance
        </p>
      </div>

      <section>
        <h2 className="mb-4 text-lg font-semibold text-slate-900">Adaptive Learning Roadmap</h2>
        <RoadmapTimeline roadmap={roadmap} onToggleTask={toggleTaskStatus} />
      </section>

      <section>
        <SkillGapMatrix skillsByCategory={skillsByCategory} summary={skillGapSummary} />
      </section>

      <section>
        <CareerTimelineList milestones={careerMilestones} />
      </section>
    </div>
  );
}

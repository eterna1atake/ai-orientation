import { Roadmap, RoadmapPhase, RoadmapTask } from "../entities";

export function calculatePhaseProgress(phase: RoadmapPhase): number {
  if (phase.tasks.length === 0) return 0;
  const completed = phase.tasks.filter((t) => t.status === "completed").length;
  return Math.round((completed / phase.tasks.length) * 100);
}

export function calculateRoadmapProgress(roadmap: Roadmap): number {
  const allTasks: RoadmapTask[] = roadmap.phases.flatMap((p) => p.tasks);
  if (allTasks.length === 0) return 0;
  const completed = allTasks.filter((t) => t.status === "completed").length;
  return Math.round((completed / allTasks.length) * 100);
}

export function toggleRoadmapTaskStatus(roadmap: Roadmap, taskId: string): Roadmap {
  const phases = roadmap.phases.map((phase) => ({
    ...phase,
    tasks: phase.tasks.map((task) => {
      if (task.id !== taskId) return task;
      if (task.status === "locked") return task;
      return {
        ...task,
        status: task.status === "completed" ? ("in_progress" as const) : ("completed" as const),
      };
    }),
  }));

  const updatedRoadmap: Roadmap = { ...roadmap, phases };
  return {
    ...updatedRoadmap,
    overallProgressPercent: calculateRoadmapProgress(updatedRoadmap),
  };
}

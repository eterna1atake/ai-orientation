"use client";

import { useEffect, useState } from "react";
import { Roadmap, SkillGapItem, CareerMilestone } from "@/domain/entities";
import { fetchRoadmap, fetchSkillGaps, fetchCareerMilestones } from "@/data/repositories";
import {
  toggleRoadmapTaskStatus,
  getSkillGapSummary,
  groupSkillsByCategory,
  getUpcomingCareerMilestones,
} from "@/domain/usecases";

export function useRoadmap() {
  const [roadmap, setRoadmap] = useState<Roadmap | null>(null);
  const [skillGaps, setSkillGaps] = useState<SkillGapItem[]>([]);
  const [careerMilestones, setCareerMilestones] = useState<CareerMilestone[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    Promise.all([fetchRoadmap(), fetchSkillGaps(), fetchCareerMilestones()]).then(
      ([roadmapData, skillGapData, careerData]) => {
        if (!isMounted) return;
        setRoadmap(roadmapData);
        setSkillGaps(skillGapData);
        setCareerMilestones(careerData);
        setIsLoading(false);
      }
    );
    return () => {
      isMounted = false;
    };
  }, []);

  function handleToggleTask(taskId: string) {
    setRoadmap((prev) => (prev ? toggleRoadmapTaskStatus(prev, taskId) : prev));
  }

  return {
    roadmap,
    skillGaps,
    skillGapSummary: getSkillGapSummary(skillGaps),
    skillsByCategory: groupSkillsByCategory(skillGaps),
    careerMilestones: getUpcomingCareerMilestones(careerMilestones),
    isLoading,
    toggleTaskStatus: handleToggleTask,
  };
}

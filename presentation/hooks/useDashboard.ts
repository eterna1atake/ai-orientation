"use client";

import { useEffect, useState } from "react";
import { Student, Roadmap, StudyAnalytics, StudyBlock, DayOfWeek } from "@/domain/entities";
import { fetchStudentProfile, fetchRoadmap, fetchStudyAnalytics, fetchStudyBlocks } from "@/data/repositories";
import { getTodaysStudyBlocks, toggleStudyBlockCompletion } from "@/domain/usecases";

const DAY_NAMES: DayOfWeek[] = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export function useDashboard() {
  const [student, setStudent] = useState<Student | null>(null);
  const [roadmap, setRoadmap] = useState<Roadmap | null>(null);
  const [analytics, setAnalytics] = useState<StudyAnalytics | null>(null);
  const [studyBlocks, setStudyBlocks] = useState<StudyBlock[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    Promise.all([fetchStudentProfile(), fetchRoadmap(), fetchStudyAnalytics(), fetchStudyBlocks()]).then(
      ([studentData, roadmapData, analyticsData, blocksData]) => {
        if (!isMounted) return;
        setStudent(studentData);
        setRoadmap(roadmapData);
        setAnalytics(analyticsData);
        setStudyBlocks(blocksData);
        setIsLoading(false);
      }
    );
    return () => {
      isMounted = false;
    };
  }, []);

  const today = DAY_NAMES[new Date().getDay()];
  const todaysBlocks = getTodaysStudyBlocks(studyBlocks, today);

  function handleToggleBlock(blockId: string) {
    setStudyBlocks((prev) => toggleStudyBlockCompletion(prev, blockId));
  }

  return {
    student,
    roadmap,
    analytics,
    todaysBlocks,
    today,
    isLoading,
    toggleBlockCompletion: handleToggleBlock,
  };
}

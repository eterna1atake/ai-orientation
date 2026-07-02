"use client";

import { useEffect, useMemo, useState } from "react";
import { UniversityCourse, OptimizedSchedule, WorkloadAnalysis } from "@/domain/entities";
import {
  fetchUniversityCourses,
  fetchSelectedCourseIds,
  fetchLockedSchedule,
  saveLockedSchedule,
  clearLockedSchedule,
} from "@/data/repositories";
import { generateOptimizedSchedule, analyzeWorkload, groupScheduleByDay } from "@/domain/usecases";

export function useScheduleBuilder() {
  const [courses, setCourses] = useState<UniversityCourse[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [schedule, setSchedule] = useState<OptimizedSchedule | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isLocking, setIsLocking] = useState(false);

  useEffect(() => {
    let isMounted = true;
    Promise.all([fetchUniversityCourses(), fetchSelectedCourseIds(), fetchLockedSchedule()]).then(
      ([courseData, selectedData, lockedData]) => {
        if (!isMounted) return;
        setCourses(courseData);
        setSelectedIds(selectedData);
        setSchedule(lockedData);
        setIsLoading(false);
      }
    );
    return () => {
      isMounted = false;
    };
  }, []);

  const selectedCourses = useMemo(
    () => selectedIds.map((id) => courses.find((course) => course.id === id)).filter((c): c is UniversityCourse => Boolean(c)),
    [selectedIds, courses]
  );

  const workload: WorkloadAnalysis | null = useMemo(
    () => (schedule ? analyzeWorkload(schedule, courses) : null),
    [schedule, courses]
  );

  function generateSchedule() {
    setIsGenerating(true);
    // Simulate the AI optimizer taking a moment to solve the timetable.
    setTimeout(() => {
      setSchedule(generateOptimizedSchedule(selectedCourses));
      setIsGenerating(false);
    }, 1200);
  }

  async function finalizeSchedule() {
    if (!schedule || schedule.status === "locked") return;
    setIsLocking(true);
    const locked = await saveLockedSchedule(schedule);
    setSchedule(locked);
    setIsLocking(false);
  }

  async function unlockSchedule() {
    await clearLockedSchedule();
    setSchedule(null);
  }

  return {
    selectedCourses,
    schedule,
    scheduleByDay: schedule ? groupScheduleByDay(schedule) : [],
    workload,
    isLoading,
    isGenerating,
    isLocking,
    isLocked: schedule?.status === "locked",
    generateSchedule,
    finalizeSchedule,
    unlockSchedule,
  };
}

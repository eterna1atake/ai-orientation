"use client";

import { useEffect, useMemo, useState } from "react";
import { UniversityCourse, DegreeRequirement, SkillGapItem } from "@/domain/entities";
import {
  fetchUniversityCourses,
  fetchDegreeRequirements,
  fetchSelectedCourseIds,
  saveSelectedCourseIds,
  fetchSkillGaps,
} from "@/data/repositories";
import { getRecommendedCourses } from "@/domain/usecases";

export const MAX_CREDITS_PER_SEMESTER = 22;

export function useCourseSelection() {
  const [courses, setCourses] = useState<UniversityCourse[]>([]);
  const [skillGaps, setSkillGaps] = useState<SkillGapItem[]>([]);
  const [degreeRequirements, setDegreeRequirements] = useState<DegreeRequirement[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    Promise.all([
      fetchUniversityCourses(),
      fetchSkillGaps(),
      fetchDegreeRequirements(),
      fetchSelectedCourseIds(),
    ]).then(([courseData, gapData, degreeData, selectedData]) => {
      if (!isMounted) return;
      setCourses(courseData);
      setSkillGaps(gapData);
      setDegreeRequirements(degreeData);
      setSelectedIds(selectedData);
      setIsLoading(false);
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const recommendations = useMemo(() => getRecommendedCourses(courses, skillGaps), [courses, skillGaps]);

  const selectedCourses = useMemo(
    () => selectedIds.map((id) => courses.find((course) => course.id === id)).filter((c): c is UniversityCourse => Boolean(c)),
    [selectedIds, courses]
  );

  const totalCredits = selectedCourses.reduce((sum, course) => sum + course.credits, 0);

  function toggleCourse(courseId: string) {
    setSelectedIds((prev) => {
      const next = prev.includes(courseId) ? prev.filter((id) => id !== courseId) : [...prev, courseId];
      saveSelectedCourseIds(next);
      return next;
    });
  }

  return {
    recommendations,
    degreeRequirements,
    selectedIds,
    selectedCourses,
    totalCredits,
    isOverCreditLimit: totalCredits > MAX_CREDITS_PER_SEMESTER,
    isLoading,
    toggleCourse,
  };
}

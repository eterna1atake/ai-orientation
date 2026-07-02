"use client";

import { useEffect, useState } from "react";
import { Student, SkillGapItem, StudyAnalytics } from "@/domain/entities";
import { fetchStudentProfile, fetchSkillGaps, fetchStudyAnalytics } from "@/data/repositories";
import { getSkillRadarData, getActivityHeatmapWeeks } from "@/domain/usecases";

export function useStudentProfile() {
  const [student, setStudent] = useState<Student | null>(null);
  const [skillGaps, setSkillGaps] = useState<SkillGapItem[]>([]);
  const [analytics, setAnalytics] = useState<StudyAnalytics | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    Promise.all([fetchStudentProfile(), fetchSkillGaps(), fetchStudyAnalytics()]).then(
      ([studentData, skillGapData, analyticsData]) => {
        if (!isMounted) return;
        setStudent(studentData);
        setSkillGaps(skillGapData);
        setAnalytics(analyticsData);
        setIsLoading(false);
      }
    );
    return () => {
      isMounted = false;
    };
  }, []);

  return {
    student,
    academicRecord: analytics?.academicRecord ?? null,
    radarData: getSkillRadarData(skillGaps),
    activityWeeks: analytics ? getActivityHeatmapWeeks(analytics.activityLog) : [],
    isLoading,
  };
}

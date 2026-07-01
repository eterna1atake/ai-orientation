"use client";

import { useEffect, useState } from "react";
import { StudyAnalytics, KnowledgeGap } from "@/domain/entities";
import { fetchStudyAnalytics, fetchKnowledgeGaps } from "@/data/repositories";
import { getAnalyticsSummary, getPeakStudySubject, getVelocityTrend, getKnowledgeGapHistory } from "@/domain/usecases";

export function useAnalytics() {
  const [analytics, setAnalytics] = useState<StudyAnalytics | null>(null);
  const [knowledgeGaps, setKnowledgeGaps] = useState<KnowledgeGap[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    Promise.all([fetchStudyAnalytics(), fetchKnowledgeGaps()]).then(([analyticsData, gapData]) => {
      if (!isMounted) return;
      setAnalytics(analyticsData);
      setKnowledgeGaps(gapData);
      setIsLoading(false);
    });
    return () => {
      isMounted = false;
    };
  }, []);

  return {
    analytics,
    summary: analytics ? getAnalyticsSummary(analytics) : null,
    peakSubject: analytics ? getPeakStudySubject(analytics) : null,
    velocityTrend: analytics ? getVelocityTrend(analytics) : "flat",
    knowledgeGapHistory: getKnowledgeGapHistory(knowledgeGaps),
    isLoading,
  };
}

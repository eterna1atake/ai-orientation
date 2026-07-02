"use client";

import { useCourseSelection, MAX_CREDITS_PER_SEMESTER } from "@/presentation/hooks/useCourseSelection";
import { useSubscriptionGate } from "@/presentation/hooks/useSubscriptionGate";
import { CourseRecommendationList } from "@/presentation/components/courses/CourseRecommendationList";
import { CourseSelectionCart } from "@/presentation/components/courses/CourseSelectionCart";
import { UpgradeGate } from "@/presentation/components/subscription/UpgradeGate";

export default function CourseSelectionPage() {
  const { hasAccess, isLoading: isGateLoading } = useSubscriptionGate("pro");
  const {
    recommendations,
    degreeRequirements,
    selectedIds,
    selectedCourses,
    totalCredits,
    isOverCreditLimit,
    isLoading,
    toggleCourse,
  } = useCourseSelection();

  if (isLoading || isGateLoading) {
    return (
      <div className="flex h-96 items-center justify-center text-sm text-slate-400">
        Loading Course Recommendations...
      </div>
    );
  }

  if (!hasAccess) {
    return <UpgradeGate requiredTier="pro" featureName="Course Selection" />;
  }

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Course Selection</h1>
        <p className="mt-1 text-sm text-slate-500">
          Courses for Semester 1/2026, ranked by suitability against your skill gaps and career goals
        </p>
      </div>

      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[1fr_340px]">
        <CourseRecommendationList
          recommendations={recommendations}
          selectedIds={selectedIds}
          onToggleCourse={toggleCourse}
        />
        <div className="lg:sticky lg:top-6">
          <CourseSelectionCart
            selectedCourses={selectedCourses}
            totalCredits={totalCredits}
            maxCredits={MAX_CREDITS_PER_SEMESTER}
            isOverCreditLimit={isOverCreditLimit}
            degreeRequirements={degreeRequirements}
            onRemoveCourse={toggleCourse}
          />
        </div>
      </div>
    </div>
  );
}

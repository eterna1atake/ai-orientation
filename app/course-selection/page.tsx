"use client";

import { useCourseSelection, MAX_CREDITS_PER_SEMESTER } from "@/presentation/hooks/useCourseSelection";
import { CourseRecommendationList } from "@/presentation/components/courses/CourseRecommendationList";
import { CourseSelectionCart } from "@/presentation/components/courses/CourseSelectionCart";

export default function CourseSelectionPage() {
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

  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center text-sm text-slate-400">
        Loading Course Recommendations...
      </div>
    );
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

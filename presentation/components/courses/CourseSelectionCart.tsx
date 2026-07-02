import Link from "next/link";
import { ShoppingCart, X, ArrowRight, AlertTriangle, GraduationCap } from "lucide-react";
import { UniversityCourse, DegreeRequirement } from "@/domain/entities";
import { Card } from "@/presentation/components/ui/Card";
import { SectionHeader } from "@/presentation/components/ui/SectionHeader";
import { ProgressBar } from "@/presentation/components/ui/ProgressBar";

interface CourseSelectionCartProps {
  selectedCourses: UniversityCourse[];
  totalCredits: number;
  maxCredits: number;
  isOverCreditLimit: boolean;
  degreeRequirements: DegreeRequirement[];
  onRemoveCourse: (courseId: string) => void;
}

export function CourseSelectionCart({
  selectedCourses,
  totalCredits,
  maxCredits,
  isOverCreditLimit,
  degreeRequirements,
  onRemoveCourse,
}: CourseSelectionCartProps) {
  return (
    <div className="space-y-5">
      <Card>
        <SectionHeader
          title="Selected Courses"
          description={`${selectedCourses.length} courses · ${totalCredits}/${maxCredits} credits`}
        />

        {selectedCourses.length === 0 ? (
          <div className="flex flex-col items-center gap-2 py-6 text-center">
            <ShoppingCart className="h-8 w-8 text-slate-300" />
            <p className="text-sm text-slate-500">No courses selected yet — click Select on any recommendation to add it here</p>
          </div>
        ) : (
          <ul className="space-y-2">
            {selectedCourses.map((course) => (
              <li key={course.id} className="flex items-center justify-between gap-3 rounded-xl bg-slate-50 px-3 py-2.5">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-slate-800">{course.name}</p>
                  <p className="text-xs text-slate-400">
                    {course.code} · {course.credits} credits
                  </p>
                </div>
                <button
                  onClick={() => onRemoveCourse(course.id)}
                  className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-200 hover:text-slate-600"
                  aria-label={`Remove ${course.name}`}
                >
                  <X className="h-4 w-4" />
                </button>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-4">
          <div className="mb-1.5 flex items-center justify-between text-xs">
            <span className="text-slate-500">Credit Load</span>
            <span className={`font-medium ${isOverCreditLimit ? "text-rose-600" : "text-slate-700"}`}>
              {totalCredits} / {maxCredits}
            </span>
          </div>
          <ProgressBar
            percent={(totalCredits / maxCredits) * 100}
            colorClassName={isOverCreditLimit ? "bg-rose-500" : "bg-indigo-600"}
          />
          {isOverCreditLimit && (
            <p className="mt-2 flex items-start gap-1.5 text-xs text-rose-600">
              <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
              Over the {maxCredits}-credit-per-semester limit — remove a course before generating your schedule
            </p>
          )}
        </div>

        <Link
          href="/schedule-builder"
          aria-disabled={selectedCourses.length === 0}
          className={`mt-4 flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors ${
            selectedCourses.length === 0
              ? "pointer-events-none bg-slate-100 text-slate-400"
              : "bg-indigo-600 text-white hover:bg-indigo-700"
          }`}
        >
          Generate Optimized Schedule <ArrowRight className="h-4 w-4" />
        </Link>
      </Card>

      <Card>
        <SectionHeader title="Degree Requirements" description="Credits earned toward graduation" />
        <div className="space-y-3.5">
          {degreeRequirements.map((requirement) => (
            <div key={requirement.category}>
              <div className="mb-1 flex items-center justify-between text-sm">
                <span className="text-slate-700">{requirement.label}</span>
                <span className="font-medium text-slate-500">
                  {requirement.earnedCredits}/{requirement.requiredCredits}
                </span>
              </div>
              <ProgressBar percent={(requirement.earnedCredits / requirement.requiredCredits) * 100} colorClassName="bg-blue-500" />
            </div>
          ))}
        </div>
        <p className="mt-4 flex items-start gap-1.5 text-xs text-slate-400">
          <GraduationCap className="mt-0.5 h-3.5 w-3.5 shrink-0" />
          Based on the Computer Technology degree structure (aggregated from a mock Institutional API)
        </p>
      </Card>
    </div>
  );
}

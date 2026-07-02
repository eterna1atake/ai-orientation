import { Star, Sparkles, Clock, MapPin, Plus, Check, Users } from "lucide-react";
import { CourseRecommendation, CourseCategory } from "@/domain/entities";
import { Card } from "@/presentation/components/ui/Card";
import { Badge, BadgeTone } from "@/presentation/components/ui/Badge";

const CATEGORY_LABELS: Record<CourseCategory, string> = {
  major_core: "Major Core",
  major_elective: "Major Elective",
  general_education: "Gen-Ed",
  free_elective: "Free Elective",
};

const CATEGORY_TONES: Record<CourseCategory, BadgeTone> = {
  major_core: "indigo",
  major_elective: "blue",
  general_education: "slate",
  free_elective: "slate",
};

const DAY_SHORT: Record<string, string> = {
  Monday: "Mon",
  Tuesday: "Tue",
  Wednesday: "Wed",
  Thursday: "Thu",
  Friday: "Fri",
  Saturday: "Sat",
  Sunday: "Sun",
};

function suitabilityTone(score: number): { badge: BadgeTone; label: string } {
  if (score >= 80) return { badge: "green", label: "Highly Suitable" };
  if (score >= 60) return { badge: "blue", label: "Suitable" };
  return { badge: "slate", label: "Optional" };
}

function DifficultyDots({ level }: { level: number }) {
  return (
    <span className="inline-flex items-center gap-1" title={`Difficulty ${level}/5`}>
      {[1, 2, 3, 4, 5].map((dot) => (
        <span
          key={dot}
          className={`h-1.5 w-1.5 rounded-full ${dot <= level ? "bg-slate-500" : "bg-slate-200"}`}
        />
      ))}
    </span>
  );
}

interface CourseRecommendationListProps {
  recommendations: CourseRecommendation[];
  selectedIds: string[];
  onToggleCourse: (courseId: string) => void;
}

export function CourseRecommendationList({ recommendations, selectedIds, onToggleCourse }: CourseRecommendationListProps) {
  return (
    <div className="space-y-4">
      {recommendations.map(({ course, suitabilityScore, reasons }, index) => {
        const isSelected = selectedIds.includes(course.id);
        const tone = suitabilityTone(suitabilityScore);
        return (
          <Card key={course.id} className={isSelected ? "border-indigo-300 ring-1 ring-indigo-200" : ""}>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-semibold text-slate-400">#{index + 1}</span>
                  <span className="font-mono text-xs text-slate-500">{course.code}</span>
                  <Badge tone={CATEGORY_TONES[course.category]}>{CATEGORY_LABELS[course.category]}</Badge>
                  <span className="text-xs text-slate-400">{course.credits} credits</span>
                </div>
                <h3 className="mt-1 text-base font-semibold text-slate-900">{course.name}</h3>
                <p className="mt-1 text-sm text-slate-500">{course.description}</p>

                <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-500">
                  <span className="inline-flex items-center gap-1.5">
                    Difficulty <DifficultyDots level={course.difficultyScore} />
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" /> ~{course.avgWeeklyEffortHours}h self-study/week
                  </span>
                  {course.prerequisites.length > 0 && (
                    <span>Prereq: {course.prerequisites.join(", ")}</span>
                  )}
                </div>

                <ul className="mt-3 space-y-1.5">
                  {reasons.map((reason) => (
                    <li key={reason} className="flex items-start gap-2 text-sm text-slate-600">
                      <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0 text-indigo-400" />
                      {reason}
                    </li>
                  ))}
                </ul>

                <div className="mt-3 flex flex-wrap gap-2">
                  {course.sections.map((section) => (
                    <div
                      key={section.id}
                      className="flex flex-wrap items-center gap-x-3 gap-y-1 rounded-lg bg-slate-50 px-3 py-1.5 text-xs text-slate-600"
                    >
                      <span className="font-medium text-slate-700">{section.sectionLabel}</span>
                      <span>
                        {DAY_SHORT[section.slots[0].day]} {section.slots[0].startTime}-{section.slots[0].endTime}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="h-3 w-3" /> {section.slots[0].room}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Star className="h-3 w-3 fill-amber-400 text-amber-400" /> {section.instructorRating.toFixed(1)}
                      </span>
                      <span className="text-slate-400">{section.instructorName}</span>
                      <span className="inline-flex items-center gap-1 text-slate-400">
                        <Users className="h-3 w-3" /> {section.seatsLeft} seats left
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex shrink-0 flex-row items-center gap-4 sm:flex-col sm:items-end">
                <div className="text-center sm:text-right">
                  <p className="text-2xl font-semibold text-slate-900">{suitabilityScore}</p>
                  <p className="text-[11px] text-slate-400">Suitability</p>
                  <Badge tone={tone.badge} className="mt-1">
                    {tone.label}
                  </Badge>
                </div>
                <button
                  onClick={() => onToggleCourse(course.id)}
                  className={`inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-medium transition-colors ${
                    isSelected
                      ? "bg-indigo-600 text-white hover:bg-indigo-700"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {isSelected ? (
                    <>
                      <Check className="h-4 w-4" /> Selected
                    </>
                  ) : (
                    <>
                      <Plus className="h-4 w-4" /> Select
                    </>
                  )}
                </button>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}

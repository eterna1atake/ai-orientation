// Steps 3-7: Course recommendation, conflict-free schedule generation, workload analysis

import {
  UniversityCourse,
  CourseRecommendation,
  CourseSection,
  CourseScheduleSlot,
  OptimizedSchedule,
  ScheduledClass,
  SkippedCourse,
} from "../entities/Course";
import { SkillGapItem } from "../entities/SkillGap";
import { WorkloadAnalysis, WorkloadLevel, BurnoutRisk } from "../entities/Workload";

const DAY_LABELS: Record<string, string> = {
  Monday: "Monday",
  Tuesday: "Tuesday",
  Wednesday: "Wednesday",
  Thursday: "Thursday",
  Friday: "Friday",
  Saturday: "Saturday",
  Sunday: "Sunday",
};

function toMinutes(time: string): number {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

function slotDurationHours(slot: CourseScheduleSlot): number {
  return (toMinutes(slot.endTime) - toMinutes(slot.startTime)) / 60;
}

export function slotsOverlap(a: CourseScheduleSlot, b: CourseScheduleSlot): boolean {
  return (
    a.day === b.day &&
    toMinutes(a.startTime) < toMinutes(b.endTime) &&
    toMinutes(b.startTime) < toMinutes(a.endTime)
  );
}

// ---------------------------------------------------------------------------
// Step 3: Intelligent Course Recommendations (suitability ranking)
// ---------------------------------------------------------------------------

export function getRecommendedCourses(
  courses: UniversityCourse[],
  skillGaps: SkillGapItem[]
): CourseRecommendation[] {
  return courses
    .map((course) => scoreCourse(course, skillGaps))
    .sort((a, b) => b.suitabilityScore - a.suitabilityScore);
}

function scoreCourse(course: UniversityCourse, skillGaps: SkillGapItem[]): CourseRecommendation {
  let score = 40;
  const reasons: string[] = [];

  for (const skillName of course.relatedSkills) {
    const gap = skillGaps.find((item) => item.skillName === skillName);
    if (!gap) continue;
    if (gap.status === "critical_gap") {
      score += 20;
      reasons.push(`Helps close the critical gap in ${skillName}, the area the system detected as furthest from target`);
    } else if (gap.status === "gap") {
      score += 12;
      reasons.push(`Matches the skill gap in ${skillName} that's worth developing this term`);
    } else {
      score += 4;
      reasons.push(`Builds further on your existing strength in ${skillName}`);
    }
  }

  const bestRating = Math.max(...course.sections.map((section) => section.instructorRating));
  score += Math.round((bestRating - 3) * 8);
  if (bestRating >= 4.5) {
    reasons.push(`The instructor has a strong peer rating of ${bestRating.toFixed(1)}/5`);
  }

  if (course.difficultyScore >= 4) {
    score -= 6;
    reasons.push(`Difficulty level ${course.difficultyScore}/5 — budget around ${course.avgWeeklyEffortHours} hrs/week for review`);
  } else if (course.difficultyScore <= 2) {
    score += 4;
    reasons.push("Lighter workload — a good pick to help balance out your schedule");
  }

  if (reasons.length === 0) {
    reasons.push("Doesn't match your main skill gaps, but can be taken as an interest elective");
  }

  return {
    course,
    suitabilityScore: Math.min(99, Math.max(20, score)),
    reasons,
  };
}

// ---------------------------------------------------------------------------
// Step 5: Optimized schedule with zero time conflicts
// ---------------------------------------------------------------------------

export function generateOptimizedSchedule(selectedCourses: UniversityCourse[]): OptimizedSchedule {
  const classes: ScheduledClass[] = [];
  const skippedCourses: SkippedCourse[] = [];
  const placedSlots: CourseScheduleSlot[] = [];

  // Most-constrained-first: courses with fewer sections get placed before flexible ones.
  const ordered = [...selectedCourses].sort((a, b) => a.sections.length - b.sections.length);

  for (const course of ordered) {
    const fittingSections = course.sections.filter((section) =>
      section.slots.every((slot) => placedSlots.every((placed) => !slotsOverlap(slot, placed)))
    );

    if (fittingSections.length === 0) {
      const clashDays = [...new Set(course.sections.flatMap((s) => s.slots.map((slot) => DAY_LABELS[slot.day])))];
      skippedCourses.push({
        courseCode: course.code,
        courseName: course.name,
        reason: `Every section of this course (${clashDays.join(", ")}) overlaps with courses already placed in the schedule. Try removing another course, or take this one next term.`,
      });
      continue;
    }

    const bestSection = pickBestSection(fittingSections);
    placedSlots.push(...bestSection.slots);
    classes.push(
      ...bestSection.slots.map((slot) => ({
        courseId: course.id,
        courseCode: course.code,
        courseName: course.name,
        sectionLabel: bestSection.sectionLabel,
        instructorName: bestSection.instructorName,
        credits: course.credits,
        slot,
      }))
    );
  }

  const scheduledCourseIds = new Set(classes.map((cls) => cls.courseId));
  const totalCredits = selectedCourses
    .filter((course) => scheduledCourseIds.has(course.id))
    .reduce((sum, course) => sum + course.credits, 0);

  return {
    id: `sch-${classes.length}-${totalCredits}`,
    status: "draft",
    totalCredits,
    conflictCount: 0,
    classes: sortClassesByTime(classes),
    skippedCourses,
  };
}

function pickBestSection(sections: CourseSection[]): CourseSection {
  return [...sections].sort((a, b) => b.instructorRating - a.instructorRating)[0];
}

const DAY_ORDER = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

function sortClassesByTime(classes: ScheduledClass[]): ScheduledClass[] {
  return [...classes].sort((a, b) => {
    const dayDiff = DAY_ORDER.indexOf(a.slot.day) - DAY_ORDER.indexOf(b.slot.day);
    if (dayDiff !== 0) return dayDiff;
    return toMinutes(a.slot.startTime) - toMinutes(b.slot.startTime);
  });
}

export function groupScheduleByDay(schedule: OptimizedSchedule): { day: string; classes: ScheduledClass[] }[] {
  return DAY_ORDER.filter((day) => schedule.classes.some((cls) => cls.slot.day === day)).map((day) => ({
    day,
    classes: schedule.classes.filter((cls) => cls.slot.day === day),
  }));
}

// ---------------------------------------------------------------------------
// Step 6: Workload score & burnout risk
// ---------------------------------------------------------------------------

export function analyzeWorkload(
  schedule: OptimizedSchedule,
  courses: UniversityCourse[]
): WorkloadAnalysis {
  const scheduledCourses = courses.filter((course) =>
    schedule.classes.some((cls) => cls.courseId === course.id)
  );

  const weeklyClassHours = Math.round(
    schedule.classes.reduce((sum, cls) => sum + slotDurationHours(cls.slot), 0)
  );
  const weeklyEffortHours = scheduledCourses.reduce((sum, course) => sum + course.avgWeeklyEffortHours, 0);
  const hardCourseCount = scheduledCourses.filter((course) => course.difficultyScore >= 4).length;
  const avgDifficulty =
    scheduledCourses.length === 0
      ? 0
      : scheduledCourses.reduce((sum, course) => sum + course.difficultyScore, 0) / scheduledCourses.length;

  const score = Math.min(
    100,
    Math.round(schedule.totalCredits * 2 + (weeklyClassHours + weeklyEffortHours) * 1.1 + avgDifficulty * 6)
  );

  const level: WorkloadLevel = score < 45 ? "Light" : score <= 70 ? "Moderate" : "Heavy";
  const burnoutRisk: BurnoutRisk =
    score > 75 || hardCourseCount >= 3 ? "high" : score > 55 ? "medium" : "low";

  const warnings: string[] = [];
  if (schedule.totalCredits >= 21) {
    warnings.push(`Registering for ${schedule.totalCredits} credits is heavy for a term that also needs time for the CED project`);
  }
  if (hardCourseCount >= 2) {
    warnings.push(`${hardCourseCount} courses at difficulty level 4-5 in one term — watch out for overlapping midterm exams`);
  }
  const heavyDay = findHeaviestDay(schedule);
  if (heavyDay && heavyDay.hours > 6) {
    warnings.push(`${DAY_LABELS[heavyDay.day]} has ${heavyDay.hours} hours of class — plan your energy and rest carefully that day`);
  }

  const recommendations: string[] = [];
  if (level === "Heavy") {
    recommendations.push("Consider dropping one elective that doesn't match a skill gap to free up time for the project and rest");
    recommendations.push("Block off at least 1 hour of rest per day in the Planner tool to lower burnout risk");
  } else if (level === "Moderate") {
    recommendations.push("This load is well-balanced — schedule Deep Work mornings on class-free days for the hardest course");
    recommendations.push("Budget around " + weeklyEffortHours + " hrs/week for review, as each course requires");
  } else {
    recommendations.push("This load is relatively light — a good chance to put more time into the CED project or AWS Certification prep");
  }

  return {
    score,
    level,
    burnoutRisk,
    totalCredits: schedule.totalCredits,
    weeklyClassHours,
    weeklyEffortHours,
    hardCourseCount,
    warnings,
    recommendations,
  };
}

function findHeaviestDay(schedule: OptimizedSchedule): { day: string; hours: number } | null {
  const hoursByDay = new Map<string, number>();
  for (const cls of schedule.classes) {
    hoursByDay.set(cls.slot.day, (hoursByDay.get(cls.slot.day) ?? 0) + slotDurationHours(cls.slot));
  }
  let heaviest: { day: string; hours: number } | null = null;
  for (const [day, hours] of hoursByDay) {
    if (!heaviest || hours > heaviest.hours) heaviest = { day, hours: Math.round(hours * 10) / 10 };
  }
  return heaviest;
}

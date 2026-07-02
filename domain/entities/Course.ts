// Steps 3-7: University Academic Course Enrollment

import { DayOfWeek } from "./Calendar";

export type CourseCategory = "major_core" | "major_elective" | "general_education" | "free_elective";

export interface CourseScheduleSlot {
  day: DayOfWeek;
  startTime: string; // "09:00"
  endTime: string; // "12:00"
  room: string;
}

export interface CourseSection {
  id: string;
  sectionLabel: string; // e.g. "Sec 1"
  instructorName: string;
  instructorRating: number; // 0-5
  seatsLeft: number;
  slots: CourseScheduleSlot[];
}

export interface UniversityCourse {
  id: string;
  code: string;
  name: string;
  credits: number;
  category: CourseCategory;
  prerequisites: string[]; // course codes
  difficultyScore: number; // 1-5
  avgWeeklyEffortHours: number; // expected self-study hours outside class
  relatedSkills: string[]; // maps to SkillGapItem.skillName
  description: string;
  sections: CourseSection[];
}

export interface CourseRecommendation {
  course: UniversityCourse;
  suitabilityScore: number; // 0-100
  reasons: string[]; // Thai AI advice strings
}

export interface DegreeRequirement {
  category: CourseCategory;
  label: string;
  requiredCredits: number;
  earnedCredits: number;
}

export type ScheduleStatus = "draft" | "locked";

export interface ScheduledClass {
  courseId: string;
  courseCode: string;
  courseName: string;
  sectionLabel: string;
  instructorName: string;
  credits: number;
  slot: CourseScheduleSlot;
}

export interface SkippedCourse {
  courseCode: string;
  courseName: string;
  reason: string; // Thai explanation
}

export interface OptimizedSchedule {
  id: string;
  status: ScheduleStatus;
  totalCredits: number;
  conflictCount: number;
  classes: ScheduledClass[];
  skippedCourses: SkippedCourse[];
}

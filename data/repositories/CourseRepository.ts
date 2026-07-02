import { UniversityCourse, DegreeRequirement, OptimizedSchedule } from "@/domain/entities";
import { mockCourses, mockDegreeRequirements } from "@/data/mocks/mockDataStore";
import { withLatency } from "./delay";

// In-memory session state standing in for the enrollment backend.
let selectedCourseIds: string[] = ["crs-01", "crs-02", "crs-05"];
let lockedSchedule: OptimizedSchedule | null = null;

export async function fetchUniversityCourses(): Promise<UniversityCourse[]> {
  return withLatency(mockCourses, 450);
}

export async function fetchDegreeRequirements(): Promise<DegreeRequirement[]> {
  return withLatency(mockDegreeRequirements, 300);
}

export async function fetchSelectedCourseIds(): Promise<string[]> {
  return withLatency([...selectedCourseIds], 200);
}

export async function saveSelectedCourseIds(ids: string[]): Promise<string[]> {
  selectedCourseIds = [...ids];
  return withLatency([...selectedCourseIds], 150);
}

export async function fetchLockedSchedule(): Promise<OptimizedSchedule | null> {
  return withLatency(lockedSchedule, 250);
}

export async function saveLockedSchedule(schedule: OptimizedSchedule): Promise<OptimizedSchedule> {
  lockedSchedule = { ...schedule, status: "locked" };
  return withLatency(lockedSchedule, 400);
}

export async function clearLockedSchedule(): Promise<void> {
  lockedSchedule = null;
  return withLatency(undefined, 150);
}

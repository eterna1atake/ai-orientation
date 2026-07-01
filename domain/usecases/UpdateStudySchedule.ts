import { DayOfWeek, StudyBlock } from "../entities";

export function sortScheduleByPriority(blocks: StudyBlock[]): StudyBlock[] {
  return [...blocks].sort((a, b) => b.priorityWeight - a.priorityWeight);
}

export function sortScheduleByTime(blocks: StudyBlock[]): StudyBlock[] {
  return [...blocks].sort((a, b) => a.startTime.localeCompare(b.startTime));
}

export function getBlocksForDay(blocks: StudyBlock[], day: DayOfWeek): StudyBlock[] {
  return sortScheduleByTime(blocks.filter((b) => b.day === day));
}

export function getTodaysStudyBlocks(blocks: StudyBlock[], today: DayOfWeek): StudyBlock[] {
  return sortScheduleByPriority(getBlocksForDay(blocks, today));
}

export function toggleStudyBlockCompletion(blocks: StudyBlock[], blockId: string): StudyBlock[] {
  return blocks.map((b) => (b.id === blockId ? { ...b, completed: !b.completed } : b));
}

export function groupBlocksByDay(blocks: StudyBlock[]): Record<DayOfWeek, StudyBlock[]> {
  const days: DayOfWeek[] = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  return days.reduce((acc, day) => {
    acc[day] = getBlocksForDay(blocks, day);
    return acc;
  }, {} as Record<DayOfWeek, StudyBlock[]>);
}

import { Student } from "../entities";

export function getStudentProfile(student: Student): Student {
  return student;
}

export function getStudentDisplayName(student: Student): string {
  return `${student.nickname} · Year ${student.year} ${student.major}`;
}

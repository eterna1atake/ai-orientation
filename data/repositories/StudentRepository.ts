import { Student } from "@/domain/entities";
import { mockStudent } from "@/data/mocks/mockDataStore";
import { withLatency } from "./delay";

export async function fetchStudentProfile(): Promise<Student> {
  return withLatency(mockStudent, 300);
}

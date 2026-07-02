import { AssessmentQuestion, AssessmentTrackDefinition, AIAssessmentProfile, Student } from "@/domain/entities";
import { mockAssessmentQuestions, mockAssessmentTracks, mockStudent } from "@/data/mocks/mockDataStore";
import { withLatency } from "./delay";

export async function fetchAssessmentQuestions(): Promise<AssessmentQuestion[]> {
  return withLatency(mockAssessmentQuestions, 400);
}

export async function fetchAssessmentTracks(): Promise<AssessmentTrackDefinition[]> {
  return withLatency(mockAssessmentTracks, 300);
}

export async function saveAssessmentProfile(profile: AIAssessmentProfile): Promise<Student> {
  mockStudent.assessmentProfile = profile;
  return withLatency(mockStudent, 600);
}

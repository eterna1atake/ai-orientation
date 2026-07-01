// Module 1: AI Assessment Profile + core Student entity

export type LearningStyle = "Visual" | "Kinesthetic" | "Reading/Writing" | "Auditory";

export interface AssessmentTrait {
  trait: string;
  score: number; // 0-100
  description: string;
}

export interface AIAssessmentProfile {
  assessmentDate: string; // ISO date
  personaSummary: string; // Thai natural language summary
  learningStyle: LearningStyle;
  strengths: AssessmentTrait[];
  interests: string[];
  recommendedTrack: string;
  confidenceScore: number; // 0-100, AI model confidence in recommendation
}

export interface Student {
  id: string;
  fullName: string;
  nickname: string;
  university: string;
  faculty: string;
  major: string;
  year: number;
  studentId: string;
  avatarInitials: string;
  currentProject: {
    name: string;
    description: string;
    techStack: string[];
  };
  targetJob: string;
  gpa: number;
  assessmentProfile: AIAssessmentProfile;
}

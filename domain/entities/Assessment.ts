// Step 1: Interactive AI Assessment (questionnaire that produces an AIAssessmentProfile)

import { LearningStyle } from "./Student";

export interface AssessmentOption {
  id: string;
  label: string; // Thai
  trackWeights: Record<string, number>; // track key -> weight
  styleWeights: Partial<Record<LearningStyle, number>>;
  traitScores: Record<string, number>; // trait name -> 0-100 contribution
  interests: string[];
}

export interface AssessmentQuestion {
  id: string;
  order: number;
  prompt: string; // Thai
  helper?: string; // Thai
  options: AssessmentOption[];
}

export interface AssessmentAnswer {
  questionId: string;
  optionId: string;
}

export interface AssessmentTrackDefinition {
  key: string;
  label: string; // English track name shown in UI
  personaSummary: string; // Thai AI-written summary for this track
}

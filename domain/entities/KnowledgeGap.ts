// Module 9: Knowledge Gap History Logs

export type KnowledgeGapSeverity = "low" | "medium" | "high";

export interface KnowledgeGap {
  id: string;
  topic: string;
  relatedSkill: string;
  detectedDate: string; // ISO date
  severity: KnowledgeGapSeverity;
  sourceQuiz: string;
  suggestedMicroReview: string;
  resolved: boolean;
}

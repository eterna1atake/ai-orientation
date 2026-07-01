// Module 4: Course & Resource Recommendations

export type ResourceType = "course" | "video" | "documentation" | "article" | "certification";

export interface Resource {
  id: string;
  title: string;
  type: ResourceType;
  provider: string;
  url: string;
  durationLabel: string;
  relevantSkill: string;
  matchScore: number; // 0-100, how relevant to student's current gap
  description: string;
}

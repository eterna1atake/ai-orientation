// Module 6: DevOps/Full-Stack Skill Gap Matrix

export type SkillStatus = "match" | "gap" | "critical_gap";
export type SkillCategory = "Frontend" | "Backend" | "Database" | "DevOps" | "Tools & Practices";

export interface SkillGapItem {
  id: string;
  skillName: string;
  category: SkillCategory;
  requiredLevel: number; // 0-100
  currentLevel: number; // 0-100
  status: SkillStatus;
  recommendedAction: string;
}

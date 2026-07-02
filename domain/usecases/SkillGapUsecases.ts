import { SkillCategory, SkillGapItem } from "../entities";

export function getSkillGapSummary(skills: SkillGapItem[]) {
  const matched = skills.filter((s) => s.status === "match").length;
  const gaps = skills.filter((s) => s.status === "gap").length;
  const criticalGaps = skills.filter((s) => s.status === "critical_gap").length;
  return {
    total: skills.length,
    matched,
    gaps,
    criticalGaps,
    readinessPercent: skills.length === 0 ? 0 : Math.round((matched / skills.length) * 100),
  };
}

export function groupSkillsByCategory(
  skills: SkillGapItem[]
): Record<SkillCategory, SkillGapItem[]> {
  return skills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<SkillCategory, SkillGapItem[]>);
}

export function getCriticalSkillGaps(skills: SkillGapItem[]): SkillGapItem[] {
  return skills
    .filter((s) => s.status !== "match")
    .sort((a, b) => b.requiredLevel - b.currentLevel - (a.requiredLevel - a.currentLevel));
}

// Fixed axis order for the Skill Radar chart — deterministic regardless of input order.
const RADAR_CATEGORY_ORDER: SkillCategory[] = ["Frontend", "Backend", "Database", "DevOps", "Tools & Practices"];

export interface SkillRadarPoint {
  category: SkillCategory;
  current: number; // 0-100, averaged across skills in the category
  required: number; // 0-100, averaged across skills in the category
}

export function getSkillRadarData(skills: SkillGapItem[]): SkillRadarPoint[] {
  const grouped = groupSkillsByCategory(skills);
  return RADAR_CATEGORY_ORDER.map((category) => {
    const items = grouped[category] ?? [];
    if (items.length === 0) return null;
    const average = (key: "currentLevel" | "requiredLevel") =>
      Math.round(items.reduce((sum, item) => sum + item[key], 0) / items.length);
    return { category, current: average("currentLevel"), required: average("requiredLevel") };
  }).filter((point): point is SkillRadarPoint => point !== null);
}

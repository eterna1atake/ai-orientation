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

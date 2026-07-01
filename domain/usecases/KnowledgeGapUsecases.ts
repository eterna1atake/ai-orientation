import { KnowledgeGap } from "../entities";

const SEVERITY_WEIGHT: Record<KnowledgeGap["severity"], number> = {
  high: 3,
  medium: 2,
  low: 1,
};

export function getKnowledgeGapAlerts(gaps: KnowledgeGap[]): KnowledgeGap[] {
  return gaps
    .filter((g) => !g.resolved)
    .sort((a, b) => SEVERITY_WEIGHT[b.severity] - SEVERITY_WEIGHT[a.severity]);
}

export function getKnowledgeGapHistory(gaps: KnowledgeGap[]): KnowledgeGap[] {
  return [...gaps].sort(
    (a, b) => new Date(b.detectedDate).getTime() - new Date(a.detectedDate).getTime()
  );
}

export function resolveKnowledgeGap(gaps: KnowledgeGap[], gapId: string): KnowledgeGap[] {
  return gaps.map((g) => (g.id === gapId ? { ...g, resolved: true } : g));
}

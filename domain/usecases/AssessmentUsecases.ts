// Step 1: Turn questionnaire answers into a fresh AIAssessmentProfile

import { AssessmentAnswer, AssessmentQuestion, AssessmentTrackDefinition } from "../entities/Assessment";
import { AIAssessmentProfile, AssessmentTrait, LearningStyle } from "../entities/Student";

const TRAIT_DESCRIPTIONS: Record<string, string> = {
  "Problem Decomposition": "Skilled at breaking large problems into manageable pieces",
  "Frontend Implementation": "Quick at translating designs into working, real screens",
  "System Thinking": "Sees the big picture of a system and how its parts connect",
  "Data Intuition": "Spots patterns in data and asks sharp questions about numbers",
  "Security Mindset": "Thinks like an attacker to find vulnerabilities before they're exploited",
};

export function computeAssessmentResult(
  questions: AssessmentQuestion[],
  answers: AssessmentAnswer[],
  tracks: AssessmentTrackDefinition[]
): AIAssessmentProfile {
  const trackTotals = new Map<string, number>();
  const styleTotals = new Map<LearningStyle, number>();
  const traitContributions = new Map<string, number[]>();
  const interests = new Set<string>();

  for (const answer of answers) {
    const question = questions.find((q) => q.id === answer.questionId);
    const option = question?.options.find((o) => o.id === answer.optionId);
    if (!option) continue;

    for (const [track, weight] of Object.entries(option.trackWeights)) {
      trackTotals.set(track, (trackTotals.get(track) ?? 0) + weight);
    }
    for (const [style, weight] of Object.entries(option.styleWeights)) {
      styleTotals.set(style as LearningStyle, (styleTotals.get(style as LearningStyle) ?? 0) + (weight ?? 0));
    }
    for (const [trait, score] of Object.entries(option.traitScores)) {
      traitContributions.set(trait, [...(traitContributions.get(trait) ?? []), score]);
    }
    option.interests.forEach((interest) => interests.add(interest));
  }

  const rankedTracks = [...trackTotals.entries()].sort((a, b) => b[1] - a[1]);
  const winnerKey = rankedTracks[0]?.[0] ?? tracks[0].key;
  const winner = tracks.find((track) => track.key === winnerKey) ?? tracks[0];

  const totalTrackWeight = rankedTracks.reduce((sum, [, weight]) => sum + weight, 0);
  const winnerShare = totalTrackWeight === 0 ? 0.5 : (rankedTracks[0]?.[1] ?? 0) / totalTrackWeight;
  const confidenceScore = Math.min(97, Math.max(60, Math.round(55 + winnerShare * 55)));

  const rankedStyles = [...styleTotals.entries()].sort((a, b) => b[1] - a[1]);
  const learningStyle: LearningStyle = rankedStyles[0]?.[0] ?? "Kinesthetic";

  const strengths: AssessmentTrait[] = [...traitContributions.entries()]
    .map(([trait, scores]) => ({
      trait,
      score: Math.round(scores.reduce((sum, s) => sum + s, 0) / scores.length),
      description: TRAIT_DESCRIPTIONS[trait] ?? trait,
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  return {
    assessmentDate: new Date().toISOString().slice(0, 10),
    personaSummary: winner.personaSummary,
    learningStyle,
    strengths,
    interests: [...interests].slice(0, 5),
    recommendedTrack: winner.label,
    confidenceScore,
  };
}

export function getAssessmentProgressPercent(answeredCount: number, totalQuestions: number): number {
  if (totalQuestions === 0) return 0;
  return Math.round((answeredCount / totalQuestions) * 100);
}

import { AlertTriangle, Lightbulb } from "lucide-react";
import { KnowledgeGap } from "@/domain/entities";
import { Card } from "@/presentation/components/ui/Card";
import { Badge, BadgeTone } from "@/presentation/components/ui/Badge";
import { SectionHeader } from "@/presentation/components/ui/SectionHeader";

const SEVERITY_TONE: Record<KnowledgeGap["severity"], BadgeTone> = {
  high: "red",
  medium: "amber",
  low: "blue",
};

export function KnowledgeGapPanel({ gaps }: { gaps: KnowledgeGap[] }) {
  return (
    <Card>
      <SectionHeader title="Knowledge Gap Detection" description="Blind spots detected from recent quizzes and code reviews" />

      {gaps.length === 0 ? (
        <p className="py-6 text-center text-sm text-slate-400">No open knowledge gaps right now. Great work! 🎉</p>
      ) : (
        <ul className="space-y-3">
          {gaps.map((gap) => (
            <li key={gap.id} className="rounded-xl border border-slate-100 p-3.5">
              <div className="mb-1.5 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-amber-500" />
                  <p className="text-sm font-medium text-slate-900">{gap.topic}</p>
                </div>
                <Badge tone={SEVERITY_TONE[gap.severity]}>{gap.severity.toUpperCase()}</Badge>
              </div>
              <p className="text-xs text-slate-400">Source: {gap.sourceQuiz}</p>
              <div className="mt-2 flex items-start gap-2 rounded-lg bg-amber-50 p-2.5 text-xs text-amber-800">
                <Lightbulb className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                {gap.suggestedMicroReview}
              </div>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}

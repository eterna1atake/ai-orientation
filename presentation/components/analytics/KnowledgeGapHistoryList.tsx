import { CheckCircle2, AlertCircle } from "lucide-react";
import { KnowledgeGap } from "@/domain/entities";
import { Card } from "@/presentation/components/ui/Card";
import { Badge, BadgeTone } from "@/presentation/components/ui/Badge";
import { SectionHeader } from "@/presentation/components/ui/SectionHeader";

const SEVERITY_TONE: Record<KnowledgeGap["severity"], BadgeTone> = {
  high: "red",
  medium: "amber",
  low: "blue",
};

export function KnowledgeGapHistoryList({ history }: { history: KnowledgeGap[] }) {
  return (
    <Card>
      <SectionHeader title="Knowledge Gap History Log" description="Full history of detected knowledge gaps, most recent first" />

      <ul className="space-y-2.5">
        {history.map((gap) => (
          <li key={gap.id} className="flex items-start gap-3 rounded-xl border border-slate-100 p-3">
            {gap.resolved ? (
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
            ) : (
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
            )}
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-sm font-medium text-slate-900">{gap.topic}</p>
                <div className="flex items-center gap-1.5">
                  <Badge tone={SEVERITY_TONE[gap.severity]}>{gap.severity}</Badge>
                  {gap.resolved && <Badge tone="green">Resolved</Badge>}
                </div>
              </div>
              <p className="text-xs text-slate-400">
                {gap.relatedSkill} · Detected {gap.detectedDate}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
}

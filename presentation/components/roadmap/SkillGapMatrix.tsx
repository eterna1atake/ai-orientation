import { SkillCategory, SkillGapItem } from "@/domain/entities";
import { Card } from "@/presentation/components/ui/Card";
import { Badge, BadgeTone } from "@/presentation/components/ui/Badge";
import { ProgressBar } from "@/presentation/components/ui/ProgressBar";
import { SectionHeader } from "@/presentation/components/ui/SectionHeader";

const STATUS_LABEL: Record<SkillGapItem["status"], string> = {
  match: "Match",
  gap: "Gap",
  critical_gap: "Critical Gap",
};

const STATUS_TONE: Record<SkillGapItem["status"], BadgeTone> = {
  match: "green",
  gap: "amber",
  critical_gap: "red",
};

interface SkillGapMatrixProps {
  skillsByCategory: Record<SkillCategory, SkillGapItem[]>;
  summary: { total: number; matched: number; gaps: number; criticalGaps: number; readinessPercent: number };
}

export function SkillGapMatrix({ skillsByCategory, summary }: SkillGapMatrixProps) {
  return (
    <Card>
      <SectionHeader
        title="Skill Gap Analysis"
        description="Comparing current skill levels against what the Full-Stack/DevOps job market requires"
        action={
          <div className="flex items-center gap-2">
            <Badge tone="green">{summary.matched} Match</Badge>
            <Badge tone="amber">{summary.gaps} Gap</Badge>
            <Badge tone="red">{summary.criticalGaps} Critical</Badge>
          </div>
        }
      />

      <div className="space-y-6">
        {Object.entries(skillsByCategory).map(([category, skills]) => (
          <div key={category}>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">{category}</p>
            <div className="space-y-3">
              {skills.map((skill) => (
                <div key={skill.id} className="rounded-xl border border-slate-100 p-3">
                  <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                    <p className="text-sm font-medium text-slate-800">{skill.skillName}</p>
                    <Badge tone={STATUS_TONE[skill.status]}>{STATUS_LABEL[skill.status]}</Badge>
                  </div>
                  <div className="mb-1.5 flex items-center gap-3">
                    <div className="flex-1">
                      <ProgressBar
                        percent={skill.currentLevel}
                        colorClassName={skill.status === "match" ? "bg-emerald-500" : skill.status === "gap" ? "bg-amber-500" : "bg-rose-500"}
                      />
                    </div>
                    <span className="w-20 shrink-0 text-right text-xs text-slate-400">
                      {skill.currentLevel}/{skill.requiredLevel}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">{skill.recommendedAction}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

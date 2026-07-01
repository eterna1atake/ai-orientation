import { Award, Briefcase, GraduationCap, FolderKanban, Users } from "lucide-react";
import { CareerMilestone } from "@/domain/entities";
import { Card } from "@/presentation/components/ui/Card";
import { Badge, BadgeTone } from "@/presentation/components/ui/Badge";
import { SectionHeader } from "@/presentation/components/ui/SectionHeader";

const TYPE_ICON: Record<CareerMilestone["type"], typeof Award> = {
  certification: Award,
  internship: Briefcase,
  academic: GraduationCap,
  project: FolderKanban,
  networking: Users,
};

const STATUS_TONE: Record<CareerMilestone["status"], BadgeTone> = {
  open_now: "green",
  recommended: "indigo",
  upcoming: "blue",
  completed: "slate",
};

const STATUS_LABEL: Record<CareerMilestone["status"], string> = {
  open_now: "Open Now",
  recommended: "Recommended",
  upcoming: "Upcoming",
  completed: "Completed",
};

export function CareerTimelineList({ milestones }: { milestones: CareerMilestone[] }) {
  return (
    <Card>
      <SectionHeader title="Career & Internship Timeline" description="AWS Certified Cloud Practitioner, Toyota Tsusho Nexty, and other recommended paths" />

      <ul className="space-y-3">
        {milestones.map((milestone) => {
          const Icon = TYPE_ICON[milestone.type];
          return (
            <li key={milestone.id} className="flex items-start gap-3 rounded-xl border border-slate-100 p-3">
              <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                <Icon className="h-4.5 w-4.5" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-sm font-medium text-slate-900">{milestone.title}</p>
                  <Badge tone={STATUS_TONE[milestone.status]}>{STATUS_LABEL[milestone.status]}</Badge>
                </div>
                <p className="text-xs text-slate-400">
                  {milestone.organization} · {milestone.windowLabel}
                </p>
                <p className="mt-1 text-xs text-slate-500">{milestone.description}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </Card>
  );
}

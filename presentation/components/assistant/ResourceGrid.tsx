import { BookOpen, Video, FileText, Newspaper, Award, ExternalLink } from "lucide-react";
import { Resource, ResourceType } from "@/domain/entities";
import { Card } from "@/presentation/components/ui/Card";
import { Badge } from "@/presentation/components/ui/Badge";
import { SectionHeader } from "@/presentation/components/ui/SectionHeader";

const TYPE_ICON: Record<ResourceType, typeof BookOpen> = {
  course: BookOpen,
  video: Video,
  documentation: FileText,
  article: Newspaper,
  certification: Award,
};

export function ResourceGrid({ resources }: { resources: Resource[] }) {
  return (
    <Card>
      <SectionHeader title="Resource Recommendations" description="Curated to match Boss's current skill gaps" />

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {resources.map((resource) => {
          const Icon = TYPE_ICON[resource.type];
          return (
            <a
              key={resource.id}
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col rounded-xl border border-slate-100 p-3.5 transition-colors hover:border-indigo-200 hover:bg-indigo-50/40"
            >
              <div className="mb-2 flex items-center justify-between">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                  <Icon className="h-4 w-4" />
                </div>
                <Badge tone="indigo">{resource.matchScore}% Match</Badge>
              </div>
              <p className="text-sm font-medium text-slate-900 group-hover:text-indigo-700">{resource.title}</p>
              <p className="mt-1 text-xs text-slate-500">{resource.description}</p>
              <div className="mt-auto flex items-center justify-between pt-3 text-xs text-slate-400">
                <span>
                  {resource.provider} · {resource.durationLabel}
                </span>
                <ExternalLink className="h-3.5 w-3.5" />
              </div>
            </a>
          );
        })}
      </div>
    </Card>
  );
}

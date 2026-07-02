import Link from "next/link";
import { Sparkles, RotateCcw } from "lucide-react";
import { AIAssessmentProfile } from "@/domain/entities";
import { Card } from "@/presentation/components/ui/Card";
import { SectionHeader } from "@/presentation/components/ui/SectionHeader";
import { Badge } from "@/presentation/components/ui/Badge";
import { ProgressBar } from "@/presentation/components/ui/ProgressBar";

export function AssessmentSnapshotCard({ profile }: { profile: AIAssessmentProfile }) {
  const assessedOn = new Date(profile.assessmentDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Card>
      <SectionHeader
        title="AI Assessment Snapshot"
        description={`Last assessed ${assessedOn}`}
        action={
          <Link
            href="/assessment"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-indigo-600 hover:underline"
          >
            <RotateCcw className="h-3.5 w-3.5" /> Retake
          </Link>
        }
      />

      <div className="flex items-start gap-3 rounded-xl bg-indigo-50 p-4">
        <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-indigo-500" />
        <div>
          <p className="text-sm font-medium text-indigo-900">{profile.recommendedTrack}</p>
          <p className="mt-1 text-sm leading-relaxed text-indigo-700/80">{profile.personaSummary}</p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <Badge tone="indigo">{profile.learningStyle} Learner</Badge>
        <Badge tone="green">Confidence {profile.confidenceScore}%</Badge>
      </div>

      <div className="mt-4 space-y-3">
        {profile.strengths.map((strength) => (
          <div key={strength.trait}>
            <div className="mb-1 flex items-center justify-between text-sm">
              <span className="font-medium text-slate-700">{strength.trait}</span>
              <span className="text-slate-500">{strength.score}</span>
            </div>
            <ProgressBar percent={strength.score} />
          </div>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {profile.interests.map((interest) => (
          <Badge key={interest} tone="slate">
            {interest}
          </Badge>
        ))}
      </div>
    </Card>
  );
}

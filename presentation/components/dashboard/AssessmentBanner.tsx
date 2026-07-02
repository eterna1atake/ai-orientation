import Link from "next/link";
import { Sparkles, RotateCcw } from "lucide-react";
import { Student } from "@/domain/entities";
import { Card } from "@/presentation/components/ui/Card";
import { Badge } from "@/presentation/components/ui/Badge";

export function AssessmentBanner({ student }: { student: Student }) {
  const { assessmentProfile } = student;

  return (
    <Card className="border-indigo-100 bg-gradient-to-br from-indigo-600 via-indigo-600 to-blue-600 text-white">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/15">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-medium text-indigo-100">AI Assessment Profile</p>
            <p className="mt-1 max-w-xl text-sm leading-relaxed text-white/90">{assessmentProfile.personaSummary}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <Badge tone="slate" className="bg-white/15 text-white ring-white/20">
                {assessmentProfile.learningStyle} Learner
              </Badge>
              <Badge tone="slate" className="bg-white/15 text-white ring-white/20">
                Track: {assessmentProfile.recommendedTrack}
              </Badge>
            </div>
          </div>
        </div>
        <div className="flex shrink-0 flex-col items-center gap-2 sm:items-end">
          <div className="text-center sm:text-right">
            <p className="text-3xl font-bold">{assessmentProfile.confidenceScore}%</p>
            <p className="text-xs text-indigo-100">AI Confidence Score</p>
          </div>
          <Link
            href="/assessment"
            className="inline-flex items-center gap-1.5 rounded-lg bg-white/15 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-white/25"
          >
            <RotateCcw className="h-3.5 w-3.5" /> Retake Assessment
          </Link>
        </div>
      </div>
    </Card>
  );
}

import Link from "next/link";
import { Sparkles, Save, RotateCcw, CheckCircle2, LayoutDashboard } from "lucide-react";
import { AIAssessmentProfile } from "@/domain/entities";
import { Card } from "@/presentation/components/ui/Card";
import { SectionHeader } from "@/presentation/components/ui/SectionHeader";
import { Badge } from "@/presentation/components/ui/Badge";
import { ProgressBar } from "@/presentation/components/ui/ProgressBar";

interface AssessmentResultViewProps {
  result: AIAssessmentProfile;
  isSaving: boolean;
  isSaved: boolean;
  onSave: () => void;
  onRetake: () => void;
}

export function AssessmentResultView({ result, isSaving, isSaved, onSave, onRetake }: AssessmentResultViewProps) {
  return (
    <div className="mx-auto max-w-2xl space-y-5">
      <Card className="border-indigo-100 bg-gradient-to-br from-indigo-600 via-indigo-600 to-blue-600 text-white">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/15">
            <Sparkles className="h-5 w-5" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-indigo-100">Recommended Track</p>
            <p className="mt-0.5 text-lg font-semibold">{result.recommendedTrack}</p>
            <p className="mt-2 text-sm leading-relaxed text-white/90">{result.personaSummary}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <Badge tone="slate" className="bg-white/15 text-white ring-white/20">
                {result.learningStyle} Learner
              </Badge>
              <Badge tone="slate" className="bg-white/15 text-white ring-white/20">
                Confidence {result.confidenceScore}%
              </Badge>
            </div>
          </div>
        </div>
      </Card>

      <Card>
        <SectionHeader title="Strength Profile" description="Top traits detected from your answers" />
        <div className="space-y-4">
          {result.strengths.map((strength) => (
            <div key={strength.trait}>
              <div className="mb-1 flex items-center justify-between text-sm">
                <span className="font-medium text-slate-700">{strength.trait}</span>
                <span className="text-slate-500">{strength.score}</span>
              </div>
              <ProgressBar percent={strength.score} />
              <p className="mt-1 text-xs text-slate-400">{strength.description}</p>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <SectionHeader title="Detected Interests" />
        <div className="flex flex-wrap gap-2">
          {result.interests.map((interest) => (
            <Badge key={interest} tone="indigo">
              {interest}
            </Badge>
          ))}
        </div>
      </Card>

      {isSaved && (
        <div className="flex items-start gap-2.5 rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-800 ring-1 ring-inset ring-emerald-200">
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
          New profile saved! Your Roadmap and course recommendations will now update based on this latest assessment.
        </div>
      )}

      <div className="flex flex-wrap gap-3">
        {isSaved ? (
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-indigo-700"
          >
            <LayoutDashboard className="h-4 w-4" /> Back to Dashboard
          </Link>
        ) : (
          <button
            onClick={onSave}
            disabled={isSaving}
            className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-indigo-700 disabled:opacity-60"
          >
            <Save className="h-4 w-4" /> {isSaving ? "Saving..." : "Save to Profile"}
          </button>
        )}
        <button
          onClick={onRetake}
          className="inline-flex items-center gap-2 rounded-xl bg-slate-100 px-4 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-200"
        >
          <RotateCcw className="h-4 w-4" /> Retake Assessment
        </button>
      </div>
    </div>
  );
}

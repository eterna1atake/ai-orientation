"use client";

import { BrainCircuit, Sparkles, Clock, ListChecks } from "lucide-react";
import { useAssessment } from "@/presentation/hooks/useAssessment";
import { AssessmentQuiz } from "@/presentation/components/assessment/AssessmentQuiz";
import { AssessmentResultView } from "@/presentation/components/assessment/AssessmentResultView";
import { Card } from "@/presentation/components/ui/Card";

export default function AssessmentPage() {
  const {
    phase,
    questions,
    currentQuestion,
    currentIndex,
    currentAnswer,
    progressPercent,
    result,
    isLoading,
    isSaving,
    isSaved,
    startQuiz,
    selectOption,
    goNext,
    goBack,
    saveResult,
    retake,
  } = useAssessment();

  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center text-sm text-slate-400">
        Loading Assessment data...
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">AI Assessment</h1>
        <p className="mt-1 text-sm text-slate-500">
          A short assessment so the AI can analyze your learning style and recommend the career track that fits you best
        </p>
      </div>

      {phase === "intro" && (
        <Card className="mx-auto max-w-2xl">
          <div className="flex flex-col items-center py-6 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
              <BrainCircuit className="h-7 w-7" />
            </div>
            <h2 className="mt-4 text-lg font-semibold text-slate-900">Create Your Academic Profile</h2>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-slate-500">
              Answer {questions.length} questions honestly, and the AI will process your strengths, learning style,
              and recommended track — automatically updating your Roadmap and recommended courses.
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-slate-400">
              <span className="inline-flex items-center gap-1.5">
                <ListChecks className="h-4 w-4" /> {questions.length} questions
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-4 w-4" /> ~3 minutes
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Sparkles className="h-4 w-4" /> AI-personalized result
              </span>
            </div>
            <button
              onClick={startQuiz}
              className="mt-6 rounded-xl bg-indigo-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-indigo-700"
            >
              Start Assessment
            </button>
          </div>
        </Card>
      )}

      {phase === "quiz" && currentQuestion && (
        <AssessmentQuiz
          question={currentQuestion}
          questionIndex={currentIndex}
          totalQuestions={questions.length}
          progressPercent={progressPercent}
          currentAnswer={currentAnswer}
          onSelectOption={selectOption}
          onNext={goNext}
          onBack={goBack}
        />
      )}

      {phase === "analyzing" && (
        <Card className="mx-auto max-w-2xl">
          <div className="flex flex-col items-center py-12 text-center">
            <div className="h-10 w-10 animate-spin rounded-full border-[3px] border-indigo-100 border-t-indigo-600" />
            <p className="mt-4 text-sm font-medium text-slate-700">AI is analyzing your learning profile...</p>
            <p className="mt-1 text-xs text-slate-400">Processing your strengths, interests, and the best-fit track</p>
          </div>
        </Card>
      )}

      {phase === "result" && result && (
        <AssessmentResultView
          result={result}
          isSaving={isSaving}
          isSaved={isSaved}
          onSave={saveResult}
          onRetake={retake}
        />
      )}
    </div>
  );
}

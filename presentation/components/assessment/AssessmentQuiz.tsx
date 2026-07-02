import { ArrowLeft, ArrowRight, BrainCircuit, CheckCircle2, Circle } from "lucide-react";
import { AssessmentQuestion, AssessmentAnswer } from "@/domain/entities";
import { Card } from "@/presentation/components/ui/Card";
import { ProgressBar } from "@/presentation/components/ui/ProgressBar";

interface AssessmentQuizProps {
  question: AssessmentQuestion;
  questionIndex: number;
  totalQuestions: number;
  progressPercent: number;
  currentAnswer: AssessmentAnswer | null;
  onSelectOption: (questionId: string, optionId: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export function AssessmentQuiz({
  question,
  questionIndex,
  totalQuestions,
  progressPercent,
  currentAnswer,
  onSelectOption,
  onNext,
  onBack,
}: AssessmentQuizProps) {
  const isLastQuestion = questionIndex === totalQuestions - 1;

  return (
    <Card className="mx-auto max-w-2xl">
      <div className="mb-5">
        <div className="mb-2 flex items-center justify-between text-xs">
          <span className="inline-flex items-center gap-1.5 font-medium text-indigo-600">
            <BrainCircuit className="h-4 w-4" /> AI Assessment
          </span>
          <span className="text-slate-400">
            Question {questionIndex + 1} of {totalQuestions}
          </span>
        </div>
        <ProgressBar percent={progressPercent} heightClassName="h-1.5" />
      </div>

      <h2 className="text-lg font-semibold text-slate-900">{question.prompt}</h2>
      {question.helper && <p className="mt-1 text-sm text-slate-400">{question.helper}</p>}

      <div className="mt-5 space-y-2.5">
        {question.options.map((option) => {
          const isSelected = currentAnswer?.optionId === option.id;
          return (
            <button
              key={option.id}
              onClick={() => onSelectOption(question.id, option.id)}
              className={`flex w-full items-start gap-3 rounded-xl border px-4 py-3.5 text-left text-sm transition-colors ${
                isSelected
                  ? "border-indigo-300 bg-indigo-50 text-indigo-900 ring-1 ring-indigo-200"
                  : "border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50"
              }`}
            >
              {isSelected ? (
                <CheckCircle2 className="mt-0.5 h-4.5 w-4.5 shrink-0 text-indigo-600" />
              ) : (
                <Circle className="mt-0.5 h-4.5 w-4.5 shrink-0 text-slate-300" />
              )}
              {option.label}
            </button>
          );
        })}
      </div>

      <div className="mt-6 flex items-center justify-between">
        <button
          onClick={onBack}
          disabled={questionIndex === 0}
          className="inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm font-medium text-slate-500 transition-colors hover:bg-slate-50 disabled:invisible"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </button>
        <button
          onClick={onNext}
          disabled={!currentAnswer}
          className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-indigo-700 disabled:opacity-50"
        >
          {isLastQuestion ? "Analyze My Profile" : "Next"} <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </Card>
  );
}

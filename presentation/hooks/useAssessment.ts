"use client";

import { useEffect, useState } from "react";
import {
  AssessmentQuestion,
  AssessmentTrackDefinition,
  AssessmentAnswer,
  AIAssessmentProfile,
} from "@/domain/entities";
import {
  fetchAssessmentQuestions,
  fetchAssessmentTracks,
  saveAssessmentProfile,
} from "@/data/repositories";
import { computeAssessmentResult, getAssessmentProgressPercent } from "@/domain/usecases";

export type AssessmentPhase = "intro" | "quiz" | "analyzing" | "result";

export function useAssessment() {
  const [questions, setQuestions] = useState<AssessmentQuestion[]>([]);
  const [tracks, setTracks] = useState<AssessmentTrackDefinition[]>([]);
  const [answers, setAnswers] = useState<AssessmentAnswer[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [phase, setPhase] = useState<AssessmentPhase>("intro");
  const [result, setResult] = useState<AIAssessmentProfile | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    Promise.all([fetchAssessmentQuestions(), fetchAssessmentTracks()]).then(([questionData, trackData]) => {
      if (!isMounted) return;
      setQuestions(questionData);
      setTracks(trackData);
      setIsLoading(false);
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const currentQuestion = questions[currentIndex] ?? null;
  const currentAnswer = answers.find((answer) => answer.questionId === currentQuestion?.id) ?? null;

  function startQuiz() {
    setPhase("quiz");
  }

  function selectOption(questionId: string, optionId: string) {
    setAnswers((prev) => [...prev.filter((answer) => answer.questionId !== questionId), { questionId, optionId }]);
  }

  function goNext() {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      return;
    }
    setPhase("analyzing");
    // Simulate the AI model analyzing the answers before revealing the result.
    setTimeout(() => {
      setResult(computeAssessmentResult(questions, answers, tracks));
      setPhase("result");
    }, 1600);
  }

  function goBack() {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  }

  async function saveResult() {
    if (!result || isSaved) return;
    setIsSaving(true);
    await saveAssessmentProfile(result);
    setIsSaving(false);
    setIsSaved(true);
  }

  function retake() {
    setAnswers([]);
    setCurrentIndex(0);
    setResult(null);
    setIsSaved(false);
    setPhase("quiz");
  }

  return {
    phase,
    questions,
    currentQuestion,
    currentIndex,
    currentAnswer,
    progressPercent: getAssessmentProgressPercent(currentIndex, questions.length),
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
  };
}

"use client";

import { useEffect, useState } from "react";
import { ChatThread, ChatMessage, Resource, KnowledgeGap, UserSubscription } from "@/domain/entities";
import { fetchChatThreads, fetchResources, fetchKnowledgeGaps, fetchUserSubscription, incrementAIAssistantUsage } from "@/data/repositories";
import { generateMockAIResponse, getTopRecommendedResources, getKnowledgeGapAlerts, getRemainingAIMessages, hasReachedAIAssistantLimit } from "@/domain/usecases";

export function useAIAssistant() {
  const [threads, setThreads] = useState<ChatThread[]>([]);
  const [resources, setResources] = useState<Resource[]>([]);
  const [knowledgeGaps, setKnowledgeGaps] = useState<KnowledgeGap[]>([]);
  const [subscription, setSubscription] = useState<UserSubscription | null>(null);
  const [activeThreadId, setActiveThreadId] = useState<string | null>(null);
  const [isAiTyping, setIsAiTyping] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    Promise.all([fetchChatThreads(), fetchResources(), fetchKnowledgeGaps(), fetchUserSubscription()]).then(
      ([threadData, resourceData, gapData, subscriptionData]) => {
        if (!isMounted) return;
        setThreads(threadData);
        setResources(resourceData);
        setKnowledgeGaps(gapData);
        setSubscription(subscriptionData);
        setActiveThreadId(threadData[0]?.id ?? null);
        setIsLoading(false);
      }
    );
    return () => {
      isMounted = false;
    };
  }, []);

  const activeThread = threads.find((t) => t.id === activeThreadId) ?? null;
  const isLimitReached = subscription ? hasReachedAIAssistantLimit(subscription) : false;

  function sendMessage(content: string) {
    if (!activeThread || content.trim().length === 0 || isLimitReached) return;

    const studentMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      threadId: activeThread.id,
      role: "student",
      content,
      timestamp: new Date().toISOString(),
    };

    setThreads((prev) =>
      prev.map((t) => (t.id === activeThread.id ? { ...t, messages: [...t.messages, studentMessage] } : t))
    );
    setIsAiTyping(true);
    incrementAIAssistantUsage().then(setSubscription);

    setTimeout(() => {
      const aiMessage: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        threadId: activeThread.id,
        role: "ai",
        content: generateMockAIResponse(content),
        timestamp: new Date().toISOString(),
      };
      setThreads((prev) =>
        prev.map((t) =>
          t.id === activeThread.id
            ? { ...t, messages: [...t.messages, aiMessage], lastUpdated: aiMessage.timestamp }
            : t
        )
      );
      setIsAiTyping(false);
    }, 1000);
  }

  return {
    threads,
    activeThread,
    setActiveThreadId,
    sendMessage,
    isAiTyping,
    resources: getTopRecommendedResources(resources, 6),
    knowledgeGapAlerts: getKnowledgeGapAlerts(knowledgeGaps),
    isLoading,
    subscriptionTier: subscription?.tier ?? "free",
    remainingAIMessages: subscription ? getRemainingAIMessages(subscription) : null,
    isLimitReached,
  };
}

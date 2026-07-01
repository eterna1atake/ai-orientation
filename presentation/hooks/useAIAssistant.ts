"use client";

import { useEffect, useState } from "react";
import { ChatThread, ChatMessage, Resource, KnowledgeGap } from "@/domain/entities";
import { fetchChatThreads, fetchResources, fetchKnowledgeGaps } from "@/data/repositories";
import { generateMockAIResponse, getTopRecommendedResources, getKnowledgeGapAlerts } from "@/domain/usecases";

export function useAIAssistant() {
  const [threads, setThreads] = useState<ChatThread[]>([]);
  const [resources, setResources] = useState<Resource[]>([]);
  const [knowledgeGaps, setKnowledgeGaps] = useState<KnowledgeGap[]>([]);
  const [activeThreadId, setActiveThreadId] = useState<string | null>(null);
  const [isAiTyping, setIsAiTyping] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    Promise.all([fetchChatThreads(), fetchResources(), fetchKnowledgeGaps()]).then(
      ([threadData, resourceData, gapData]) => {
        if (!isMounted) return;
        setThreads(threadData);
        setResources(resourceData);
        setKnowledgeGaps(gapData);
        setActiveThreadId(threadData[0]?.id ?? null);
        setIsLoading(false);
      }
    );
    return () => {
      isMounted = false;
    };
  }, []);

  const activeThread = threads.find((t) => t.id === activeThreadId) ?? null;

  function sendMessage(content: string) {
    if (!activeThread || content.trim().length === 0) return;

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
  };
}

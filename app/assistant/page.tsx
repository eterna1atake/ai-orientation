"use client";

import { useAIAssistant } from "@/presentation/hooks/useAIAssistant";
import { ChatPanel } from "@/presentation/components/assistant/ChatPanel";
import { ResourceGrid } from "@/presentation/components/assistant/ResourceGrid";
import { KnowledgeGapPanel } from "@/presentation/components/assistant/KnowledgeGapPanel";

export default function AssistantPage() {
  const {
    threads,
    activeThread,
    setActiveThreadId,
    sendMessage,
    isAiTyping,
    resources,
    knowledgeGapAlerts,
    isLoading,
    remainingAIMessages,
    isLimitReached,
  } = useAIAssistant();

  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center text-sm text-slate-400">
        Loading AI Learning Assistant...
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">AI Assistant</h1>
        <p className="mt-1 text-sm text-slate-500">Ask about Next.js, MongoDB, Docker, or anything else on your mind</p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <ChatPanel
            threads={threads}
            activeThread={activeThread}
            onSelectThread={setActiveThreadId}
            onSendMessage={sendMessage}
            isAiTyping={isAiTyping}
            remainingMessages={remainingAIMessages}
            isLimitReached={isLimitReached}
          />
        </div>
        <div className="space-y-6 lg:col-span-2">
          <KnowledgeGapPanel gaps={knowledgeGapAlerts} />
        </div>
      </div>

      <ResourceGrid resources={resources} />
    </div>
  );
}

"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { Send, Sparkles, User, Lock } from "lucide-react";
import { ChatThread } from "@/domain/entities";
import { Card } from "@/presentation/components/ui/Card";

interface ChatPanelProps {
  threads: ChatThread[];
  activeThread: ChatThread | null;
  onSelectThread: (threadId: string) => void;
  onSendMessage: (content: string) => void;
  isAiTyping: boolean;
  remainingMessages: number | null;
  isLimitReached: boolean;
}

export function ChatPanel({
  threads,
  activeThread,
  onSelectThread,
  onSendMessage,
  isAiTyping,
  remainingMessages,
  isLimitReached,
}: ChatPanelProps) {
  const [draft, setDraft] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!draft.trim()) return;
    onSendMessage(draft.trim());
    setDraft("");
  }

  return (
    <Card className="flex h-[640px] flex-col overflow-hidden p-0">
      <div className="flex items-center gap-2 overflow-x-auto border-b border-slate-100 px-4 py-3">
        {threads.map((thread) => (
          <button
            key={thread.id}
            onClick={() => onSelectThread(thread.id)}
            className={`shrink-0 whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
              activeThread?.id === thread.id ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-500 hover:bg-slate-200"
            }`}
          >
            {thread.topic}
          </button>
        ))}
      </div>

      <div className="flex-1 space-y-4 overflow-y-auto px-4 py-4">
        {activeThread?.messages.map((message) => (
          <div key={message.id} className={`flex gap-2.5 ${message.role === "student" ? "justify-end" : "justify-start"}`}>
            {message.role === "ai" && (
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                <Sparkles className="h-4 w-4" />
              </div>
            )}
            <div
              className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                message.role === "student" ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-700"
              }`}
            >
              {message.content}
            </div>
            {message.role === "student" && (
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-200 text-slate-500">
                <User className="h-4 w-4" />
              </div>
            )}
          </div>
        ))}

        {isAiTyping && (
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
              <Sparkles className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-1 rounded-2xl bg-slate-100 px-4 py-3">
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400 [animation-delay:-0.3s]" />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400 [animation-delay:-0.15s]" />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400" />
            </div>
          </div>
        )}
      </div>

      {isLimitReached ? (
        <div className="flex flex-col items-center gap-2 border-t border-slate-100 p-4 text-center">
          <p className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600">
            <Lock className="h-4 w-4 text-amber-500" /> You&apos;ve used all your free messages for today
          </p>
          <Link
            href="/subscription"
            className="rounded-full bg-indigo-600 px-4 py-1.5 text-xs font-medium text-white transition-colors hover:bg-indigo-700"
          >
            Upgrade to Pro for unlimited messages
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="border-t border-slate-100 p-3">
          <div className="flex items-center gap-2">
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Type your question, e.g. about Docker Networks..."
              className="flex-1 rounded-full border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
            />
            <button
              type="submit"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50"
              disabled={!draft.trim()}
              aria-label="Send message"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
          {remainingMessages !== null && (
            <p className="mt-1.5 px-2 text-[11px] text-slate-400">
              {remainingMessages} free message{remainingMessages === 1 ? "" : "s"} left today ·{" "}
              <Link href="/subscription" className="text-indigo-500 hover:underline">
                Upgrade for unlimited
              </Link>
            </p>
          )}
        </form>
      )}
    </Card>
  );
}

"use client";

import { Bell, X, Route, BotMessageSquare, CalendarClock, ShieldAlert, Briefcase, Settings } from "lucide-react";
import { NotificationEvent, NotificationCategory } from "@/domain/entities";

const CATEGORY_ICON: Record<NotificationCategory, typeof Bell> = {
  roadmap: Route,
  ai_assistant: BotMessageSquare,
  planner: CalendarClock,
  skill_gap: ShieldAlert,
  career: Briefcase,
  system: Settings,
};

interface NotificationDropdownProps {
  notifications: NotificationEvent[];
  isOpen: boolean;
  onClose: () => void;
  onDismiss: (id: string) => void;
}

export function NotificationDropdown({ notifications, isOpen, onClose, onDismiss }: NotificationDropdownProps) {
  if (!isOpen) return null;

  return (
    <div className="absolute right-0 top-full z-50 mt-2 w-80 rounded-2xl border border-slate-200 bg-white shadow-lg sm:w-96">
      <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
        <p className="text-sm font-semibold text-slate-900">Notifications</p>
        <button onClick={onClose} className="text-slate-400 hover:text-slate-600" aria-label="Close notifications">
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="max-h-96 overflow-y-auto">
        {notifications.length === 0 ? (
          <p className="px-4 py-8 text-center text-sm text-slate-400">No new notifications 🎉</p>
        ) : (
          notifications.map((n) => {
            const Icon = CATEGORY_ICON[n.category];
            return (
              <button
                key={n.id}
                onClick={() => onDismiss(n.id)}
                className="flex w-full items-start gap-3 border-b border-slate-50 px-4 py-3 text-left transition-colors hover:bg-slate-50"
              >
                <div
                  className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                    n.priority === "high" ? "bg-rose-50 text-rose-600" : "bg-indigo-50 text-indigo-600"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-slate-900">{n.title}</p>
                  <p className="mt-0.5 line-clamp-2 text-xs text-slate-500">{n.message}</p>
                </div>
              </button>
            );
          })
        )}
      </div>
    </div>
  );
}

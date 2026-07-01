import { Bell, Route, BotMessageSquare, CalendarClock, ShieldAlert, Briefcase, Settings } from "lucide-react";
import { NotificationEvent, NotificationCategory } from "@/domain/entities";
import { Card } from "@/presentation/components/ui/Card";
import { SectionHeader } from "@/presentation/components/ui/SectionHeader";
import { Badge } from "@/presentation/components/ui/Badge";

const CATEGORY_ICON: Record<NotificationCategory, typeof Bell> = {
  roadmap: Route,
  ai_assistant: BotMessageSquare,
  planner: CalendarClock,
  skill_gap: ShieldAlert,
  career: Briefcase,
  system: Settings,
};

interface NotificationsFeedWidgetProps {
  notifications: NotificationEvent[];
  onDismiss: (id: string) => void;
}

export function NotificationsFeedWidget({ notifications, onDismiss }: NotificationsFeedWidgetProps) {
  const activeNotifications = notifications.filter((n) => !n.isRead);

  return (
    <Card>
      <SectionHeader title="Notification Queue" description={`${activeNotifications.length} unread item${activeNotifications.length === 1 ? "" : "s"}`} />

      {activeNotifications.length === 0 ? (
        <p className="py-6 text-center text-sm text-slate-400">You&apos;re all caught up on notifications 🎉</p>
      ) : (
        <ul className="space-y-2.5">
          {activeNotifications.map((n) => {
            const Icon = CATEGORY_ICON[n.category];
            return (
              <li key={n.id} className="flex items-start gap-3 rounded-xl border border-slate-100 p-3">
                <div
                  className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                    n.priority === "high" ? "bg-rose-50 text-rose-600" : "bg-indigo-50 text-indigo-600"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-slate-900">{n.title}</p>
                    {n.priority === "high" && <Badge tone="red">Urgent</Badge>}
                  </div>
                  <p className="mt-0.5 text-xs text-slate-500">{n.message}</p>
                </div>
                <button
                  onClick={() => onDismiss(n.id)}
                  className="shrink-0 rounded-full px-2 py-1 text-xs font-medium text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                >
                  Dismiss
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </Card>
  );
}

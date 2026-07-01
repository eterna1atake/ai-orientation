// Module 10: Notification Event Queue Stream

export type NotificationCategory = "roadmap" | "ai_assistant" | "planner" | "skill_gap" | "career" | "system";
export type NotificationPriority = "low" | "medium" | "high";

export interface NotificationEvent {
  id: string;
  category: NotificationCategory;
  priority: NotificationPriority;
  title: string;
  message: string; // Thai
  createdAt: string; // ISO datetime
  isRead: boolean;
}

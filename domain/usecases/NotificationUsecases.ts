import { NotificationEvent } from "../entities";

export function filterActiveNotifications(notifications: NotificationEvent[]): NotificationEvent[] {
  return notifications.filter((n) => !n.isRead);
}

export function sortNotificationsByRecency(notifications: NotificationEvent[]): NotificationEvent[] {
  return [...notifications].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export function dismissNotification(
  notifications: NotificationEvent[],
  notificationId: string
): NotificationEvent[] {
  return notifications.map((n) => (n.id === notificationId ? { ...n, isRead: true } : n));
}

export function countUnreadNotifications(notifications: NotificationEvent[]): number {
  return notifications.filter((n) => !n.isRead).length;
}

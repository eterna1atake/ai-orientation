"use client";

import { useEffect, useState } from "react";
import { NotificationEvent } from "@/domain/entities";
import { fetchNotifications } from "@/data/repositories";
import {
  countUnreadNotifications,
  dismissNotification,
  sortNotificationsByRecency,
} from "@/domain/usecases";

export function useNotifications() {
  const [notifications, setNotifications] = useState<NotificationEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    fetchNotifications().then((data) => {
      if (isMounted) {
        setNotifications(sortNotificationsByRecency(data));
        setIsLoading(false);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  function handleDismiss(notificationId: string) {
    setNotifications((prev) => dismissNotification(prev, notificationId));
  }

  return {
    notifications,
    unreadCount: countUnreadNotifications(notifications),
    isLoading,
    dismissNotification: handleDismiss,
  };
}

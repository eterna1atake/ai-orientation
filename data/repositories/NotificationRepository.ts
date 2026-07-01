import { NotificationEvent } from "@/domain/entities";
import { mockNotifications } from "@/data/mocks/mockDataStore";
import { withLatency } from "./delay";

export async function fetchNotifications(): Promise<NotificationEvent[]> {
  return withLatency(mockNotifications, 300);
}

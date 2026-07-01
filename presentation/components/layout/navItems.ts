import { LayoutDashboard, CalendarClock, Route, BotMessageSquare, LineChart } from "lucide-react";

export const NAV_ITEMS = [
  { label: "Dashboard", href: "/", icon: LayoutDashboard },
  { label: "Planner", href: "/planner", icon: CalendarClock },
  { label: "Roadmap", href: "/roadmap", icon: Route },
  { label: "Assistant", href: "/assistant", icon: BotMessageSquare },
  { label: "Analytics", href: "/analytics", icon: LineChart },
];

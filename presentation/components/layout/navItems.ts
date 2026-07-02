import {
  LayoutDashboard,
  CalendarClock,
  Route,
  BotMessageSquare,
  LineChart,
  BrainCircuit,
  BookOpen,
  CalendarRange,
  Gem,
  UserCircle,
} from "lucide-react";

export const NAV_ITEMS = [
  { label: "Dashboard", href: "/", icon: LayoutDashboard },
  { label: "Profile", href: "/profile", icon: UserCircle },
  { label: "Assessment", href: "/assessment", icon: BrainCircuit },
  { label: "Courses", href: "/course-selection", icon: BookOpen },
  { label: "Schedule", href: "/schedule-builder", icon: CalendarRange },
  { label: "Planner", href: "/planner", icon: CalendarClock },
  { label: "Roadmap", href: "/roadmap", icon: Route },
  { label: "Assistant", href: "/assistant", icon: BotMessageSquare },
  { label: "Analytics", href: "/analytics", icon: LineChart },
  { label: "Subscription", href: "/subscription", icon: Gem },
];

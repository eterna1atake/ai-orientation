"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { GraduationCap } from "lucide-react";
import { NAV_ITEMS } from "./navItems";

const SIDEBAR_LABELS: Record<string, string> = {
  "/": "Dashboard",
  "/planner": "Study Planner",
  "/roadmap": "Career & Skill Gap",
  "/assistant": "AI Assistant",
  "/analytics": "Analytics",
};

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-64 shrink-0 flex-col border-r border-slate-200 bg-white px-4 py-6 lg:flex">
      <div className="mb-8 flex items-center gap-2 px-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white">
          <GraduationCap className="h-5 w-5" />
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-900">AI Study Orientation</p>
          <p className="text-xs text-slate-400">Platform for Engineers</p>
        </div>
      </div>

      <nav className="flex flex-1 flex-col gap-1">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-indigo-50 text-indigo-700"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <Icon className="h-4.5 w-4.5" />
              {SIDEBAR_LABELS[item.href] ?? item.label}
            </Link>
          );
        })}
      </nav>

      <div className="rounded-xl bg-slate-50 p-4">
        <p className="text-xs font-medium text-slate-500">Current Project</p>
        <p className="mt-1 text-sm font-semibold text-slate-800">CED One-Stop Service</p>
        <p className="mt-1 text-xs text-slate-400">Next.js · Tailwind · MongoDB</p>
      </div>
    </aside>
  );
}

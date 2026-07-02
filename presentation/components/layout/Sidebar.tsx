"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GraduationCap, ChevronsLeft, ChevronsRight } from "lucide-react";
import { NAV_ITEMS } from "./navItems";

const SIDEBAR_LABELS: Record<string, string> = {
  "/": "Dashboard",
  "/profile": "Student Profile",
  "/assessment": "AI Assessment",
  "/course-selection": "Course Selection",
  "/schedule-builder": "Schedule Builder",
  "/planner": "Study Planner",
  "/roadmap": "Career & Skill Gap",
  "/assistant": "AI Assistant",
  "/analytics": "Analytics",
  "/subscription": "Subscription",
};

export function Sidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  function toggleCollapsed() {
    setIsCollapsed((prev) => !prev);
  }

  return (
    <aside
      className={`sticky top-0 hidden h-screen shrink-0 flex-col overflow-y-auto border-r border-slate-200 bg-white py-6 transition-[width] duration-200 lg:flex ${
        isCollapsed ? "w-20 px-2" : "w-64 px-4"
      }`}
    >
      <div className={`mb-8 flex items-center gap-2 ${isCollapsed ? "justify-center px-0" : "px-2"}`}>
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-white">
          <GraduationCap className="h-5 w-5" />
        </div>
        {!isCollapsed && (
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-slate-900">AI Study Orientation</p>
            <p className="truncate text-xs text-slate-400">Platform for Engineers</p>
          </div>
        )}
      </div>

      <nav className="flex flex-1 flex-col gap-1">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          const label = SIDEBAR_LABELS[item.href] ?? item.label;
          return (
            <Link
              key={item.href}
              href={item.href}
              title={isCollapsed ? label : undefined}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                isCollapsed ? "justify-center px-0" : ""
              } ${isActive ? "bg-indigo-50 text-indigo-700" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"}`}
            >
              <Icon className="h-4.5 w-4.5 shrink-0" />
              {!isCollapsed && <span className="truncate">{label}</span>}
            </Link>
          );
        })}
      </nav>

      {!isCollapsed && (
        <div className="rounded-xl bg-slate-50 p-4">
          <p className="text-xs font-medium text-slate-500">Current Project</p>
          <p className="mt-1 text-sm font-semibold text-slate-800">CED One-Stop Service</p>
          <p className="mt-1 text-xs text-slate-400">Next.js · Tailwind · MongoDB</p>
        </div>
      )}

      <button
        onClick={toggleCollapsed}
        aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        className={`mt-4 flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium text-slate-400 transition-colors hover:bg-slate-50 hover:text-slate-600 ${
          isCollapsed ? "justify-center px-0" : ""
        }`}
      >
        {isCollapsed ? <ChevronsRight className="h-4 w-4 shrink-0" /> : <ChevronsLeft className="h-4 w-4 shrink-0" />}
        {!isCollapsed && "Collapse"}
      </button>
    </aside>
  );
}

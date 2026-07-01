"use client";

import { useState } from "react";
import { Bell, GraduationCap, Menu } from "lucide-react";
import { useNavbar } from "@/presentation/hooks/useNavbar";
import { useNotifications } from "@/presentation/hooks/useNotifications";
import { NotificationDropdown } from "./NotificationDropdown";

export function Navbar() {
  const { student } = useNavbar();
  const { notifications, unreadCount, dismissNotification } = useNotifications();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 flex items-center justify-between border-b border-slate-200 bg-white/90 px-4 py-3 backdrop-blur sm:px-6">
      <div className="flex items-center gap-3 lg:hidden">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white">
          <GraduationCap className="h-4 w-4" />
        </div>
        <button className="text-slate-500" aria-label="Open menu">
          <Menu className="h-5 w-5" />
        </button>
      </div>

      <div className="hidden sm:block">
        <p className="text-sm font-semibold text-slate-900">
          Hi, {student?.nickname ?? "..."} 👋
        </p>
        <p className="text-xs text-slate-400">
          {student ? `Year ${student.year} · ${student.major} · ${student.university}` : "Loading..."}
        </p>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen((prev) => !prev)}
            className="relative flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition-colors hover:bg-slate-50"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-rose-500 px-1 text-[11px] font-semibold text-white">
                {unreadCount}
              </span>
            )}
          </button>
          <NotificationDropdown
            notifications={notifications}
            isOpen={isDropdownOpen}
            onClose={() => setIsDropdownOpen(false)}
            onDismiss={dismissNotification}
          />
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 text-sm font-semibold text-white">
          {student?.avatarInitials ?? "··"}
        </div>
      </div>
    </header>
  );
}

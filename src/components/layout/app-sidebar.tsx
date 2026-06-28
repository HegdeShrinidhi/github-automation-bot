"use client";

import Link from "next/link";
import {
  LayoutDashboard,
  FolderGit2,
  BellRing,
  Settings,
  GitBranch,
} from "lucide-react";

export function AppSidebar() {
  return (
    <aside className="w-64 border-r min-h-screen p-4">
      <h2 className="text-2xl font-bold mb-8">
        GitHub Bot
      </h2>

      <nav className="space-y-4">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 hover:text-blue-500"
        >
          <LayoutDashboard size={18} />
          Dashboard
        </Link>

        <Link
          href="/repositories"
          className="flex items-center gap-2 hover:text-blue-500"
        >
          <FolderGit2 size={18} />
          Repositories
        </Link>

        <Link
          href="/rules"
          className="flex items-center gap-2 hover:text-blue-500"
        >
          <GitBranch size={18} />
          Rules
        </Link>

        <Link
          href="/events"
          className="flex items-center gap-2 hover:text-blue-500"
        >
          <BellRing size={18} />
          Events
        </Link>

        <Link
          href="/settings"
          className="flex items-center gap-2 hover:text-blue-500"
        >
          <Settings size={18} />
          Settings
        </Link>
      </nav>
    </aside>
  );
}
"use client";

import Link from "next/link";
import {
  LayoutDashboard,
  FolderGit2,
  BellRing,
  Settings,
  GitBranch,
} from "lucide-react";
import LogoutButton from "./logout-button";

export function AppSidebar() {
  return (
    <aside className="flex min-h-screen w-64 flex-col border-r p-4">
      <div>
        <h2 className="mb-8 text-2xl font-bold">
          GitHub Bot
        </h2>

        <nav className="space-y-4">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 rounded-lg p-2 hover:bg-blue-100 hover:text-blue-600"
          >
            <LayoutDashboard size={18} />
            Dashboard
          </Link>

          <Link
            href="/repositories"
            className="flex items-center gap-2 rounded-lg p-2 hover:bg-blue-100 hover:text-blue-600"
          >
            <FolderGit2 size={18} />
            Repositories
          </Link>

          <Link
            href="/rules"
            className="flex items-center gap-2 rounded-lg p-2 hover:bg-blue-100 hover:text-blue-600"
          >
            <GitBranch size={18} />
            Rules
          </Link>

          <Link
            href="/events"
            className="flex items-center gap-2 rounded-lg p-2 hover:bg-blue-100 hover:text-blue-600"
          >
            <BellRing size={18} />
            Events
          </Link>

          <Link
            href="/settings"
            className="flex items-center gap-2 rounded-lg p-2 hover:bg-blue-100 hover:text-blue-600"
          >
            <Settings size={18} />
            Settings
          </Link>
        </nav>
      </div>

      <div className="mt-auto pt-6">
        <LogoutButton />
      </div>
    </aside>
  );
}
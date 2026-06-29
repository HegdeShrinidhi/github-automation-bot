"use client";

import { useEffect, useState } from "react";
import { FolderGit2, Bell, Settings2 } from "lucide-react";

interface DashboardCardsProps {
  repositoryCount: number;
}

export default function DashboardCards({
  repositoryCount,
}: DashboardCardsProps) {
  const [stats, setStats] = useState({
    repositories: repositoryCount,
    rules: 0,
    events: 0,
  });

  useEffect(() => {
    fetch("/api/dashboard")
      .then((res) => res.json())
      .then((data) =>
        setStats({
          repositories: repositoryCount,
          rules: data.rules,
          events: data.events,
        })
      );
  }, [repositoryCount]);

  return (
    <div className="grid gap-6 md:grid-cols-3">
      <div className="rounded-xl border bg-white p-6 shadow">
        <FolderGit2 className="mb-4 h-8 w-8 text-blue-600" />

        <h3 className="text-gray-500">
          Repositories
        </h3>

        <p className="text-4xl font-bold">
          {stats.repositories}
        </p>
      </div>

      <div className="rounded-xl border bg-white p-6 shadow">
        <Settings2 className="mb-4 h-8 w-8 text-purple-600" />

        <h3 className="text-gray-500">
          Rules
        </h3>

        <p className="text-4xl font-bold">
          {stats.rules}
        </p>
      </div>

      <div className="rounded-xl border bg-white p-6 shadow">
        <Bell className="mb-4 h-8 w-8 text-green-600" />

        <h3 className="text-gray-500">
          Events
        </h3>

        <p className="text-4xl font-bold">
          {stats.events}
        </p>
      </div>
    </div>
  );
}
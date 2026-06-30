"use client";

import { useEffect, useState } from "react";
import { AppSidebar } from "@/components/layout/app-sidebar";

interface AISummary {
  id: number;
  title: string;
  summary: string;
  repository: string;
  created_at: string;
}

export default function AISummariesPage() {
  const [summaries, setSummaries] =
    useState<AISummary[]>([]);
  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetch("/api/ai-summaries")
      .then((res) => res.json())
      .then((data) => {
        setSummaries(data);
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex">
      <AppSidebar />

      <main className="flex-1 p-8 space-y-6">
        <h1 className="text-4xl font-bold">
          🧠 AI Summaries
        </h1>

        {loading ? (
          <p>Loading...</p>
        ) : summaries.length === 0 ? (
          <div className="border rounded-lg p-6">
            No AI summaries yet.
          </div>
        ) : (
          summaries.map((item) => (
            <div
              key={item.id}
              className="border rounded-xl p-6 shadow"
            >
              <h2 className="text-xl font-semibold">
                {item.title}
              </h2>

              <p className="mt-4 text-gray-600">
                {item.summary}
              </p>

              <p className="mt-4 text-sm text-gray-500">
                Repository: {item.repository}
              </p>

              <p className="text-sm text-gray-500">
                {new Date(
                  item.created_at
                ).toLocaleString()}
              </p>
            </div>
          ))
        )}
      </main>
    </div>
  );
}
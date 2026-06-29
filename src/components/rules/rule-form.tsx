"use client";

import { useState } from "react";

export default function RuleForm() {
  const [event, setEvent] = useState("");
  const [action, setAction] = useState("");

  async function handleCreateRule() {
    if (!event || !action) return;

    const response = await fetch("/api/rules", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        event,
        action,
      }),
    });

    if (response.ok) {
      window.location.reload();
    }
  }

  return (
    <div className="mb-8 max-w-xl rounded-xl border bg-white p-6 shadow">
      <h2 className="mb-6 text-2xl font-bold">
        Create New Rule
      </h2>

      <div className="mb-4">
        <label className="mb-2 block font-medium">
          Event Type
        </label>

        <select
          className="w-full rounded border p-3"
          value={event}
          onChange={(e) => setEvent(e.target.value)}
        >
          <option value="">Select Event</option>
          <option value="Push Event">Push Event</option>
          <option value="Pull Request">
            Pull Request
          </option>
          <option value="Issue Opened">
            Issue Opened
          </option>
        </select>
      </div>

      <div className="mb-6">
        <label className="mb-2 block font-medium">
          Action
        </label>

        <select
          className="w-full rounded border p-3"
          value={action}
          onChange={(e) => setAction(e.target.value)}
        >
          <option value="">Select Action</option>
          <option value="Slack Notification">
            Slack Notification
          </option>
          <option value="Email Notification">
            Email Notification
          </option>
          <option value="AI Summary">
            AI Summary
          </option>
        </select>
      </div>

      <button
        onClick={handleCreateRule}
        className="rounded-lg bg-black px-5 py-3 text-white"
      >
        Create Rule
      </button>
    </div>
  );
}
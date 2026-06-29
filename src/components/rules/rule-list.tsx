"use client";

import { useEffect, useState } from "react";

interface Rule {
  id: number;
  event: string;
  action: string;
}

export default function RuleList() {
  const [rules, setRules] = useState<Rule[]>([]);

  useEffect(() => {
    fetch("/api/rules")
      .then((res) => res.json())
      .then((data) => setRules(data));
  }, []);

  return (
    <div className="mt-8 space-y-4">
      <h2 className="text-2xl font-bold">
        Saved Rules
      </h2>

      {rules.map((rule) => (
        <div
          key={rule.id}
          className="rounded-lg border p-4 shadow"
        >
          <p>
            <strong>IF:</strong> {rule.event}
          </p>

          <p>
            <strong>THEN:</strong> {rule.action}
          </p>
        </div>
      ))}
    </div>
  );
}
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  return Response.json({
    message: "GitHub webhook API working",
  });
}

export async function POST(request: Request) {
  const payload = await request.json();

  const event =
    request.headers.get("x-github-event") ||
    "manual-test";

  const repository =
    payload.repository?.name ||
    "github-automation-bot";

  const { data, error } = await supabase
    .from("events")
    .insert([
      {
        event,
        repository,
        status: "received",
      },
    ])
    .select();

console.log(data);
console.log(error);

console.log(
  "Slack URL exists:",
  !!process.env.SLACK_WEBHOOK_URL
);

try {
  const response = await fetch(
    process.env.SLACK_WEBHOOK_URL!,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: `🔔 GitHub Event Received

Repository: ${repository}
Event: ${event}

Status: received`,
      }),
    }
  );

  console.log(
    "Slack status:",
    response.status
  );

  const result = await response.text();

  console.log(
    "Slack response:",
    result
  );
} catch (err) {
  console.error(
    "Slack error:",
    err
  );
  }
}
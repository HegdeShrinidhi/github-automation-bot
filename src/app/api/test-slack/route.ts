import { NextResponse } from "next/server";

export async function GET() {
  console.log(
    "Slack URL exists:",
    !!process.env.SLACK_WEBHOOK_URL
  );

  const response = await fetch(
    process.env.SLACK_WEBHOOK_URL!,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: "🚀 Slack test from GitHub Automation Bot",
      }),
    }
  );

  const result = await response.text();

  console.log("Slack status:", response.status);
  console.log("Slack response:", result);

  return NextResponse.json({
    status: response.status,
    response: result,
  });
}
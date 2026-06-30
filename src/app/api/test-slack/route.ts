import { NextResponse } from "next/server";

export async function GET() {
  console.log(
    "Slack URL:",
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
        text: "🚀 Slack direct test",
      }),
    }
  );

  const result = await response.text();

  console.log("Status:", response.status);
  console.log("Response:", result);

  return NextResponse.json({
    status: response.status,
    result,
  });
}
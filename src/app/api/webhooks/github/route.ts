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

  // Save event to Supabase
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

  console.log("Data:", data);
  console.log("Error:", error);

  // -----------------------------
  // Slack Notification
  // -----------------------------
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

  // -----------------------------
  // Pull Request Comment
  // -----------------------------
  if (
    event === "pull_request" &&
    payload.action === "opened"
  ) {
    try {
      const owner =
        payload.repository.owner.login;

      const repo =
        payload.repository.name;

      const prNumber =
        payload.pull_request.number;

      const response = await fetch(
        `https://api.github.com/repos/${owner}/${repo}/issues/${prNumber}/comments`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
            Accept: "application/vnd.github+json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            body: `🤖 GitHub Automation Bot

Pull Request received successfully.

Slack notification sent successfully.`,
          }),
        }
      );

      console.log(
        "GitHub comment status:",
        response.status
      );
    } catch (err) {
      console.error(
        "GitHub comment error:",
        err
      );
    }
  }

  // -----------------------------
  // AI Summary for Issues
  // -----------------------------
  if (
    event === "issues" &&
    payload.action === "opened"
  ) {
    try {
      console.log("Issue event received");

      const owner =
        payload.repository.owner.login;

      const repo =
        payload.repository.name;

      const issueNumber =
        payload.issue.number;

      const issueTitle =
        payload.issue.title || "";

      const issueBody =
        payload.issue.body || "";

      console.log("Issue title:", issueTitle);
      console.log("Issue body:", issueBody);

      const aiResponse = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [
              {
                role: "system",
                content:
                  "You are a GitHub issue summarizer. Generate a short technical summary.",
              },
              {
                role: "user",
                content: `Title:
${issueTitle}

Description:
${issueBody}`,
              },
            ],
          }),
        }
      );

      const result =
        await aiResponse.json();

      console.log(
        "OpenAI response:",
        result
      );

      const summary =
        result.choices?.[0]?.message?.content ||
        "Unable to generate AI summary.";

      console.log(
        "Summary:",
        summary
      );

      const githubResponse = await fetch(
        `https://api.github.com/repos/${owner}/${repo}/issues/${issueNumber}/comments`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
            Accept: "application/vnd.github+json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            body: `🧠 AI Summary

${summary}`,
          }),
        }
      );

      console.log(
        "AI comment status:",
        githubResponse.status
      );
    } catch (err) {
      console.error(
        "AI summary error:",
        err
      );
    }
  }

  return NextResponse.json({
    success: true,
  });
}
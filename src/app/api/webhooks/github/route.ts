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

  return NextResponse.json({
    success: true,
  });
}
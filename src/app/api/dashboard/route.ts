import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  const { count: rulesCount } = await supabase
    .from("rules")
    .select("*", {
      count: "exact",
      head: true,
    });

  const { count: eventsCount } = await supabase
    .from("events")
    .select("*", {
      count: "exact",
      head: true,
    });

  return NextResponse.json({
    rules: rulesCount || 0,
    events: eventsCount || 0,
  });
}
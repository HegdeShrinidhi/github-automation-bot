import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  const { data, error } = await supabase
    .from("rules")
    .select("*")
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json(data);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { event, action } = body;

    console.log("Event:", event);
    console.log("Action:", action);

    const { data: testData, error: testError } =
      await supabase.from("rules").select("*");

    console.log("SELECT DATA:", testData);
    console.log("SELECT ERROR:", testError);

    const { data, error } = await supabase
      .from("rules")
      .insert([
        {
          event,
          action,
        },
      ])
      .select();

    console.log("Data:", data);
    console.log("Error:", error);

    console.log("Data:", data);
    console.log("Error:", error);

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
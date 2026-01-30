import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

// Use service-level client for public form submissions (bypasses RLS)
function getServiceClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { name, email, phone, nationality, source_form, ...rest } = body;

    if (!name || !email || !source_form) {
      return NextResponse.json(
        { error: "Name, email, and source_form are required" },
        { status: 400 }
      );
    }

    const supabase = getServiceClient();

    const { error } = await supabase.from("leads").insert({
      name,
      email,
      phone: phone || null,
      nationality: nationality || null,
      source: "website",
      source_form,
      status: "new",
      form_data: rest,
    });

    if (error) {
      console.error("Lead insert error:", error);
      return NextResponse.json({ error: "Failed to save" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}

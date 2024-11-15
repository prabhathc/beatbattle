import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    // Extract the query parameters from the URL
    const url = new URL(request.url);
    const accessToken = url.searchParams.get("access_token");
    const refreshToken = url.searchParams.get("refresh_token");

    if (!accessToken) {
      console.error("Access token is missing");
      return NextResponse.json({ error: "Access token is missing" }, { status: 400 });
    }

    const supabase = createRouteHandlerClient({ cookies });
    const { data, error } = await supabase.auth.setSession({
      access_token: accessToken,
      refresh_token: refreshToken || '',
    });

    if (error) {
      console.error("Error setting session:", error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    console.log("Session set successfully:", data);

    // Redirect to a clean URL after successfully setting the session
    return NextResponse.redirect(new URL("/", request.url));
  } catch (error) {
    console.error("Callback error:", error);
    return NextResponse.json({ error: "Authentication failed" }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { createMiddlewareClient } from "~/lib/supabase/actions";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    const response = new NextResponse();
    const supabase = createMiddlewareClient(request, response);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${request.nextUrl.origin}/api/auth/callback`,
        data: {
          email_verified: false,
        },
      },
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    const jsonResponse = NextResponse.json({
      user: data.user,
      session: data.session,
    });

    // Copy cookies from the middleware client response to our json response
    response.headers.forEach((value, key) => {
      if (key.toLowerCase() === "set-cookie") {
        jsonResponse.headers.set(key, value);
      }
    });

    return jsonResponse;
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// Handle OPTIONS for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Credentials": "true",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}

import { type CookieOptions, createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";
import type { Database } from "./types";

// Protected routes that require authentication
const PROTECTED_ROUTES = [
  "/profile",
  "/build-planner/create",
  "/api/user",
  "/api/builds/private"
];

// Auth routes that should redirect to home if already logged in
const AUTH_ROUTES = [
  "/auth/login",
  "/auth/signup",
  "/auth/reset-password"
];

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll().map(cookie => ({
            name: cookie.name,
            value: cookie.value,
          }));
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, ...options }) => {
            response.cookies.set({
              name,
              value,
              ...options,
              sameSite: "lax",
              httpOnly: true,
              secure: process.env.NODE_ENV === "production",
            });
          });
        },
      },
    }
  );

  try {
    // Refresh session if expired
    const { data: { session } } = await supabase.auth.getSession();

    const isProtectedPath = PROTECTED_ROUTES.some(path => 
      request.nextUrl.pathname.startsWith(path)
    );

    const isAuthRoute = AUTH_ROUTES.some(path => 
      request.nextUrl.pathname.startsWith(path)
    );

    // Handle protected routes
    if (isProtectedPath && !session) {
      const redirectUrl = new URL("/auth/login", request.url);
      redirectUrl.searchParams.set("next", request.nextUrl.pathname);
      return NextResponse.redirect(redirectUrl);
    }

    // Handle auth routes when already logged in
    if (session && isAuthRoute) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    // Add user ID to API request headers
    if (session && request.nextUrl.pathname.startsWith("/api/")) {
      request.headers.set("x-user-id", session.user.id);
    }

    return response;
  } catch (error) {
    console.error("Auth middleware error:", error);
    return response;
  }
}

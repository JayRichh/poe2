import { type CookieOptions, createServerClient } from "@supabase/ssr";

import { type NextRequest, NextResponse } from "next/server";

import type { Database } from "./types";

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
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          response.cookies.set({
            name,
            value,
            ...options,
            sameSite: "lax",
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
          });
        },
        remove(name: string, options: CookieOptions) {
          response.cookies.delete({
            name,
            ...options,
            sameSite: "lax",
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
          });
        },
      },
    }
  );

  // Refresh session if expired
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Protected routes that require authentication
  const protectedPaths = [
    "/profile",
    // Only protect build creation
    "/build-planner/create",
  ];

  const isProtectedPath = protectedPaths.some((path) => request.nextUrl.pathname.startsWith(path));

  // Auth routes that should redirect to home if already logged in
  const authRoutes = ["/auth/login", "/auth/signup", "/auth/reset-password"];
  const isAuthRoute = authRoutes.some((path) => request.nextUrl.pathname.startsWith(path));

  if (isProtectedPath && !session) {
    // Store the original URL to redirect back after login
    const redirectUrl = new URL("/auth/login", request.url);
    redirectUrl.searchParams.set("next", request.nextUrl.pathname);
    return NextResponse.redirect(redirectUrl);
  }

  if (session && isAuthRoute) {
    // Redirect to home if accessing auth routes while logged in
    return NextResponse.redirect(new URL("/", request.url));
  }

  return response;
}

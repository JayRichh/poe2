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

  // Check if this is a page reload by looking at the referer
  const isPageReload = request.headers.get("referer")?.includes(request.nextUrl.origin);
  
  // For protected paths, check auth state
  if (isProtectedPath) {
    // Check for existing session
    if (!session) {
      // For API routes or direct navigation, redirect to login
      if (request.nextUrl.pathname.startsWith('/api/') || !isPageReload) {
        const redirectUrl = new URL("/auth/login", request.url);
        redirectUrl.searchParams.set("next", request.nextUrl.pathname);
        return NextResponse.redirect(redirectUrl);
      }
      
      // For page reloads, let Next.js handle loading state
      return response;
    }
  }

  // Handle auth routes (login, signup, etc.)
  if (session && isAuthRoute) {
    // For API routes or direct navigation, redirect to home
    if (request.nextUrl.pathname.startsWith('/api/') || !isPageReload) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    
    // For page reloads, let Next.js handle loading state
    return response;
  }

  return response;
}

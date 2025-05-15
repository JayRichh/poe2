import { type NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

import { updateSession } from "./lib/supabase/middleware";

const RATE_LIMITS: Record<string, number> = {
  "/api/auth/login": 30,
  "/api/auth/signup": 10,
  "/api/auth/reset-password": 5,
  "/api/auth/refresh-token": 100,
  "/api/builds/": 300,
  "/api/search/": 200,
  "/api/user/": 100,
  "/api/webhooks/": 1000,
  "/api/revalidate/": 50,
  "/api/": 500,
  "/*": 2000,
};

const ALLOWED_ORIGINS = [
  "https://poe2.tools",
  "https://www.poe2.tools",
  process.env.NEXT_PUBLIC_SITE_URL,
  process.env.NODE_ENV === "development" ? "http://localhost:3000" : null,
].filter(Boolean) as string[];

const requestCounts = new Map<
  string,
  { count: number; timestamp: number }
>();

function getRateLimit(path: string) {
  return (
    Object.entries(RATE_LIMITS).find(([p]) => path.startsWith(p))?.[1] ??
    RATE_LIMITS["/*"]
  );
}

function checkRateLimit(request: NextRequest) {
  const id =
    request.headers.get("x-forwarded-for") ||
    request.headers.get("x-real-ip") ||
    new URL(request.url).host;

  const now = Date.now();
  const windowStart = now - 5 * 60_000;

  for (const [key, value] of requestCounts.entries()) {
    if (value.timestamp < windowStart) requestCounts.delete(key);
  }

  const current = requestCounts.get(id) ?? { count: 0, timestamp: now };
  if (current.timestamp < windowStart) {
    current.count = 0;
    current.timestamp = now;
  }
  current.count++;
  requestCounts.set(id, current);

  const limit = getRateLimit(request.nextUrl.pathname);
  const remaining = Math.max(limit - current.count, 0);
  const reset = Math.ceil((current.timestamp + 5 * 60_000 - now) / 1000);

  return {
    allowed: current.count <= limit,
    headers: {
      "X-RateLimit-Limit": limit.toString(),
      "X-RateLimit-Remaining": remaining.toString(),
      "X-RateLimit-Reset": reset.toString(),
    },
  };
}

function handleCORS(request: NextRequest, res: NextResponse) {
  const origin = request.headers.get("origin");
  if (origin && ALLOWED_ORIGINS.includes(origin))
    res.headers.set("Access-Control-Allow-Origin", origin);

  if (request.method === "OPTIONS") {
    res.headers.set("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
    res.headers.set(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization, X-CSRF-Token"
    );
    res.headers.set("Access-Control-Max-Age", "86400");
  }
  res.headers.set("Access-Control-Allow-Credentials", "true");
}

export async function middleware(request: NextRequest) {
  const nonce = crypto.randomBytes(16).toString("base64"); // new per-request nonce

  // OPTIONS pre-flight handled first
  let response = NextResponse.next();
  handleCORS(request, response);
  if (request.method === "OPTIONS") return response;

  // Rate-limit API + dynamic routes
  const { allowed, headers } = checkRateLimit(request);
  if (!allowed)
    return new NextResponse("Too Many Requests", {
      status: 429,
      headers: { ...headers, "Retry-After": headers["X-RateLimit-Reset"] },
    });

  // Auth/session handling (Supabase)
  response = await updateSession(request);

  Object.entries(headers).forEach(([k, v]) => response.headers.set(k, v));
  response.headers.set("x-nonce", nonce); // expose nonce to server components

  if (request.headers.get("accept")?.includes("text/html")) {
    const csp = [
      "object-src 'none'",
      // main fix → pass nonce, allow strict-dynamic, https/http fallback
      `script-src 'nonce-${nonce}' 'unsafe-inline' 'unsafe-eval' 'strict-dynamic' https: http:`,
      "base-uri 'none'",
    ].join("; ");
    response.headers.set("Content-Security-Policy", csp);
  }

  return response;
}

export const config = {
  matcher: [
    "/",
    "/auth/:path*",
    "/build-planner",
    "/guides/:path*",
    "/news/:path*",
    "/mechanics/:path*",
    "/profile",
    "/terms",
    "/privacy",
    "/((?!api|_next/static|_next/image|favicon.ico|build-planner/.*|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$|manifest\\.json|robots\\.txt|sitemap\\.xml|icon\\.svg).*)",
  ],
};

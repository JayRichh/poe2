import { type NextRequest, NextResponse } from "next/server";

import { updateSession } from "./lib/supabase/middleware";

// Rate limits per endpoint (requests per 5 minutes)
const RATE_LIMITS = {
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
].filter(Boolean);

const requestCounts = new Map<string, { count: number; timestamp: number }>();

function getRateLimit(path: string): number {
  return (
    Object.entries(RATE_LIMITS).find(([pattern]) => path.startsWith(pattern))?.[1] ||
    RATE_LIMITS["/*"]
  );
}

function checkRateLimit(request: NextRequest): {
  allowed: boolean;
  headers: Record<string, string>;
} {
  const identifier =
    request.headers.get("x-forwarded-for") ||
    request.headers.get("x-real-ip") ||
    new URL(request.url).host;

  const now = Date.now();
  const windowStart = now - 5 * 60 * 1000;

  for (const [key, value] of requestCounts.entries()) {
    if (value.timestamp < windowStart) requestCounts.delete(key);
  }

  const current = requestCounts.get(identifier) || { count: 0, timestamp: now };

  if (current.timestamp < windowStart) {
    current.count = 0;
    current.timestamp = now;
  }

  current.count++;
  requestCounts.set(identifier, current);

  const limit = getRateLimit(request.nextUrl.pathname);
  const remaining = Math.max(0, limit - current.count);
  const reset = Math.ceil((current.timestamp + 5 * 60 * 1000 - now) / 1000);

  return {
    allowed: current.count <= limit,
    headers: {
      "X-RateLimit-Limit": limit.toString(),
      "X-RateLimit-Remaining": remaining.toString(),
      "X-RateLimit-Reset": reset.toString(),
    },
  };
}

function handleCORS(request: NextRequest, response: NextResponse): void {
  const origin = request.headers.get("origin");

  if (origin && ALLOWED_ORIGINS.includes(origin)) {
    response.headers.set("Access-Control-Allow-Origin", origin);
  }

  if (request.method === "OPTIONS") {
    response.headers.set("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
    response.headers.set(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization, X-CSRF-Token"
    );
    response.headers.set("Access-Control-Max-Age", "86400");
  }

  response.headers.set("Access-Control-Allow-Credentials", "true");
}

export async function middleware(request: NextRequest) {
  let response = NextResponse.next();

  try {
    // Handle CORS
    handleCORS(request, response);
    if (request.method === "OPTIONS") return response;

    // Apply rate limiting for API and dynamic routes
    const { allowed, headers } = checkRateLimit(request);
    if (!allowed) {
      return new NextResponse("Too Many Requests", {
        status: 429,
        headers: { ...headers, "Retry-After": headers["X-RateLimit-Reset"] },
      });
    }
    Object.entries(headers).forEach(([key, value]) => {
      response.headers.set(key, value);
    });

    // Update auth session and handle protected routes
    response = await updateSession(request);

    // Add security headers for HTML responses
    if (request.headers.get("accept")?.includes("text/html")) {
      const securityHeaders = {
        "Content-Security-Policy": [
          "default-src 'self'",
          "script-src 'self' 'unsafe-inline' 'unsafe-eval' gc.zgo.at *.goatcounter.com *.vercel.live vercel.live",
          "style-src 'self' 'unsafe-inline'",
          "img-src 'self' data: https: blob: *.fextralife.com",
          "font-src 'self' data:",
          "connect-src 'self' https: wss:",
          "frame-ancestors 'none'",
          "base-uri 'self'",
          "form-action 'self'",
          "worker-src 'self' blob:",
          "manifest-src 'self'",
          "upgrade-insecure-requests",
        ].join("; "),
      };

      Object.entries(securityHeaders).forEach(([key, value]) => {
        response.headers.set(key, value);
      });
    }

    return response;
  } catch (error) {
    console.error("Middleware error:", error);
    return request.nextUrl.pathname.startsWith("/api/")
      ? NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
      : NextResponse.next();
  }
}

export const config = {
  matcher: [
    /*
     * Match specific routes that need middleware:
     * - Root pages
     * - Auth pages
     * - Build planner root (but not subroutes)
     * - Other top-level pages
     */
    "/",
    "/auth/:path*",
    "/build-planner",
    "/guides/:path*",
    "/news/:path*",
    "/mechanics/:path*",
    "/profile",
    "/terms",
    "/privacy",
    
    /*
     * Exclude:
     * - API routes
     * - Static assets
     * - Build planner subroutes
     * - Image files
     * - Manifest files
     */
    "/((?!api|_next/static|_next/image|favicon.ico|build-planner/.*|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$|manifest\\.json|robots\\.txt|sitemap\\.xml).*)",
  ],
};

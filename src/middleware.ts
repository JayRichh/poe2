import { NextResponse, type NextRequest } from "next/server";
import { createMiddlewareClient } from "~/lib/supabase/actions";

const PROTECTED_ROUTES = ["/profile", "/build-planner/create", "/api/user", "/api/builds/private"];

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
  "/*": 2000
};

const ALLOWED_ORIGINS = [
  "https://poe2.tools",
  "https://www.poe2.tools",
  process.env.NEXT_PUBLIC_SITE_URL,
  process.env.NODE_ENV === "development" ? "http://localhost:3000" : null
].filter(Boolean);

const requestCounts = new Map<string, { count: number; timestamp: number }>();

function getRateLimit(path: string): number {
  return Object.entries(RATE_LIMITS).find(([pattern]) => 
    path.startsWith(pattern)
  )?.[1] || RATE_LIMITS["/*"];
}

function checkRateLimit(request: NextRequest): { allowed: boolean; headers: Record<string, string> } {
  const identifier = request.headers.get("x-forwarded-for") || 
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
      "X-RateLimit-Reset": reset.toString()
    }
  };
}

function handleCORS(request: NextRequest, response: NextResponse): void {
  const origin = request.headers.get("origin");
  
  if (origin && ALLOWED_ORIGINS.includes(origin)) {
    response.headers.set("Access-Control-Allow-Origin", origin);
  }
  
  if (request.method === "OPTIONS") {
    response.headers.set("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
    response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization, X-CSRF-Token");
    response.headers.set("Access-Control-Max-Age", "86400");
  }
  
  response.headers.set("Access-Control-Allow-Credentials", "true");
}

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  
  try {
    // Handle CORS
    handleCORS(request, response);
    if (request.method === "OPTIONS") return response;

    // Apply rate limiting for API and dynamic routes
    const { allowed, headers } = checkRateLimit(request);
    if (!allowed) {
      return new NextResponse("Too Many Requests", {
        status: 429,
        headers: { ...headers, "Retry-After": headers["X-RateLimit-Reset"] }
      });
    }
    Object.entries(headers).forEach(([key, value]) => {
      response.headers.set(key, value);
    });

    // Handle auth for protected routes
    const needsAuth = PROTECTED_ROUTES.some(path => 
      request.nextUrl.pathname.startsWith(path)
    );

    if (needsAuth) {
      const supabase = createMiddlewareClient(request, response);
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        const redirectUrl = new URL("/auth/login", request.url);
        redirectUrl.searchParams.set("next", request.nextUrl.pathname);
        return NextResponse.redirect(redirectUrl);
      }
      
      if (request.nextUrl.pathname.startsWith("/api/")) {
        request.headers.set("x-user-id", session.user.id);
      }
    }

    // Add security headers for HTML responses
    const acceptHeader = request.headers.get("accept") || "";
    if (acceptHeader.includes("text/html")) {
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
          "upgrade-insecure-requests"
        ].join("; ")
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
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};

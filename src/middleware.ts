import { type NextRequest, NextResponse } from "next/server";
import { createMiddlewareClient } from "~/lib/supabase/actions";

const PROTECTED_ROUTES = ["/profile", "/build-planner/create"];
const AUTH_ROUTES = ["/auth/login", "/auth/signup", "/auth/callback", "/auth/reset-password"];

// Rate limiting configuration
const RATE_LIMIT = 100; // requests
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute in ms

// Store request counts with timestamp
const requestCounts = new Map<string, { count: number; timestamp: number }>();

// Clean up old entries every hour
setInterval(() => {
  const now = Date.now();
  for (const [key, value] of requestCounts.entries()) {
    if (now - value.timestamp > RATE_LIMIT_WINDOW) {
      requestCounts.delete(key);
    }
  }
}, 60 * 60 * 1000);

function checkRateLimit(request: NextRequest): { allowed: boolean; headers: Record<string, string> } {
  // Use forwarded header or request url as identifier
  const identifier = request.headers.get("x-forwarded-for") || 
                    request.headers.get("x-real-ip") || 
                    new URL(request.url).host;
                    
  const now = Date.now();
  const windowStart = now - RATE_LIMIT_WINDOW;
  
  // Get or create rate limit data
  const current = requestCounts.get(identifier) || { count: 0, timestamp: now };
  
  // Reset if outside window
  if (current.timestamp < windowStart) {
    current.count = 0;
    current.timestamp = now;
  }
  
  // Increment count
  current.count++;
  requestCounts.set(identifier, current);
  
  // Calculate remaining
  const remaining = Math.max(0, RATE_LIMIT - current.count);
  const reset = Math.ceil((current.timestamp + RATE_LIMIT_WINDOW - now) / 1000);
  
  return {
    allowed: current.count <= RATE_LIMIT,
    headers: {
      "X-RateLimit-Limit": RATE_LIMIT.toString(),
      "X-RateLimit-Remaining": remaining.toString(),
      "X-RateLimit-Reset": reset.toString()
    }
  };
}

export async function middleware(request: NextRequest) {
  // Apply rate limiting except for static assets
  if (
    !request.nextUrl.pathname.startsWith("/_next") &&
    !request.nextUrl.pathname.startsWith("/static")
  ) {
    const { allowed, headers } = checkRateLimit(request);
    if (!allowed) {
      return new NextResponse("Too Many Requests", {
        status: 429,
        headers: {
          ...headers,
          "Retry-After": headers["X-RateLimit-Reset"]
        }
      });
    }
  }

  // Early return for static assets and API routes
  if (
    request.nextUrl.pathname.startsWith("/_next") ||
    request.nextUrl.pathname.startsWith("/api") ||
    request.nextUrl.pathname.startsWith("/static")
  ) {
    return NextResponse.next();
  }

  const response = NextResponse.next();

  // Skip auth check for auth routes
  const isAuthRoute = AUTH_ROUTES.some((path) => request.nextUrl.pathname.startsWith(path));
  if (isAuthRoute) {
    return response;
  }

  try {
    const supabase = createMiddlewareClient(request, response);

    const {
      data: { session },
    } = await supabase.auth.getSession();

    // Only protect specific routes
    if (PROTECTED_ROUTES.some((path) => request.nextUrl.pathname.startsWith(path)) && !session) {
      const redirectUrl = new URL("/api/auth/login", request.url);
      redirectUrl.searchParams.set("next", request.nextUrl.pathname);
      return NextResponse.redirect(redirectUrl);
    }

    // Add security headers
    const securityHeaders = {
      "X-DNS-Prefetch-Control": "on",
      "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
      "X-Frame-Options": "SAMEORIGIN",
      "X-Content-Type-Options": "nosniff",
      "Referrer-Policy": "strict-origin-when-cross-origin",
      "Permissions-Policy": "camera=(), microphone=(), geolocation=(), interest-cohort=()",
      "X-XSS-Protection": "1; mode=block",
      "Content-Security-Policy": [
        "default-src 'self'",
        "script-src 'self' 'unsafe-inline' 'unsafe-eval' gc.zgo.at *.goatcounter.com",
        "style-src 'self' 'unsafe-inline'",
        "img-src 'self' data: https:",
        "font-src 'self' data:",
        "connect-src 'self' https:",
        "frame-ancestors 'none'",
        "base-uri 'self'",
        "form-action 'self'",
        "upgrade-insecure-requests"
      ].join("; ")
    };

    Object.entries(securityHeaders).forEach(([key, value]) => {
      response.headers.set(key, value);
    });

    return response;
  } catch (error) {
    console.error("Auth middleware error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export const config = {
  matcher: [
    // Skip static files and API routes
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};

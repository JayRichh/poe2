import { NextResponse, type NextRequest } from "next/server";
import { createMiddlewareClient } from "~/lib/supabase/actions";

// Core protected routes requiring auth
const PROTECTED_ROUTES = [
  "/profile",
  "/build-planner/create",
  "/api/user",
  "/api/builds/private"
];

// Auth-related routes with special handling
const AUTH_ROUTES = [
  "/auth/login",
  "/auth/signup",
  "/auth/callback",
  "/auth/reset-password",
  "/auth/refresh-token"
];

// API rate limits per 5 minutes with granular control
const RATE_LIMITS = {
  // Auth endpoints - strict limits
  "/api/auth/login": 30,
  "/api/auth/signup": 10,
  "/api/auth/reset-password": 5,
  "/api/auth/refresh-token": 100,
  
  // API endpoints by type
  "/api/builds/": 300,      // Build planner operations
  "/api/search/": 200,      // Search operations
  "/api/user/": 100,        // User profile operations
  "/api/webhooks/": 1000,   // Webhook endpoints
  "/api/revalidate/": 50,   // Cache revalidation
  
  // General API fallback
  "/api/": 500,
  
  // Public routes
  "/*": 2000
};

// CORS allowed origins
const ALLOWED_ORIGINS = [
  "https://poe2.tools",
  "https://www.poe2.tools",
  process.env.NEXT_PUBLIC_SITE_URL,
  process.env.NODE_ENV === "development" ? "http://localhost:3000" : null
].filter(Boolean);

// Store request counts with timestamp using a LRU cache pattern
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
  const windowStart = now - 5 * 60 * 1000; // 5 minutes
  
  // Clean up old entries
  for (const [key, value] of requestCounts.entries()) {
    if (value.timestamp < windowStart) {
      requestCounts.delete(key);
    }
  }
  
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
  
  // Get limit based on path
  const limit = getRateLimit(request.nextUrl.pathname);
  
  // Calculate remaining
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
  
  // Allow specified origins
  if (origin && ALLOWED_ORIGINS.includes(origin)) {
    response.headers.set("Access-Control-Allow-Origin", origin);
  }
  
  // Handle preflight
  if (request.method === "OPTIONS") {
    response.headers.set("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
    response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization, X-CSRF-Token");
    response.headers.set("Access-Control-Max-Age", "86400"); // 24 hours
  }
  
  response.headers.set("Access-Control-Allow-Credentials", "true");
}

export async function middleware(request: NextRequest) {
  // 1. Skip static files and public assets completely
  if (
    request.nextUrl.pathname.match(/\.(ico|png|jpg|jpeg|svg|css|js|woff2?|json|xml)$/) ||
    request.nextUrl.pathname.startsWith("/_next/") ||
    request.nextUrl.pathname.startsWith("/static/") ||
    request.nextUrl.pathname === "/robots.txt" ||
    request.nextUrl.pathname === "/sitemap.xml" ||
    request.nextUrl.pathname === "/manifest.json"
  ) {
    return NextResponse.next();
  }

  // Initialize response early for CORS
  const response = NextResponse.next();
  
  // 2. Handle CORS for all requests
  handleCORS(request, response);
  
  // 3. Handle preflight requests
  if (request.method === "OPTIONS") {
    return response;
  }

  try {
    // 4. Apply rate limiting except for static assets
    if (!request.nextUrl.pathname.startsWith("/_next")) {
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
      
      // Add rate limit headers to response
      Object.entries(headers).forEach(([key, value]) => {
        response.headers.set(key, value);
      });
    }

    // 5. Handle auth for protected routes
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
      
      // Add user context for API routes
      if (request.nextUrl.pathname.startsWith("/api/")) {
        request.headers.set("x-user-id", session.user.id);
      }
    }

    // 6. Add security headers for HTML responses
    const acceptHeader = request.headers.get("accept") || "";
    if (acceptHeader.includes("text/html")) {
      const securityHeaders = {
        "Content-Security-Policy": [
          "default-src 'self'",
          "script-src 'self' 'unsafe-inline' 'unsafe-eval' gc.zgo.at *.goatcounter.com *.vercel.live vercel.live",
          "style-src 'self' 'unsafe-inline'",
          "img-src 'self' data: https: blob:",
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
    
    // Return error response for API routes
    if (request.nextUrl.pathname.startsWith("/api/")) {
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
      );
    }
    
    // Continue for non-API routes
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    // Protected API routes
    "/api/user/:path*",
    "/api/builds/private/:path*",
    
    // Auth routes
    "/auth/:path*",
    
    // Protected app routes
    "/profile/:path*",
    "/build-planner/create/:path*",
    
    // API routes needing rate limiting
    "/api/:path*",
    
    // Exclude static files and public assets
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|manifest.json).*)"
  ]
};

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  distDir: ".next",
  output: "standalone",
  trailingSlash: false,
  async redirects() {
    return [
      // Essential redirects only
      {
        source: '/index',
        destination: '/',
        permanent: true,
      },
      {
        source: '/builds/:path*',
        destination: '/build-planner/:path*',
        permanent: true,
      },
      {
        source: '/rss',
        destination: '/feed.xml',
        permanent: true,
      }
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "github.com",
        port: "",
        pathname: "*",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        port: "",
        pathname: "**",
      },
    ],
    formats: ["image/webp"],
    minimumCacheTTL: 3600, // 1 hour minimum cache
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    dangerouslyAllowSVG: true, // Required for shimmer effect
  },
  experimental: {
    optimizeCss: true,
    scrollRestoration: true,
    serverActions: {
      bodySizeLimit: "2mb",
      allowedFormDataKeys: [
        'name',
        'description',
        'poe_class',
        'level',
        'visibility',
        'equipment',
        'skill_gems',
        'build_configs',
        'stats',
        'notes'
      ],
      allowedOrigins: ['same-origin'],
      acceptedContentTypes: [
        'application/json',
        'text/plain',
        'multipart/form-data'
      ]
    },
    optimisticClientCache: true,
  },
  async headers() {
    return [
      {
        source: "/skill-tree.png",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, must-revalidate",
          },
          {
            key: "Vary",
            value: "Accept",
          },
        ],
      },
      {
        source: "/ascendancies/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, must-revalidate",
          },
          {
            key: "Vary",
            value: "Accept",
          },
        ],
      },
      {
        source: "/:path*",
        headers: [
          {
            key: "Permissions-Policy",
            value: "storage-access=self",
          },
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
          {
            key: "Content-Security-Policy",
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https:; frame-ancestors 'none'; base-uri 'self'; form-action 'self'; upgrade-insecure-requests;"
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block"
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;

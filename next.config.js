/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  distDir: ".next",
  output: "standalone",
  trailingSlash: false,
  async redirects() {
    return [
      // Handle www to non-www first
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.poe2.dev',
          },
        ],
        destination: {
          protocol: 'https',
          hostname: 'poe2.dev',
          pathname: '/:path*',
        },
        permanent: true,
      },
      // Redirect trailing slashes
      {
        source: '/:path+/',
        destination: '/:path+',
        permanent: true,
      },
      // Redirect /index to /
      {
        source: '/index',
        destination: '/',
        permanent: true,
      },
      // Redirect old build URLs to new format
      {
        source: '/builds/:path*',
        destination: '/build-planner/:path*',
        permanent: true,
      },
      // Redirect lowercase ascendancy names
      {
        source: '/ascendancies/:name',
        destination: '/ascendancies/:name',
        permanent: true,
        has: [
          {
            type: 'query',
            key: 'name',
            value: '(?i)^(titan|acolyte|bloodmage|chronomancer|deadeye|gemling|infernalist|invoker|pathfinder|stormweaver|warbringer|witchhunter)$'
          }
        ]
      },
      // Handle RSS feed URLs
      {
        source: '/rss',
        destination: '/feed.xml',
        permanent: true,
      },
      {
        source: '/rss.xml',
        destination: '/feed.xml',
        permanent: true,
      },
      {
        source: '/atom.xml',
        destination: '/feed.xml',
        permanent: true,
      }
    ];
  },
  async rewrites() {
    return {
      beforeFiles: [
        // Handle /build-planner/skills as a special case
        {
          source: '/build-planner/skills',
          destination: '/build-planner/skills/page',
        }
      ]
    };
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

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  distDir: ".next",
  output: "standalone",
  trailingSlash: false,
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
    reactRemoveProperties: process.env.NODE_ENV === "production",
  },
  async redirects() {
    return [
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
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        port: "",
        pathname: "**",
      },
    ],
    formats: ["image/webp"],
    minimumCacheTTL: 300,
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128],
    dangerouslyAllowSVG: true,
  },
  modularizeImports: {
    '@nivo/core': {
      transform: '@nivo/core/dist/{{member}}',
      preventFullImport: true
    },
    '@nivo/line': {
      transform: '@nivo/line/dist/{{member}}',
      preventFullImport: true
    }
  },
  experimental: {
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
      ]
    },
  },
  async headers() {
    return [
      {
        source: "/skill-tree.png",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=604800",
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
            value: "public, max-age=86400, stale-while-revalidate=604800",
          },
          {
            key: "Vary",
            value: "Accept",
          },
        ],
      }
    ];
  },
};

module.exports = nextConfig;

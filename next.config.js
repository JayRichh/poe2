const crypto = require("crypto");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  distDir: ".next",
  output: "standalone",
  trailingSlash: false,
  poweredByHeader: false,
  compress: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
    reactRemoveProperties: process.env.NODE_ENV === "production",
  },
  async redirects() {
    return [
      {
        source: "/index",
        destination: "/",
        permanent: true,
      },
      {
        source: "/builds/:path*",
        destination: "/build-planner/:path*",
        permanent: true,
      },
      {
        source: "/rss",
        destination: "/feed.xml",
        permanent: true,
      },
      {
        source: "/dps-calc",
        destination: "/calculators/dps",
        permanent: true,
      },
      {
        source: "/currency-calc",
        destination: "/calculators/currency",
        permanent: true,
      },
      {
        source: "/speed-calc",
        destination: "/calculators/speed",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "jcumrdfiiuggbwuqcrer.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/**",
      },
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
      {
        protocol: "https",
        hostname: "pathofexile2.wiki.fextralife.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "web.poecdn.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.poe2db.tw",
        port: "",
        pathname: "/**",
      },
    ],
    formats: ["image/webp"],
    minimumCacheTTL: 31536000,
    deviceSizes: [320, 480, 640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    dangerouslyAllowSVG: true,
  },
  modularizeImports: {
    "@nivo/core": {
      transform: "@nivo/core/dist/{{member}}",
      preventFullImport: true,
    },
    "@nivo/line": {
      transform: "@nivo/line/dist/{{member}}",
      preventFullImport: true,
    },
  },
  experimental: {
    optimizeCss: true,
    optimizePackageImports: [
      "@nivo/core",
      "@nivo/line",
      "@nivo/bar",
      "@nivo/pie",
      "lucide-react",
      "@uiw/react-md-editor",
      "framer-motion",
    ],
    serverActions: {
      bodySizeLimit: "2mb",
    },
    turbo: {
      moduleIdStrategy: "deterministic",
      resolveExtensions: [".tsx", ".ts", ".jsx", ".js", ".json", ".mdx"],
      resolveAlias: {
        // Add any module aliases if needed
      },
    },
  },
  webpack: (config, { isServer, dev }) => {
    if (!isServer && !dev) {
      config.optimization.splitChunks = {
        chunks: "all",
        minSize: 20000,
        maxSize: 20000,
        cacheGroups: {
          default: false,
          vendors: false,
          framework: {
            chunks: "all",
            name: "framework",
            test: /[\\/]node_modules[\\/](react|react-dom|scheduler)[\\/]/,
            priority: 40,
            enforce: true,
            reuseExistingChunk: true,
          },
          commons: {
            name: "commons",
            chunks: "all",
            minChunks: 2,
            priority: 20,
            reuseExistingChunk: true,
          },
          lib: {
            test(module) {
              return (
                module.size() > 20000 &&
                /node_modules[/\\]/.test(module.identifier()) &&
                !/node_modules[/\\](@nivo|framer-motion|@uiw)/.test(module.identifier())
              );
            },
            name(module) {
              const hash = crypto.createHash("sha1");
              hash.update(module.identifier());
              return `lib-${hash.digest("hex").substring(0, 8)}`;
            },
            priority: 30,
            minChunks: 1,
            reuseExistingChunk: true,
          },
          nivo: {
            test: /[\\/]node_modules[\\/](@nivo)[\\/]/,
            name: "nivo-charts",
            chunks: "async",
            priority: 35,
            enforce: true,
          },
          framerMotion: {
            test: /[\\/]node_modules[\\/](framer-motion)[\\/]/,
            name: "framer-motion",
            chunks: "async",
            priority: 35,
            enforce: true,
          },
          mdEditor: {
            test: /[\\/]node_modules[\\/](@uiw)[\\/]/,
            name: "md-editor",
            chunks: "async",
            priority: 35,
            enforce: true,
          },
        },
      };
    }
    return config;
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { 
            key: "Content-Security-Policy",
            value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https:; font-src 'self'; frame-src 'self' https://vercel.live/; connect-src 'self' https:;"
          }
        ],
      },
      {
        source: "/data/:path*",
        headers: [
          { key: "Cache-Control", value: "no-store, must-revalidate" },
        ],
      },
      {
        source: "/:path*((?!data/).)*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000" },
        ],
      },
    ];
  }
};

module.exports = nextConfig;

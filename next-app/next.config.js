// import nextBundleAnalyzer from "@next/bundle-analyzer"
// import withPlugins from "next-compose-plugins"
import createNextIntlPlugin from "next-intl/plugin"

// const withBundleAnalyzer = nextBundleAnalyzer({
//   enabled: true,
//   openAnalyzer: true,
// })

/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js")

/** @type {import("next").NextConfig} */
const nextConfig = {
  experimental: {
    // ppr: true,
    reactCompiler: {
      compilationMode: "annotation",
    },
  },
  images: {
    remotePatterns: [
      {
        // protocol: "https",
        protocol: "https",
        hostname: "**",
      },
      {
        // protocol: "https",
        protocol: "http",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
    ],
  },
  // Already doing linting and typechecking as separate tasks in CI
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: false },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
      {
        source: "/sw.js",
        headers: [
          {
            key: "Content-Type",
            value: "application/javascript; charset=utf-8",
          },
          {
            key: "Cache-Control",
            value: "no-cache, no-store, must-revalidate",
          },
          {
            key: "Content-Security-Policy",
            value: "default-src 'self'; script-src 'self'",
          },
        ],
      },
    ]
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    })
    return config
  },
}

const withNextIntl = createNextIntlPlugin()

// export default withPlugins([
//   [withBundleAnalyzer],
//   withNextIntl,
//   // your other plugins here
// ])

export default withNextIntl(nextConfig)

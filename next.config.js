/** @type {import('next').NextConfig} */
module.exports = {
  eslint: {
    ignoreDuringBuilds: false,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  distDir: "/dist",
  images: {
    minimumCacheTTL: 900,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "0.gravatar.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
}

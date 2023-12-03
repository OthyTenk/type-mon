export default {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: false,
  },
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
};

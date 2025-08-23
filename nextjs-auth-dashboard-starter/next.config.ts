import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["randomuser.me"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "randomuser.me",
      },
    ],
  },
};

export default nextConfig;

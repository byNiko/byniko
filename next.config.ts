import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL('https://images.ctfassets.net/23pc8vl6lelg/**')],
  },
  /* config options here */
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ['three'],
  images: {
    domains: [],
  },
};

export default nextConfig;

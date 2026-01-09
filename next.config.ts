import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Vercel handles builds automatically. We remove 'output: export' 
     to ensure API routes and the Admin panel work correctly. */
  images: {
    unoptimized: true,
  },
  // Ensure we can use fs
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = { fs: false };
    }
    return config;
  }
};

export default nextConfig;

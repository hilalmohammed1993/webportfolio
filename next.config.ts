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
  },
  // Setting an empty turbopack config to silence the conflict error
  // while keeping the custom webpack config for client-side polyfills.
  // @ts-ignore - Turbopack type may not be in all versions but satisfies the build error
  turbopack: {},
};

export default nextConfig;

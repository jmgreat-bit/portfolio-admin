import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/keystatic',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

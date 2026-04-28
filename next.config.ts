import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export — generates /out folder, upload directly to shared hosting
  output: "export",
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  // Image optimization requires a server — disable for static hosting
  images: {
    unoptimized: true,
  },
};

export default nextConfig;

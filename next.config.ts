import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  outputFileTracingRoot: path.join(process.cwd()),
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion", "@react-three/drei"]
  }
};

export default nextConfig;

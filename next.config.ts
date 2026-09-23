import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  ...(process.env.CAFE21_STATIC_EXPORT === "1"
    ? { output: "export" as const, trailingSlash: true, images: { unoptimized: true } }
    : {}),
};

export default nextConfig;

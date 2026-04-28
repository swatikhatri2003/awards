import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export so plain HTML/CSS/JS can be uploaded to nginx
  output: "export",
  // Output build artifacts to ./build instead of the default ./.next
  distDir: "build",
  // App is hosted under /awards_f on nginx
  basePath: "/awards_f",
  assetPrefix: "/awards_f",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;

import type { NextConfig } from "next";
import path from "path";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  // Production is exported and hosted under /awards_f on nginx.
  // In dev, keep defaults so routes work at http://localhost:3000/<route>
  // and Turbopack can use its normal cache directory.
  output: isProd ? "export" : undefined,
  distDir: isProd ? "build" : undefined,
  basePath: isProd ? "/awards_f" : undefined,
  assetPrefix: isProd ? "/awards_f" : undefined,
  trailingSlash: isProd ? true : undefined,
  images: { unoptimized: true },
  // Pin the workspace root so Turbopack does not auto-pick a parent folder.
  turbopack: {
    root: path.join(__dirname),
  },
  // Allow HMR/fonts when opening the dev server via LAN IP (e.g. from a phone).
  allowedDevOrigins: isProd ? undefined : ["192.168.29.94"],
  // Proxy /api to the local backend in dev (same-origin fallback + LAN access).
  rewrites: isProd
    ? undefined
    : async () => [
        {
          source: "/api/:path*",
          destination: "http://127.0.0.1:4000/api/:path*",
        },
      ],
};

export default nextConfig;

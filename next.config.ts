import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root to this folder so Turbopack doesn't pick up a
  // stray lockfile elsewhere on the machine.
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;

import type { NextConfig } from "next";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  env: {
    NEXT_PUBLIC_INTRO_VIDEO_VERSION: createHash("sha256")
      .update(readFileSync(join(process.cwd(), "public/assets/guanmo-intro.mp4")))
      .digest("hex").slice(0, 12),
  },
  images: { unoptimized: true },
};

export default nextConfig;

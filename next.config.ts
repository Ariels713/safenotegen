import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_SLACK_WEBHOOK_URL: process.env.NEXT_PUBLIC_SLACK_WEBHOOK_URL,
  },
};

export default nextConfig;

import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import bundleAnalyzer from "@next/bundle-analyzer";

const withNextIntl = createNextIntlPlugin();

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "export",
  // TODO: Investigate if Next.js Image Optimization can be enabled.
  // This is currently disabled due to issues with deploying to a static export environment or specific hosting platform.
  // Enabling it could improve image loading performance if the compatibility issues are resolved.
  images: { unoptimized: true },
  trailingSlash: true,
  turbopack: {},
};

export default withBundleAnalyzer(withNextIntl(nextConfig));

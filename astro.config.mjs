// @ts-check
import { defineConfig, fontProviders } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import mdx from "@astrojs/mdx";
import cloudflare from "@astrojs/cloudflare";

// 本番環境（ビルド時など）かどうかを判定
const isProduction = process.env.NODE_ENV === "production";

// https://astro.build/config
export default defineConfig({
  fonts: [
    {
      provider: fontProviders.google(),
      name: "Orbitron",
      cssVariable: "--font-orbitron",
    },
    {
      provider: fontProviders.google(),
      name: "Chakra Petch",
      cssVariable: "--font-chakrapetch",
    },
    {
      provider: fontProviders.google(),
      name: "IBM Plex Sans JP",
      cssVariable: "--font-ibm-plex-sans-jp",
    },
  ],

  i18n: {
    defaultLocale: "ja",
    locales: ["ja", "en"],
    routing: {
      prefixDefaultLocale: true,
    },
  },

  output: "static",

  prefetch: {
    prefetchAll: true,
    defaultStrategy: "hover",
  },

  // 統合（integrations）にまとめる
  integrations: [react(), mdx()],

  vite: {
    plugins: [tailwindcss()], // Viteプラグインとして指定
  },

  // 本番ビルド時のみ cloudflare アダプターを設定し、ローカル開発時は undefined にする
  adapter: isProduction
    ? cloudflare({
        prerenderEnvironment: "node",
        imageService: "compile",
      })
    : undefined,
});

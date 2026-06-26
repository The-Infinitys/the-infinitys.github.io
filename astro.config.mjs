// @ts-check
import { defineConfig, fontProviders } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
// https://astro.build/config
export default defineConfig({
  fonts: [
    {
      provider: fontProviders.google(),
      name: "Orbitron",
      cssVariable: "--font-orbitron",
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
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()], // Viteプラグインとして指定
  },
});

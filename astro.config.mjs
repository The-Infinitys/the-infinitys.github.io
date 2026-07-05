// @ts-check
import { defineConfig, fontProviders } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import mdx from "@astrojs/mdx";
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
});

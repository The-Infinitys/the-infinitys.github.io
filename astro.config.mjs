// @ts-check
import { defineConfig, fontProviders } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import mdx from "@astrojs/mdx";
import cloudflare from "@astrojs/cloudflare";

// HTML圧縮用のプラグイン
import { ViteMinifyPlugin } from "vite-plugin-minify";

export default defineConfig({
  // パフォーマンス：フォントはプリコネクトさせることでLCPを改善
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
    routing: { prefixDefaultLocale: true },
  },

  // 画像の処理を最適化（Cloudflareアダプターと相性が良い設定）
  image: {
    service: { entrypoint: "astro/assets/services/noop" },
  },

  prefetch: { prefetchAll: true, defaultStrategy: "hover" },

  integrations: [react(), mdx()],

  vite: {
    plugins: [
      tailwindcss(),
      // HTMLの圧縮（空白削除、コメント除去など）
      ViteMinifyPlugin({
        removeComments: true,
        collapseWhitespace: true,
      }),
    ],
    build: {
      // PostCSSよりも高速で強力なLightningCSSを採用
      cssMinify: "lightningcss",
      rollupOptions: {
        output: {
          manualChunks: {
            // 主要ライブラリをチャンク分割して初回ロードを軽量化
            react: ["react", "react-dom"],
          },
        },
      },
    },
  },

  // 本番ビルド時のみCloudflareアダプターを適用
  adapter: process.env.NODE_ENV === "production" ? cloudflare() : undefined,
});

import { glob } from "astro/loaders";
import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import path from "node:path";
import fs from "node:fs";

const articles = defineCollection({
  loader: {
    name: "article-loader",
    load: async (context) => {
      // 1. 元のglobローダーを実行してデータを取得
      // ここで指定する loader の base はプロジェクトルート基準です
      await glob({
        pattern: "**/[^_]*.mdx",
        base: "./src/contents/articles",
      }).load(context);

      // 2. context.store を使ってデータを直接操作する
      // context.store は内部的にデータのキーと値を持つオブジェクトです
      for (const entry of context.store.values()) {
        const dirPath = path.join("src/contents/articles", path.dirname(entry.id));

        const folderFiles = fs.existsSync(dirPath) ? fs.readdirSync(dirPath) : [];
        const match = folderFiles.find((file) => file.startsWith("preview."));

        if (match) {
          // entry.data を直接書き換える
          entry.data.previewImage = `./${path.join(dirPath, match)}`;
        }
      }
    },
  },
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      previewImage: image().optional(),
    }),
});

export const collections = { articles };

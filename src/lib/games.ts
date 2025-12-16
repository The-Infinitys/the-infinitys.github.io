// src/lib/games.ts

import fs from "fs";
import path from "path";

export interface Game {
  id: string;
  title: string;
  description: string;
  link: string;
  thumbnail?: string; // Optional thumbnail
}

export function getGames(): Game[] {
  const gamesFilePath = path.join(process.cwd(), "public", "games", "games.json");
  const fileContents = fs.readFileSync(gamesFilePath, "utf-8");
  const games: Game[] = JSON.parse(fileContents);
  return games;
}

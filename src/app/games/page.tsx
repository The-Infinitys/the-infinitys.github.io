// src/app/games/page.tsx
import "./page.css";
import Explains from "./components/explains";
import { Metadata } from "next";
import { getGames } from "@/lib/games"; // Import getGames
import GamesList from "./components/GamesList"; // Import GamesList

export const metadata: Metadata = {
  title: "The Infinity's Games",
  description: "Enjoy! with yourself!",
};

export default function GamePages() {
  const games = getGames(); // Fetch game data
  return (
    <>
      <Explains />
      <GamesList games={games} /> {/* Render GamesList */}
    </>
  );
}

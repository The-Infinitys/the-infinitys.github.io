// src/app/games/components/GamesList.tsx
import { Game } from "@/lib/games";
import GameCard from "./GameCard";

interface GamesListProps {
  games: Game[];
}

export default function GamesList({ games }: GamesListProps) {
  return (
    <div className="games-list">
      {games.map((game) => (
        <GameCard key={game.id} game={game} />
      ))}
    </div>
  );
}

"use client";
import Link from "next/link";
import React from "react";
import { Game } from "@/lib/games";
import { useTranslations } from "next-intl"; // Import useTranslations

interface GameCardProps {
  game: Game;
}

export default function GameCard({ game }: GameCardProps) {
  const t = useTranslations("pages.game.cards"); // Scope translations to game cards
  return (
    <section className="section">
      <h2>{t(`${game.id}.title`)}</h2>
      <p>{t(`${game.id}.description`)}</p>
      <Link href={game.link} className="button">
        {t("viewDetails")} {/* Use translation key for button */}
      </Link>
    </section>
  );
}

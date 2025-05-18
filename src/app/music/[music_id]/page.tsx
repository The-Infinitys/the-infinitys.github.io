import { getMusicList } from "../music";
import { notFound } from "next/navigation";
import { Player } from "./player";

export function generateStaticParams() {
  const musicList = getMusicList();
  return musicList.map((music) => ({
    music_id: music.id,
  }));
}

export default async function MusicPage({
  params,
}: {
  params: Promise<{ music_id: string }>;
  }) {
  const resolvedParams = await params;
  const musicList = getMusicList();
  const music = musicList.find((m) => m.id === resolvedParams.music_id);

  if (!music) {
    notFound();
  }

  return <Player music={music} musicList={musicList} />;
}

import { getMusicList } from "../music";
import { notFound } from "next/navigation";
import { Player } from "./components/player";
import { Metadata } from "next";
export function generateStaticParams() {
  const musicList = getMusicList();
  return musicList.map((music) => ({
    music_id: music.id,
  }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ music_id: string; }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const musicList = getMusicList();
  const music = musicList.find((m) => m.id === resolvedParams.music_id);
  if (!music) {
    notFound();
  }
  // 1. paramsからslugを再構築
  const slug = `music/${resolvedParams.music_id}`;
  const title = music.title;
  const artist = music.artist;
  const fullTitle = `${title} | by ${artist}`; // 例: "Next.jsでメタデータを生成する | あなたのサイト名"
  const description = "Music: ${title}";
  const og_image_url = `${slug}/${music.jacketUrl?.split("/").slice(-1)[0]}`;
  const metadata: Metadata = {
    metadataBase: new URL(process.env.BASE_URL || "https://the-infinitys.f5.si"),
    title: fullTitle, // ページのタイトルを設定
    description: description, // ページのディスクリプションを設定
    alternates: {
      canonical: `/${slug}`, //
    },
    // Open Graph メタデータ (SNS共有時に表示される情報)
    openGraph: {
      title: fullTitle,
      description: description,
      url: `/${slug}`, // 絶対URLが推奨
      type: 'music.song', // コンテンツタイプを記事に設定
      // 記事に画像がある場合は、imagesプロパティを追加
      images: [og_image_url || ""],
    }
  };
  return metadata;
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

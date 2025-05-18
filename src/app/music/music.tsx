import fs from "fs";
import path from "path";
import styles from "./page.module.css";
import Image from "next/image";

interface MusicJson {
  title?: string;
  artist?: string;
  date?: string;
}

export interface Music {
  id: string;
  title: string;
  artist: string;
  url: string;
  duration: number;
  jacketUrl?: string;
  date?: string;
}

const musicDirectory = path.join(process.cwd(), "public", "music");

export function getMusicList(): Music[] {
  const musicFolders = fs.readdirSync(musicDirectory).filter((folder) => {
    const folderPath = path.join(musicDirectory, folder);
    return fs.statSync(folderPath).isDirectory();
  });

  return musicFolders.map((folder) => {
    const folderPath = path.join(musicDirectory, folder);
    const files = fs.readdirSync(folderPath);

    // 音楽ファイルとジャケット画像を探す
    const musicFile = files.find(
      (file) =>
        file.endsWith(".mp3") || file.endsWith(".m4a") || file.endsWith(".wav")
    );
    const jacketFile = files.find(
      (file) => file.startsWith("jacket.") || file.startsWith("cover.")
    );

    // music.jsonを読み込む
    const jsonPath = path.join(folderPath, "music.json");
    let jsonData: MusicJson = {
      title:"unknown",
      artist:"unknown",
      date:"unknown"
    };
    if (fs.existsSync(jsonPath)) {
      const jsonContent = fs.readFileSync(jsonPath, "utf-8");
      jsonData = JSON.parse(jsonContent);
    }

    if (!musicFile) {
      throw new Error(`No music file found in ${folder}`);
    }

    return {
      id: folder,
      title:
        jsonData.title || folder.charAt(0).toUpperCase() + folder.slice(1),
      artist: jsonData.artist || "The Infinitys",
      url: `/music/${folder}/${musicFile}`,
      jacketUrl: jacketFile ? `/music/${folder}/${jacketFile}` : undefined,
      duration: 10000,
      date: jsonData.date,
    };
  });
}

export function MusicCard({ music }: { music: Music }) {
  return (
    <a href={`/music/${music.id}`} className={styles["music-card"]}>
      {music.jacketUrl && (
        <Image
          src={music.jacketUrl}
          alt={music.title}
          width={300}
          height={300}
          className={styles["music-jacket"]}
        />
      )}
      <div className={styles["music-info"]}>
        <h2>{music.title}</h2>
        <p>{music.artist}</p>
      </div>
    </a>
  );
}

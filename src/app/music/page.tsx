import { getMusicList, MusicCard } from "./music";
import styles from "./page.module.css";

export default function MusicPage() {
  const musicList = getMusicList();

  return (
    <div className={styles["music-page"]}>
      <h1>Music</h1>
      <div className={styles["music-list"]}>
        {musicList.map((music) => (
          <MusicCard key={music.id} music={music} />
        ))}
      </div>
    </div>
  );
}

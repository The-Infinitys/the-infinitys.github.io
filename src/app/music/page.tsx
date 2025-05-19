import { getMusicList, MusicCard } from "./music";
import styles from "./page.module.css";
import Explains from "./components/explains";
export default function MusicPage() {
  const musicList = getMusicList();

  return (
    <>
      <section className="title">
        <h1>Music</h1>
      </section>
      <Explains />
      <div className={styles["music-page"]}>
        <div className={styles["music-list"]}>
          {musicList.map((music) => (
            <MusicCard key={music.id} music={music} />
          ))}
        </div>
      </div>
    </>
  );
}

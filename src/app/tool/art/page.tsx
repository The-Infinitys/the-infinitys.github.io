import styles from "../page.module.css";
import Explains from "../components/explains";
import Link from "next/link";
export default function ArtToolPage() {
  return (
    <>
      <Explains />
      <section className={styles["tool-list-section"]}>
        <h1>Art Tools</h1>
        <div className={styles["tool-categories"]}>
          <Link href="/tool/art/monochrome-merge" className={styles["tool-category-card"]}>
            <div className={styles["tool-category-info"]}>
              <h2>Monochrome Merge</h2>
              <p>Merge a light and dark image into a single monochrome image.</p>
            </div>
          </Link>
        </div>
      </section>
    </>
  );
}

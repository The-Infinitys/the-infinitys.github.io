import styles from "./page.module.css";
import Explains from "./components/explains";
import Link from "next/link";
export default function ToolPage() {
  return (
    <>
      <Explains />
      <section className={styles["tool-categories-section"]}>
        <h1>Tool Categories</h1>
        <div className={styles["tool-categories"]}>
          <Link href="/tool/art" className={styles["tool-category-card"]}>
            <div className={styles["tool-category-info"]}>
              <h2>Art</h2>
              <p>Tools for creating or editing images.</p>
            </div>
          </Link>
        </div>
      </section>
    </>
  );
}

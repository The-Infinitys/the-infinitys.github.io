import "../page.css";
import Explains from "../components/explains";
import Link from "next/link";
export default function ArtToolPage() {
  return (
    <>
      <Explains />
      <section className="tool-list-section">
        <h1>Art Tools</h1>
        <div className="tool-categories">
          <Link
            href="/tool/art/monochrome-merge"
            className="tool-category-card"
          >
            <div className="tool-category-info">
              <h2>Monochrome Merge</h2>
              <p>Merge a light and dark image into a single monochrome image.</p>
            </div>
          </Link>
        </div>
      </section>
    </>
  );
}

import "./page.css";
import Explains from "./components/explains";
import Link from "next/link";
export default function ToolPage() {
  return (
    <>
      <Explains />
      <section className="tool-categories-section">
        <h1>Tool Categories</h1>
        <div className="tool-categories">
          <Link href="/tool/art" className="tool-category-card">
            <div className="tool-category-info">
              <h2>Art</h2>
              <p>Tools for creating or editing images.</p>
            </div>
          </Link>
        </div>
      </section>
    </>
  );
}

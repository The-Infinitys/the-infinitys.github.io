import "./page.css";
import Explains from "./components/explains";
import { useTranslations } from "next-intl";

export default function ToolPage() {
  const t = useTranslations("pages.tool");
  return (
    <>
      <Explains />
      <section className="tool-categories-section">
        <h1>{t("toolCategories")}</h1>
        <div className="tool-categories">
          <a href="/tool/art" className="tool-category-card">
            <div className="tool-category-info">
              <h2>{t("art.title")}</h2>
              <p>{t("art.description")}</p>
            </div>
          </a>
        </div>
      </section>
    </>
  );
}

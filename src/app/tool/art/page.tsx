import "../page.css";
import Explains from "../components/explains";
import { useTranslations } from "next-intl";

export default function ArtToolPage() {
  const t = useTranslations("pages.tool.art");
  return (
    <>
      <Explains />
      <section className="tool-list-section">
        <h1>{t("title")}</h1>
        <div className="tool-categories">
          <a href="/tool/art/monochrome-merge" className="tool-category-card">
            <div className="tool-category-info">
              <h2>{t("monochrome-merge.title")}</h2>
              <p>{t("monochrome-merge.description")}</p>
            </div>
          </a>
        </div>
      </section>
    </>
  );
}

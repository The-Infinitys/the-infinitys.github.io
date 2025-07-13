import "../page.css";
import Explains from "../components/explains";
import { Metadata } from "next";
import { useTranslations } from "next-intl";

export const metadata: Metadata = {
  title: "The Infinity's Art Tools",
  description: "Tools for art and image manipulation.",
};

export default function ArtToolPage() {
  const t = useTranslations("pages.tool.art");
  return (
    <>
      <Explains />
      <section>
        <h2>{t("title")}</h2>
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

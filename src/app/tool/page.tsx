import "./page.css";
import Explains from "./components/explains";
import { Metadata } from "next";
import { useTranslations } from "next-intl";

export const metadata: Metadata = {
  title: "The Infinity's Tools",
  description: "Useful tools for everyone!",
};

export default function ToolPage() {
  const t = useTranslations("pages.tool");
  return (
    <>
      <Explains />
      <section>
        <h2>{t("toolCategories")}</h2>
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

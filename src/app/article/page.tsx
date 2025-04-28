import "@/app/i18n/configs";
import useTranslation from "i18next";

export default function Home() {
  const { t } = useTranslation;
  return (
    <>
      <section className="title">
        <h1>{t("article.title")}</h1>
      </section>
    </>
  );
}

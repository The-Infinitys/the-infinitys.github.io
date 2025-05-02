
import { useTranslations } from "next-intl";
export default function Home() {
  const t = useTranslations();
  return (
    <>
      <section className="title">
        <h1>{t("pages.home.title")}</h1>
      </section>
      <section>
        <p>{t("pages.home.description.msg1")}</p>
        <p>{t("pages.home.description.msg2")}</p>
        <p>{t("pages.home.description.msg3")}</p>
        <p>{t("pages.home.description.msg4")}</p>
        <p>{t("pages.home.description.msg5")}</p>
        <p>{t("pages.home.description.msg6")}</p>
      </section>
    </>
  );
}

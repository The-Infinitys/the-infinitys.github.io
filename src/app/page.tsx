import "@/app/i18n/configs";
import useTranslation from "i18next";
export default function Home() {
  const { t } = useTranslation;
  return (
    <>
      <section className="title">
        <h1>{t("home.title")}</h1>
      </section>
      <section>
        <p>{t("home.description.msg1")}</p>
        <p>{t("home.description.msg2")}</p>
        <p>{t("home.description.msg3")}</p>
        <p>{t("home.description.msg4")}</p>
        <p>{t("home.description.msg5")}</p>
        <p>{t("home.description.msg6")}</p>
      </section>
    </>
  );
}

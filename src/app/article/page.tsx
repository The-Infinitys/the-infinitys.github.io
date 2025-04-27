import "@/app/i18n/configs";
import useTranslation from "i18next";
import fs from "fs";

export const getStaticProps = () => {
  const articles = fs.readdirSync("@/article");
  console.log("files:", articles);
  return {
    props: {
      posts: [],
    },
  };
};

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

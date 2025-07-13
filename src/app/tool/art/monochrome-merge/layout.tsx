import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("pages.tool.art.monochrome-merge");

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default function MonochromeMergeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

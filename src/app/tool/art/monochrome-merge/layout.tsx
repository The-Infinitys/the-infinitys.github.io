import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Monochrome Merge",
  description: "Merge a light and dark image into a single monochrome image.",
};

export default function MonochromeMergeLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

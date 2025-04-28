import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join("posts"));
  const paths = files.map((filename) => ({
    params: { slug: filename.replace(".md", "") },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  const markdownWithMeta = fs.readFileSync(
    path.join("posts", `${params.slug}.md`),
    "utf-8"
  );

  const { data, content } = matter(markdownWithMeta);
  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();

  return {
    props: {
      frontMatter: data,
      contentHtml,
    },
  };
}

export default function PostPage({
  frontMatter,
  contentHtml,
}: {
  frontMatter: { title: string; date: string; description: string };
  contentHtml: string;
}) {
  return (
    <div>
      <h1>{frontMatter.title}</h1>
      <p>{frontMatter.date}</p>
      <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
    </div>
  );
}
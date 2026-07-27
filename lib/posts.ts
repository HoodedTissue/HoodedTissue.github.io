import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const postsDirectory = path.join(process.cwd(), "content/blog");

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

function formatDate(dateValue: string): string {
  return dateFormatter.format(new Date(dateValue));
}

function toDateTimeValue(dateValue: string): string {
  return new Date(dateValue).toISOString().slice(0, 10);
}

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  dateTime: string;
}

export interface Post extends PostMeta {
  contentHtml: string;
}

export function getAllPostsMeta(): PostMeta[] {
  const filenames = fs.readdirSync(postsDirectory);

  const posts = filenames
    .filter((filename) => filename.endsWith(".md"))
    .map((filename) => {
      const slug = filename.replace(/\.md$/, "");
      const fullPath = path.join(postsDirectory, filename);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data } = matter(fileContents);

      return {
        slug,
        title: data.title as string,
        date: formatDate(data.date as string),
        dateTime: toDateTimeValue(data.date as string),
      };
    });

  return posts.sort((a, b) => (a.dateTime < b.dateTime ? 1 : -1));
}

export async function getPostBySlug(slug: string): Promise<Post> {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();

  return {
    slug,
    title: data.title as string,
    date: formatDate(data.date as string),
    dateTime: toDateTimeValue(data.date as string),
    contentHtml,
  };
}

export function getAllSlugs(): string[] {
  const filenames = fs.readdirSync(postsDirectory);
  return filenames
    .filter((filename) => filename.endsWith(".md"))
    .map((filename) => filename.replace(/\.md$/, ""));
}
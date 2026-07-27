import Link from "next/link";
import { getAllPostsMeta } from "@/lib/posts";

export default function BlogIndex() {
  const posts = getAllPostsMeta();

  return (
    <>
      <h3>blog</h3>
      <ul className="post-list">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/blog/${post.slug}`}>{post.date} {post.title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}
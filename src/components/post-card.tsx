import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { BlogPost } from "@/content/posts";

export function PostCard({ post }: { post: BlogPost }) {
  return (
    <Link href={`/blog/${post.slug}`} className="post-card">
      <div className="post-meta">
        <span>{post.publishedAt}</span>
        <span className="post-meta-dot" aria-hidden="true" />
        <span>{post.readingTime}</span>
      </div>
      <h3 className="post-title">{post.title}</h3>
      <p className="post-excerpt">{post.excerpt}</p>
      <span className="post-read-more">
        Read more
        <ArrowRight size={13} />
      </span>
    </Link>
  );
}

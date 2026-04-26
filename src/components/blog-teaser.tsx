import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PostCard } from "@/components/post-card";
import { getRecentPosts } from "@/content/posts";

export function BlogTeaser() {
  const posts = getRecentPosts(3);
  return (
    <section className="section">
      <div className="container">
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: "1rem",
            marginBottom: "2rem",
            flexWrap: "wrap"
          }}
        >
          <div className="section-header" style={{ marginBottom: 0 }}>
            <p className="section-label">From the blog</p>
            <h2 className="section-title" style={{ fontSize: "clamp(1.5rem, 2.5vw, 2rem)" }}>
              Latest updates
            </h2>
          </div>
          <Link
            href="/blog"
            className="btn btn-secondary"
            style={{ flexShrink: 0, height: "2.25rem", fontSize: "0.85rem" }}
          >
            All posts
            <ArrowRight size={14} />
          </Link>
        </div>
        <div className="post-grid">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}

import type { Metadata } from "next";
import { PostCard } from "@/components/post-card";
import { blogPosts } from "@/content/posts";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Project notes, deployment updates, and technical explainers for Onchain Rail — the USDC settlement infrastructure on Base Mainnet."
};

export default function BlogIndexPage() {
  return (
    <div className="container">
      <div style={{ padding: "5rem 0" }}>
        <div className="section-header">
          <p className="section-label">Blog</p>
          <h1 className="section-title">Project notes &amp; updates</h1>
          <p className="section-desc">
            Technical explainers, deployment status, and build notes for Onchain Rail.
          </p>
        </div>
        <div className="post-grid">
          {blogPosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}

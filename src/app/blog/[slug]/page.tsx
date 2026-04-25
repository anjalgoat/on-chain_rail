import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { blogPosts, getPostBySlug } from "@/content/posts";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedAt
    }
  };
}

export default async function BlogPostPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <div className="container">
      <article style={{ padding: "5rem 0" }}>
        <Link
          href="/blog"
          className="btn btn-ghost"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.4rem",
            fontSize: "0.875rem",
            marginBottom: "2.5rem",
            color: "var(--text-muted)"
          }}
        >
          <ArrowLeft size={14} />
          All posts
        </Link>

        <div className="prose">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              marginBottom: "1.5rem",
              fontSize: "0.825rem",
              color: "var(--text-subtle)"
            }}
          >
            <span>{post.publishedAt}</span>
            <span>·</span>
            <span>{post.readingTime}</span>
            {post.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  padding: "0.2rem 0.6rem",
                  borderRadius: "999px",
                  background: "var(--accent-dim)",
                  color: "var(--accent-light)",
                  fontSize: "0.75rem",
                  fontWeight: 500
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          <h1>{post.title}</h1>
          <p
            style={{
              fontSize: "1.125rem",
              color: "var(--text-muted)",
              marginTop: "1rem",
              marginBottom: "2rem",
              lineHeight: 1.75,
              borderBottom: "1px solid var(--border)",
              paddingBottom: "2rem"
            }}
          >
            {post.excerpt}
          </p>

          <div style={{ display: "grid", gap: "1.25rem" }}>
            {post.body.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </div>

        <div
          style={{
            marginTop: "4rem",
            paddingTop: "2rem",
            borderTop: "1px solid var(--border)"
          }}
        >
          <Link href="/blog" className="btn btn-secondary" style={{ fontSize: "0.875rem" }}>
            <ArrowLeft size={14} />
            Back to all posts
          </Link>
        </div>
      </article>
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/content/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn how Onchain Rail defines a precommitted acceptance path for autonomous work, matches settlement to verification strength, and keeps deployment status explicit on Base Mainnet."
};

export default function AboutPage() {
  return (
    <div className="container">
      <article className="prose" style={{ padding: "5rem 0" }}>
        <p className="section-label" style={{ marginBottom: "1.5rem" }}>
          About the project
        </p>
        <h1>{siteConfig.about.heading}</h1>
        <div style={{ display: "grid", gap: "1.25rem", marginTop: "2rem" }}>
          {siteConfig.about.body.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
        <div
          style={{
            marginTop: "3rem",
            paddingTop: "2rem",
            borderTop: "1px solid var(--border)",
            display: "flex",
            gap: "1rem",
            flexWrap: "wrap"
          }}
        >
          <Link className="btn btn-primary" href="/blog">
            Read the blog
          </Link>
          <a
            className="btn btn-secondary"
            href="https://basescan.org/address/0x15E379127cb242408ABc7A0F4d3d10f9065D44d0"
            target="_blank"
            rel="noopener noreferrer"
          >
            View contract on Basescan
          </a>
        </div>
      </article>
    </div>
  );
}

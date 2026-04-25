import Link from "next/link";
import { siteConfig } from "@/content/site";

export function Hero() {
  return (
    <section className="hero">
      <div className="hero-orb hero-orb-1" aria-hidden="true" />
      <div className="hero-orb hero-orb-2" aria-hidden="true" />
      <div className="container">
        <div className="hero-content">
          <div className="hero-badge">
            <span className="dot-live" aria-hidden="true" />
            {siteConfig.hero.badge}
          </div>
          <h1 className="hero-heading">
            {siteConfig.hero.heading}{" "}
            <span className="gradient-text">{siteConfig.hero.headingAccent}</span>
          </h1>
          <p className="hero-body">{siteConfig.hero.body}</p>
          <div className="hero-actions">
            <Link className="btn btn-primary" href={siteConfig.hero.primaryCta.href}>
              {siteConfig.hero.primaryCta.label}
            </Link>
            <Link className="btn btn-secondary" href={siteConfig.hero.secondaryCta.href}>
              {siteConfig.hero.secondaryCta.label}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

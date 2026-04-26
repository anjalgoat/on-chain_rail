import Link from "next/link";
import { ArrowUpRight, ShieldCheck, AlertCircle } from "lucide-react";
import { siteConfig } from "@/content/site";

export function Hero() {
  return (
    <section className="hero">
      <div className="hero-orb hero-orb-1" aria-hidden="true" />
      <div className="hero-orb hero-orb-2" aria-hidden="true" />
      <div className="container">
        <div className="hero-grid">
          <div className="hero-content">
            <div className="hero-status-stack">
              <a
                className="status-pill status-pill-verified"
                href={siteConfig.contract.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ShieldCheck size={13} aria-hidden="true" />
                {siteConfig.hero.statusVerified}
              </a>
              <Link className="status-pill status-pill-gated" href="/about">
                <AlertCircle size={13} aria-hidden="true" />
                {siteConfig.hero.statusGated}
              </Link>
            </div>
            <h1 className="hero-heading serif">
              {siteConfig.hero.heading}{" "}
              <span className="gradient-text">{siteConfig.hero.headingAccent}</span>{" "}
              {siteConfig.hero.headingSuffix}
            </h1>
            <p className="hero-body">{siteConfig.hero.body}</p>
            <div className="hero-actions">
              <a
                className="btn btn-primary"
                href={siteConfig.hero.primaryCta.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {siteConfig.hero.primaryCta.label}
                <ArrowUpRight size={15} aria-hidden="true" />
              </a>
              <Link className="btn btn-secondary" href={siteConfig.hero.secondaryCta.href}>
                {siteConfig.hero.secondaryCta.label}
              </Link>
              <Link className="text-link" href={siteConfig.hero.tertiaryCta.href}>
                {siteConfig.hero.tertiaryCta.label}
              </Link>
            </div>
          </div>

          <FlowDiagram />
        </div>
      </div>
    </section>
  );
}

function FlowDiagram() {
  return (
    <figure className="hero-diagram" aria-label="Money flow: principal funds escrow, verification releases payment to agent, refund returns to principal on failure.">
      <figcaption className="diagram-title">Money flow</figcaption>

      <div className="diagram-row">
        <div className="diagram-node">
          <span className="diagram-node-label">Principal</span>
          <span className="diagram-node-value">Funds USDC</span>
        </div>
        <div className="diagram-arrow" aria-hidden="true">
          <span className="diagram-token">$</span>
        </div>
        <div className="diagram-node">
          <span className="diagram-node-label">Escrow · Base</span>
          <span className="diagram-node-value tabular-nums">Locked</span>
        </div>
      </div>

      <div className="diagram-row">
        <div className="diagram-node">
          <span className="diagram-node-label">Escrow · Base</span>
          <span className="diagram-node-value">Verified</span>
        </div>
        <div className="diagram-arrow" aria-hidden="true">
          <span className="diagram-token" style={{ animationDelay: "1s" }}>$</span>
        </div>
        <div className="diagram-node">
          <span className="diagram-node-label">Agent</span>
          <span className="diagram-node-value">Paid USDC</span>
        </div>
      </div>

      <div className="diagram-row">
        <div className="diagram-node">
          <span className="diagram-node-label">Principal</span>
          <span className="diagram-node-value">Refund / slash</span>
        </div>
        <div className="diagram-arrow-back" aria-hidden="true" />
        <div className="diagram-node">
          <span className="diagram-node-label">Escrow</span>
          <span className="diagram-node-value">Failed verify</span>
        </div>
      </div>

      <div className="diagram-foot">
        <span>Contract</span>
        <a href={siteConfig.contract.href} target="_blank" rel="noopener noreferrer">
          {siteConfig.contract.addressShort}
        </a>
      </div>
    </figure>
  );
}

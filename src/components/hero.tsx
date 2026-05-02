import Link from "next/link";
import { ArrowUpRight, ShieldCheck, AlertCircle } from "lucide-react";
import { siteConfig } from "@/content/site";

export function Hero() {
  return (
    <section className="hero">
      <div className="hero-orb hero-orb-1" aria-hidden="true" />
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
            <h1 className="hero-heading">
              {siteConfig.hero.heading}
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

          <AcceptancePath />
        </div>
      </div>
    </section>
  );
}

const PATH_STAGES = [
  { num: "01", label: "Commitment", sub: "Scope, payout terms, and parties defined" },
  { num: "02", label: "Policy", sub: "Evidence type and verification class fixed" },
  { num: "03", label: "Economic lock", sub: "USDC locked in contract on Base" },
  { num: "04", label: "Evidence", sub: "Bounded to precommitted rules only" },
  { num: "05", label: "Verification", sub: "Offchain · checked against fixed path" },
  { num: "06", label: "Settlement", sub: "Release · refund · dispute · delayed finality" },
  { num: "07", label: "Audit", sub: "Immutable record on-chain" },
];

function AcceptancePath() {
  return (
    <figure
      className="hero-diagram"
      aria-label="Governed acceptance path: commitment, policy, economic lock, evidence, verification, settlement, and audit."
    >
      <figcaption className="diagram-title">Acceptance path</figcaption>

      <div className="acceptance-stages">
        {PATH_STAGES.map((stage) => (
          <div key={stage.num} className="acceptance-stage">
            <span className="acceptance-stage-num">{stage.num}</span>
            <div className="acceptance-stage-content">
              <span className="acceptance-stage-label">{stage.label}</span>
              <span className="acceptance-stage-sub">{stage.sub}</span>
            </div>
          </div>
        ))}
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

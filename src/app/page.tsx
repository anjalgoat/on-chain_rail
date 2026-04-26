import { CheckCircle2, Loader, MinusCircle, ArrowUpRight } from "lucide-react";
import { Hero } from "@/components/hero";
import { HowItWorks } from "@/components/how-it-works";
import { WorkClasses } from "@/components/work-classes";
import { StateMachineWalkthrough } from "@/components/state-machine-walkthrough";
import { SettlementSimulator } from "@/components/settlement-simulator";
import { TrustSection } from "@/components/trust-section";
import { TrustStrip } from "@/components/trust-strip";
import { BlogTeaser } from "@/components/blog-teaser";
import { siteConfig } from "@/content/site";
import Link from "next/link";

function MilestoneBar() {
  return (
    <div className="milestone-bar">
      <div className="container">
        <div className="milestone-inner">
          {siteConfig.milestones.map((m) => (
            <div key={m.label} className="milestone-item">
              <div className={`milestone-icon ${m.status}`} aria-hidden="true">
                {m.status === "done" ? (
                  <CheckCircle2 size={15} />
                ) : m.status === "active" ? (
                  <Loader size={14} className="terminal-spinner" />
                ) : (
                  <MinusCircle size={14} />
                )}
              </div>
              <div>
                <p className="milestone-label">{m.label}</p>
                <p className={`milestone-value ${m.status === "blocked" ? "muted" : ""}`}>
                  {m.value}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CtaSection() {
  return (
    <section className="cta-section">
      <div className="container">
        <div className="cta-box">
          <h2 className="cta-heading">Build on Onchain Rail.</h2>
          <p className="cta-desc">
            Read the spec, inspect the contract, or follow shipping updates.
          </p>
          <div className="cta-actions">
            <Link className="btn btn-primary" href="/about">
              Read the spec
            </Link>
            <a
              className="btn btn-secondary"
              href={siteConfig.contract.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              Inspect on Basescan
              <ArrowUpRight size={14} aria-hidden="true" />
            </a>
            <Link className="btn btn-ghost" href="/blog">
              Shipping updates →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <MilestoneBar />
      <div className="tone-surface">
        <TrustSection variant="summary" />
      </div>
      <HowItWorks />
      <div className="tone-surface">
        <SettlementSimulator />
      </div>
      <WorkClasses />
      <div className="tone-surface">
        <StateMachineWalkthrough />
      </div>
      <TrustSection variant="deep" />
      <div className="tone-surface">
        <BlogTeaser />
      </div>
      <CtaSection />
    </>
  );
}

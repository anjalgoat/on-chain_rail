import { Metadata } from "next";
import { CheckCircle2, Loader, MinusCircle, ArrowUpRight } from "lucide-react";
import { Hero } from "@/components/hero";
import { HowItWorks } from "@/components/how-it-works";
import { VerificationSection } from "@/components/verification-section";
import { WorkClasses } from "@/components/work-classes";
import { WhatWeAreNot } from "@/components/what-we-are-not";
import { StateMachineWalkthrough } from "@/components/state-machine-walkthrough";
import { SettlementSimulator } from "@/components/settlement-simulator";
import { TrustSection } from "@/components/trust-section";
import { BlogTeaser } from "@/components/blog-teaser";
import { siteConfig } from "@/content/site";
import Link from "next/link";

export const metadata: Metadata = {
  other: {
    "base:app_id": "69f2a1186daaf9236cfba3d8"
  }
};

function ProofBar() {
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
          <h2 className="cta-heading">Read the lifecycle. Inspect the contract. Understand the boundary.</h2>
          <p className="cta-desc">
            The full governing logic is public and verifiable. Start with the lifecycle, inspect the deployed contract on Basescan, or read the doctrine posts.
          </p>
          <div className="cta-actions">
            <Link className="btn btn-primary" href="#how-it-works">
              Read the lifecycle
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
              Doctrine and notes →
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
      <ProofBar />
      <HowItWorks />
      <VerificationSection />
      <WorkClasses />
      <WhatWeAreNot />
      <div className="tone-surface">
        <SettlementSimulator />
      </div>
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

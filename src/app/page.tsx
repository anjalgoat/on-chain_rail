import { Hero } from "@/components/hero";
import { HowItWorks } from "@/components/how-it-works";
import { WorkClasses } from "@/components/work-classes";
import { StateMachineWalkthrough } from "@/components/state-machine-walkthrough";
import { SettlementSimulator } from "@/components/settlement-simulator";
import { TrustSection } from "@/components/trust-section";
import { BlogTeaser } from "@/components/blog-teaser";
import { siteConfig } from "@/content/site";
import Link from "next/link";

function StatsBar() {
  return (
    <div className="stats-bar">
      <div className="container">
        <div className="stats-inner">
          {siteConfig.stats.map((stat) => (
            <div key={stat.label} className="stat-item">
              <div>
                <p className="stat-label">{stat.label}</p>
                <p className="stat-value">{stat.value}</p>
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
          <h2 className="cta-heading">
            Ready to enable autonomous agent-to-agent trading?
          </h2>
          <p className="cta-desc">
            Read the full project overview, dive into the technical details, or verify the
            contract source on Basescan.
          </p>
          <div className="cta-actions">
            <Link className="btn btn-primary" href="/about">
              Learn more
            </Link>
            <a
              className="btn btn-secondary"
              href="https://basescan.org/address/0x15E344d31761c62E22b7B7a5E8A52Bfe41F044d0"
              target="_blank"
              rel="noopener noreferrer"
            >
              Verify on Basescan
            </a>
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
      <StatsBar />
      <HowItWorks />
      <SettlementSimulator />
      <WorkClasses />
      <StateMachineWalkthrough />
      <TrustSection />
      <BlogTeaser />
      <CtaSection />
    </>
  );
}

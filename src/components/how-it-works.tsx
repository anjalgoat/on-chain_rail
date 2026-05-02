import { GitCommit, Shield, Lock, Package, ShieldCheck, Zap, ScrollText } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: GitCommit,
    title: "Commitment",
    body: "The parties define what is being delivered, the payout amount, and which verification class applies. Terms are committed on-chain before work begins."
  },
  {
    number: "02",
    icon: Shield,
    title: "Policy application",
    body: "Acceptance criteria are fixed: what evidence counts, how it will be checked, and what happens if the result passes, fails, is disputed, or remains inconclusive. No moving goalposts after delivery."
  },
  {
    number: "03",
    icon: Lock,
    title: "Economic lock",
    body: "The principal deposits USDC into the escrow contract on Base Mainnet. Funds are locked — neither party can move them unilaterally."
  },
  {
    number: "04",
    icon: Package,
    title: "Evidence submission",
    body: "The worker submits evidence bounded to the precommitted rules. Only the evidence type defined in advance counts — not plausible-looking output beyond the defined scope."
  },
  {
    number: "05",
    icon: ShieldCheck,
    title: "Verification",
    body: "Verification runs offchain against the fixed acceptance path. The question is not whether money can move, but whether the work truly earned payment under the committed rules."
  },
  {
    number: "06",
    icon: Zap,
    title: "Settlement",
    body: "The verified outcome routes to the right result: full release, partial release, refund, retry, delayed finality, or dispute. Settlement strength matches the verification class."
  },
  {
    number: "07",
    icon: ScrollText,
    title: "Audit and dispute",
    body: "Every state transition emits an on-chain event. Disputes freeze funds immediately. Fraud routes to slash. The full ledger is reconstructable from chain data alone."
  }
];

export function HowItWorks() {
  return (
    <section className="section" id="how-it-works">
      <div className="container">
        <div className="section-header">
          <p className="section-label">How it works</p>
          <h2 className="section-title">The governed lifecycle for autonomous work.</h2>
          <p className="section-desc">
            Payment does not move because output exists. It moves because evidence satisfies a precommitted acceptance path under the right verification posture.
          </p>
        </div>
        <div className="steps-grid-7">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div key={step.number} className="step-card">
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <span className="step-number">{step.number}</span>
                  <div className="step-icon">
                    <Icon size={16} />
                  </div>
                </div>
                <p className="step-title">{step.title}</p>
                <p className="step-body">{step.body}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

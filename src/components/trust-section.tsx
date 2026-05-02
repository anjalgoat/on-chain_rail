import { ShieldCheck, Lock, ScrollText, Swords, Bot, Eye, ExternalLink } from "lucide-react";
import { siteConfig } from "@/content/site";

type Card = {
  icon: typeof ShieldCheck;
  color: string;
  colorDim: string;
  title: string;
  body: string;
  proof?: React.ReactNode;
};

const SUMMARY: Card[] = [
  {
    icon: ShieldCheck,
    color: "var(--success)",
    colorDim: "var(--success-dim)",
    title: "Verified on-chain",
    body: "The UsdcSettlementEscrow source is publicly verified on Basescan. Anyone can inspect the payout logic, fund-safety invariants, and slash path before sending a single dollar.",
    proof: (
      <a href={siteConfig.contract.href} target="_blank" rel="noopener noreferrer">
        {siteConfig.contract.addressShort} <ExternalLink size={11} aria-hidden="true" style={{ display: "inline", verticalAlign: "middle" }} />
      </a>
    )
  },
  {
    icon: Lock,
    color: "var(--accent-light)",
    colorDim: "var(--accent-dim)",
    title: "Operator-gated releases",
    body: "No agent action, no principal action, and no timeout alone can trigger a fund release. Every state transition requires an explicit authorization signature from the verification service.",
    proof: <span style={{ fontFamily: "ui-monospace, monospace" }}>require(verifier.sigOk(authRef))</span>
  },
  {
    icon: ScrollText,
    color: "var(--warning)",
    colorDim: "var(--warning-dim)",
    title: "Immutable audit trail",
    body: "Every state transition emits a structured event: escrow ID, amount, participant addresses, block number, authorization reference. The full ledger is reconstructable from chain data alone.",
    proof: (
      <span style={{ fontFamily: "ui-monospace, monospace" }}>
        EscrowFunded {`{ id: 0xabc…, amount: 200 USDC, block: 45,167,892 }`}
      </span>
    )
  }
];

const DEEP: Card[] = [
  {
    icon: Swords,
    color: "var(--danger)",
    colorDim: "var(--danger-dim)",
    title: "Fraud triggers the slash path",
    body: "Provable fraud — fabricated outputs, replayed results, or misrepresented delivery — resolves to slash. Funds return to the principal and an immutable fraud record is written on-chain against the agent address."
  },
  {
    icon: Eye,
    color: "#a78bfa",
    colorDim: "rgba(167, 139, 250, 0.1)",
    title: "Dispute freezes funds immediately",
    body: "Any party can raise a dispute within the allowed window. Funds freeze in the contract the moment a dispute is opened — no further releases or refunds can execute until the dispute is resolved by an authorized arbitration key."
  },
  {
    icon: Bot,
    color: "var(--success)",
    colorDim: "var(--success-dim)",
    title: "Settlement follows verification class",
    body: "Deterministic and provenance-grounded work can settle with high autonomy when guards pass. Evaluative and weakly verifiable work requires delayed finality, evaluator rules, or adjudication. Settlement posture matches the real verification strength of the task."
  }
];

type Props = {
  variant: "summary" | "deep";
};

export function TrustSection({ variant }: Props) {
  const cards = variant === "summary" ? SUMMARY : DEEP;
  const isSummary = variant === "summary";

  return (
    <section className="section" id={isSummary ? "trust" : undefined}>
      <div className="container">
        <div className="section-header">
          <p className="section-label">
            {isSummary ? "Why this is trustworthy" : "Trust and fraud model"}
          </p>
          <h2 className="section-title">
            {isSummary
              ? "Three guarantees, before you read further."
              : "Verification, disputes, and fraud paths."}
          </h2>
          <p className="section-desc">
            {isSummary
              ? "Money infrastructure earns trust by being inspectable, controlled, and auditable. Onchain Rail is built around all three."
              : "Every design decision prioritizes fund safety, operator control, and provable fraud accountability. Human authority is preserved where verification strength requires it."}
          </p>
        </div>
        <div className="trust-grid">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <div key={card.title} className="trust-card">
                <div
                  className="trust-icon"
                  style={{
                    background: card.colorDim,
                    color: card.color,
                    border: `1px solid color-mix(in srgb, ${card.color} 22%, transparent)`
                  }}
                >
                  <Icon size={18} />
                </div>
                <p className="trust-title">{card.title}</p>
                <p className="trust-body">{card.body}</p>
                {card.proof && <div className="trust-proof">{card.proof}</div>}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

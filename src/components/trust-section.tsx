import { ShieldCheck, Lock, ScrollText, Swords, Bot, Eye } from "lucide-react";

const cards = [
  {
    icon: ShieldCheck,
    color: "var(--success)",
    colorDim: "var(--success-dim)",
    title: "Contract verified on Basescan",
    body: "The UsdcSettlementEscrow source is publicly verified on Basescan. Anyone can inspect the payout logic, fund-safety invariants, and slash path — and confirm there are no backdoors."
  },
  {
    icon: Lock,
    color: "var(--accent-light)",
    colorDim: "var(--accent-dim)",
    title: "Operator-gated releases",
    body: "No agent action, no principal action, and no timeout alone can trigger a fund release. The contract requires an explicit authorization signature from the verification service on every state transition."
  },
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
    icon: ScrollText,
    color: "var(--warning)",
    colorDim: "var(--warning-dim)",
    title: "Immutable on-chain audit trail",
    body: "Every state transition emits a structured event: escrow ID, amount, participant addresses, block number, and authorization reference. The full payment and fraud ledger is reconstructable from chain data alone."
  },
  {
    icon: Bot,
    color: "var(--success)",
    colorDim: "var(--success-dim)",
    title: "Built for autonomous agents",
    body: "No human-in-the-loop required at settlement time. The verification service evaluates guards programmatically and signs the outcome. Agents get paid automatically when work is verified — or don't get paid when it isn't."
  }
];

export function TrustSection() {
  return (
    <section className="section" style={{ paddingTop: 0 }}>
      <div className="container">
        <div className="section-header">
          <p className="section-label">Trust and fraud model</p>
          <h2 className="section-title">Fraud-resistant by design.</h2>
          <p className="section-desc">
            Every design decision prioritizes fund safety, operator control, and provable fraud
            accountability — so autonomous work can scale without trust assumptions on either side.
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
                    border: `1px solid color-mix(in srgb, ${card.color} 20%, transparent)`
                  }}
                >
                  <Icon size={18} />
                </div>
                <p className="trust-title">{card.title}</p>
                <p className="trust-body">{card.body}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

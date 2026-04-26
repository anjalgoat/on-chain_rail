"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  FileSignature,
  Coins,
  Package,
  ScanSearch,
  CheckCircle2,
  Undo2,
  AlertTriangle,
  Skull
} from "lucide-react";

type LifecycleState = {
  id: string;
  step: number;
  label: string;
  icon: React.ElementType;
  category: "flow" | "terminal-success" | "terminal-refund" | "terminal-dispute" | "terminal-slash";
  phase: string;
  description: string;
  guards: string[];
  events: string[];
  onChain: string;
};

const STATES: LifecycleState[] = [
  {
    id: "committed",
    step: 1,
    label: "Committed",
    icon: FileSignature,
    category: "flow",
    phase: "Initialization",
    description:
      "The principal and agent agree on work terms. An escrow record is created on-chain with the signed commitment — amount, recipient, work class, delivery criteria reference, and verification timeout. No funds move at this stage.",
    guards: [
      "Operator signature verified",
      "Amount > 0 USDC",
      "Recipient address is non-zero",
      "Work class and criteria reference provided",
      "Verification timeout is a future block"
    ],
    events: ["EscrowCommitted"],
    onChain:
      "Contract stores escrow metadata, authorized amount, recipient, work class, criteria hash, and commitment block."
  },
  {
    id: "funded",
    step: 2,
    label: "Funded",
    icon: Coins,
    category: "flow",
    phase: "Fund Lock",
    description:
      "The principal deposits USDC into the escrow contract. The contract verifies the deposited amount matches the authorized figure. From this point, funds are locked — no party can move them without a verification service authorization.",
    guards: [
      "USDC transfer confirmed on-chain",
      "Amount matches escrow record exactly",
      "No double-fund detected"
    ],
    events: ["EscrowFunded"],
    onChain:
      "USDC balance locked in contract. Release, refund, and slash paths all blocked until verification service authorization."
  },
  {
    id: "delivered",
    step: 3,
    label: "Delivered",
    icon: Package,
    category: "flow",
    phase: "Delivery",
    description:
      "The agent submits a delivery reference — a content hash, API result, structured output, or artifact pointer. The delivery is recorded on-chain. The escrow enters the verification window; no further delivery updates are accepted.",
    guards: [
      "Delivery reference is non-empty",
      "Submission within the agreed delivery window",
      "No prior delivery recorded for this escrow"
    ],
    events: ["EscrowDelivered"],
    onChain:
      "Delivery hash and submission block recorded. Verification window opens. Dispute window timer starts."
  },
  {
    id: "verifying",
    step: 4,
    label: "Verifying",
    icon: ScanSearch,
    category: "flow",
    phase: "Guard Check",
    description:
      "The off-chain verification service evaluates all guards — delivery criteria, fraud signals, format checks, quality scores, and authorization rules. This is the only stage where off-chain logic holds full authority. The contract waits for a signed authorization.",
    guards: [
      "All delivery conditions evaluated",
      "Fraud signal scan complete",
      "No active dispute on record",
      "Verification timeout not expired"
    ],
    events: ["VerificationStarted"],
    onChain:
      "No on-chain state change at this stage. The off-chain verification service is the authoritative decision-maker."
  },
  {
    id: "released",
    step: 5,
    label: "Released",
    icon: CheckCircle2,
    category: "terminal-success",
    phase: "Success — Payment Final",
    description:
      "All delivery conditions passed and no fraud signals were detected. The verification service signs a release authorization. The contract verifies the signature, transfers USDC to the agent, and marks the escrow as settled. This is the happy path and the most common terminal state.",
    guards: [
      "Verification service release authorization",
      "No active dispute or fraud flag",
      "Recipient address unchanged from escrow record",
      "Release not previously executed"
    ],
    events: ["SettlementReleased", "USDCTransferred"],
    onChain:
      "USDC transferred to agent recipient address. Escrow record marked settled. Full event trail written for ledger reconciliation."
  },
  {
    id: "refunded",
    step: 5,
    label: "Refunded",
    icon: Undo2,
    category: "terminal-refund",
    phase: "Return — Funds Restored",
    description:
      "Delivery conditions were not met, the delivery was missing, or the verification timeout expired. The verification service authorizes a refund. USDC returns to the original principal. The escrow is closed with no penalty to the agent — this is a failure path, not a fraud path.",
    guards: [
      "Refund authorized by verification service",
      "No prior release executed",
      "Refund path not already taken"
    ],
    events: ["SettlementRefunded", "USDCReturned"],
    onChain:
      "USDC returned to original principal. Escrow record marked refunded. Refund amount and block recorded."
  },
  {
    id: "disputed",
    step: 5,
    label: "Disputed",
    icon: AlertTriangle,
    category: "terminal-dispute",
    phase: "Escalation — Funds Frozen",
    description:
      "A party contests the settlement before the verification service finalizes. This can be triggered by the principal (claims delivery was fraudulent or incomplete) or by the agent (claims verification was unfair). Funds freeze in the escrow contract. A dispute record with an evidence reference is written on-chain. The flow pauses until an authorized resolution is submitted — which may result in release, refund, or slash.",
    guards: [
      "Dispute raised within the allowed window",
      "Evidence reference recorded on-chain",
      "Funds still locked — no prior release or refund",
      "Disputing party is a recognized participant"
    ],
    events: ["DisputeOpened"],
    onChain:
      "Funds frozen in contract. Dispute record written with evidence reference and disputing party. All other transitions blocked until resolution."
  },
  {
    id: "slashed",
    step: 6,
    label: "Slashed",
    icon: Skull,
    category: "terminal-slash",
    phase: "Fraud Confirmed — Agent Penalized",
    description:
      "A dispute was resolved and provable fraud was confirmed — fabricated outputs, replayed results, plagiarism, or misrepresentation of delivery. The contract executes the slash path: funds are returned to the principal and the agent receives nothing. The slash event is recorded permanently on-chain as a fraud record.",
    guards: [
      "Dispute resolution signed by authorized arbitration key",
      "Fraud finding recorded with evidence hash",
      "No prior release or refund executed",
      "Slash path not already taken"
    ],
    events: ["DisputeResolved", "AgentSlashed", "USDCReturned"],
    onChain:
      "USDC returned to principal. Fraud record written with agent address, evidence hash, and resolution block. Permanent on-chain fraud trail."
  }
];

const FLOW_STATES = STATES.filter((s) => s.category === "flow");
const TERMINAL_STATES = STATES.filter((s) => s.category !== "flow");

const accentColors: Record<LifecycleState["category"], string> = {
  flow: "var(--accent)",
  "terminal-success": "var(--success)",
  "terminal-refund": "var(--warning)",
  "terminal-dispute": "var(--danger)",
  "terminal-slash": "#dc2626"
};

export function StateMachineWalkthrough() {
  const [activeId, setActiveId] = useState<string>("committed");
  const activeState = STATES.find((s) => s.id === activeId)!;
  const accent = accentColors[activeState.category];

  return (
    <section className="section">
      <div className="container">
        <div className="section-header">
          <p className="section-label">For the technical</p>
          <h2 className="section-title">Complete lifecycle state map.</h2>
          <p className="section-desc">
            All states, guards, events, and on-chain effects. Click any state to inspect the exact conditions, emitted events, and blockchain effects.
          </p>
        </div>

        <div className="walkthrough-wrap">
          <div className="state-flow-bar">
            <p className="flow-hint">Click any state to see its guards, events, and on-chain effect.</p>
            <p className="flow-label">Main flow</p>
            <div className="flow-row">
              {FLOW_STATES.map((state, i) => {
                const Icon = state.icon;
                return (
                  <div key={state.id} style={{ display: "flex", alignItems: "center", gap: "0.375rem" }}>
                    <button
                      className={`state-btn ${activeId === state.id ? "active-state" : ""}`}
                      onClick={() => setActiveId(state.id)}
                    >
                      <Icon size={13} />
                      <span>{state.label}</span>
                    </button>
                    {i < FLOW_STATES.length - 1 && (
                      <span className="flow-arrow">→</span>
                    )}
                  </div>
                );
              })}
              <span className="flow-arrow">→</span>
              <span style={{ fontSize: "0.8rem", color: "var(--text-subtle)", paddingLeft: "0.25rem" }}>
                outcome
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", paddingBottom: "1.25rem" }}>
              <p className="flow-label" style={{ margin: 0 }}>Outcomes</p>
              <div className="flow-row" style={{ flexWrap: "wrap" }}>
                {TERMINAL_STATES.map((state) => {
                  const Icon = state.icon;
                  return (
                    <button
                      key={state.id}
                      className={`state-btn ${state.category} ${activeId === state.id ? "active-state" : ""}`}
                      onClick={() => setActiveId(state.id)}
                    >
                      <Icon size={13} />
                      <span>{state.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeId}
              className="state-detail-panel"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <div className="detail-header">
                <div>
                  <p className="detail-phase" style={{ color: accent }}>
                    Step {activeState.step} · {activeState.phase}
                  </p>
                  <h3 className="detail-title">{activeState.label}</h3>
                </div>
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.4rem",
                    padding: "0.25rem 0.7rem",
                    borderRadius: "999px",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    background: `color-mix(in srgb, ${accent} 12%, transparent)`,
                    color: accent,
                    border: `1px solid color-mix(in srgb, ${accent} 25%, transparent)`,
                    flexShrink: 0
                  }}
                >
                  {activeState.category === "flow" ? "In progress" : "Terminal"}
                </span>
              </div>

              <p className="detail-desc">{activeState.description}</p>

              <div className="detail-cols">
                <div>
                  <p className="detail-col-title">Guards required</p>
                  <ul className="detail-list">
                    {activeState.guards.map((g) => (
                      <li key={g}>{g}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="detail-col-title">Events emitted</p>
                  <ul className="detail-list">
                    {activeState.events.map((e) => (
                      <li key={e} style={{ fontFamily: "monospace", fontSize: "0.825rem" }}>
                        {e}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="detail-col-title">On-chain effect</p>
                  <div className="detail-onchain">{activeState.onChain}</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

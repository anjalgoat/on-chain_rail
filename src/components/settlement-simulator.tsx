"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, RotateCcw, CheckCircle, Circle, Loader } from "lucide-react";

type Outcome = "release" | "refund" | "dispute";

type SimStep = {
  label: string;
  detail: string;
  durationMs: number;
};

const STEPS_BY_OUTCOME: Record<Outcome, SimStep[]> = {
  release: [
    { label: "Submitting delivery reference", detail: "POST /api/escrow/deliver · content hash recorded", durationMs: 1100 },
    { label: "Running verification guards", detail: "Checking delivery criteria, fraud signals, authorization", durationMs: 1600 },
    { label: "Signing release authorization", detail: "Verification service issues release signature", durationMs: 1200 },
    { label: "Broadcasting to Base Mainnet", detail: "eth_sendRawTransaction → mempool", durationMs: 1800 },
    { label: "Awaiting block confirmation", detail: "Block confirmed · 1 confirmation", durationMs: 2200 }
  ],
  refund: [
    { label: "Submitting delivery reference", detail: "POST /api/escrow/deliver · no valid content hash", durationMs: 1100 },
    { label: "Running verification guards", detail: "Delivery criteria check — conditions NOT met", durationMs: 1600 },
    { label: "Signing refund authorization", detail: "Verification service issues refund signature", durationMs: 1200 },
    { label: "Broadcasting to Base Mainnet", detail: "eth_sendRawTransaction → mempool", durationMs: 1800 },
    { label: "Awaiting block confirmation", detail: "Block confirmed · USDC returning to principal", durationMs: 2200 }
  ],
  dispute: [
    { label: "Submitting delivery reference", detail: "POST /api/escrow/deliver · hash submitted", durationMs: 1100 },
    { label: "Running verification guards", detail: "Fraud signal detected — output hash mismatch", durationMs: 1800 },
    { label: "Opening dispute on-chain", detail: "Evidence reference recorded · funds freezing", durationMs: 1400 },
    { label: "Broadcasting dispute to Base Mainnet", detail: "eth_sendRawTransaction → DisputeOpened event", durationMs: 1800 },
    { label: "Awaiting block confirmation", detail: "Block confirmed · USDC frozen in escrow", durationMs: 2200 }
  ]
};

const RECEIPT_CONFIG: Record<Outcome, { cls: string; title: string; outcomeLabel: string }> = {
  release: { cls: "", title: "✓ SETTLEMENT COMPLETE", outcomeLabel: "Released → agent" },
  refund: { cls: "refund", title: "↩ REFUND COMPLETE", outcomeLabel: "Refunded → principal" },
  dispute: { cls: "dispute", title: "⚠ DISPUTE OPENED", outcomeLabel: "Funds frozen in escrow" }
};

function randomHex(len: number) {
  return Array.from({ length: len }, () =>
    Math.floor(Math.random() * 16).toString(16)
  ).join("");
}

function mockTxHash() {
  return `0x${randomHex(8)}…${randomHex(4)}`;
}

function mockBlock() {
  return (45_167_721 + Math.floor(Math.random() * 300)).toLocaleString();
}

type SimState = "idle" | "running" | "done";

export function SettlementSimulator() {
  const [amount, setAmount] = useState("200");
  const [workClass, setWorkClass] = useState("Code & Software");
  const [outcome, setOutcome] = useState<Outcome>("release");
  const [simState, setSimState] = useState<SimState>("idle");
  const [currentStep, setCurrentStep] = useState(-1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [receipt, setReceipt] = useState<{
    txHash: string;
    block: string;
    amount: string;
    outcome: string;
  } | null>(null);
  const abortRef = useRef(false);

  const steps = STEPS_BY_OUTCOME[outcome];

  async function runSimulation() {
    abortRef.current = false;
    setSimState("running");
    setCurrentStep(-1);
    setCompletedSteps([]);
    setReceipt(null);

    const currentSteps = STEPS_BY_OUTCOME[outcome];
    for (let i = 0; i < currentSteps.length; i++) {
      if (abortRef.current) return;
      setCurrentStep(i);
      await new Promise((r) => setTimeout(r, currentSteps[i].durationMs));
      if (abortRef.current) return;
      setCompletedSteps((prev) => [...prev, i]);
    }

    setReceipt({
      txHash: mockTxHash(),
      block: mockBlock(),
      amount: `${parseFloat(amount || "0").toFixed(2)} USDC`,
      outcome: RECEIPT_CONFIG[outcome].outcomeLabel
    });
    setCurrentStep(-1);
    setSimState("done");
  }

  function reset() {
    abortRef.current = true;
    setSimState("idle");
    setCurrentStep(-1);
    setCompletedSteps([]);
    setReceipt(null);
  }

  const isRunning = simState === "running";
  const isDone = simState === "done";
  const receiptCfg = RECEIPT_CONFIG[outcome];

  return (
    <section className="section" id="simulator" style={{ paddingTop: 0 }}>
      <div className="container">
        <div className="section-header">
          <p className="section-label">Try it yourself</p>
          <h2 className="section-title">Simulate a settlement.</h2>
          <p className="section-desc">
            Pick a work class, amount, and outcome. Watch the settlement execute from delivery to on-chain confirmation.
          </p>
        </div>

        <div className="simulator-wrap">
          <div className="simulator-form-panel">
            <div className="form-group">
              <label className="form-label" htmlFor="sim-work-class">
                Work class
              </label>
              <select
                id="sim-work-class"
                className="form-select"
                value={workClass}
                onChange={(e) => setWorkClass(e.target.value)}
                disabled={isRunning}
              >
                <option>Code &amp; Software</option>
                <option>Research &amp; Analysis</option>
                <option>Data Processing</option>
                <option>Content &amp; Creative</option>
                <option>API &amp; Service Execution</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="sim-amount">
                Amount
              </label>
              <div className="input-addon">
                <input
                  id="sim-amount"
                  className="form-input"
                  type="number"
                  min="1"
                  step="1"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  disabled={isRunning}
                  placeholder="200"
                />
                <span className="input-addon-label">USDC</span>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="sim-outcome">
                Verification outcome
              </label>
              <select
                id="sim-outcome"
                className="form-select"
                value={outcome}
                onChange={(e) => setOutcome(e.target.value as Outcome)}
                disabled={isRunning}
              >
                <option value="release">Release → agent (verified ✓)</option>
                <option value="refund">Refund → principal (failed)</option>
                <option value="dispute">Dispute → funds frozen (fraud flag)</option>
              </select>
            </div>

            <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {!isDone ? (
                <button
                  className="simulate-btn"
                  onClick={runSimulation}
                  disabled={isRunning || !amount || parseFloat(amount) <= 0}
                >
                  {isRunning ? (
                    <>
                      <Loader size={15} className="terminal-spinner" />
                      Running…
                    </>
                  ) : (
                    <>
                      <Play size={15} />
                      Simulate settlement
                    </>
                  )}
                </button>
              ) : (
                <button className="reset-btn" onClick={reset}>
                  <RotateCcw size={14} style={{ display: "inline", marginRight: "0.4rem" }} />
                  Reset
                </button>
              )}
            </div>
          </div>

          <div className="simulator-terminal">
            <div className="terminal-bar">
              <span className="terminal-dot" style={{ background: "#ff5f57" }} />
              <span className="terminal-dot" style={{ background: "#febc2e" }} />
              <span className="terminal-dot" style={{ background: "#28c840" }} />
              <span className="terminal-title">onchain-rail · verification-service · simulate</span>
            </div>

            {simState === "idle" && (
              <div className="terminal-idle">
                <span className="terminal-prompt">$ </span>
                <span className="terminal-cmd">
                  rail simulate --amount {amount || "0"} --class "{workClass}" --network base
                </span>
                <div style={{ marginTop: "0.75rem", color: "var(--text-subtle)" }}>
                  Press "Simulate settlement" to run.
                </div>
              </div>
            )}

            {(isRunning || isDone) && (
              <>
                <div>
                  <span className="terminal-prompt">$ </span>
                  <span className="terminal-cmd">
                    rail simulate --amount {amount} --class "{workClass}" --outcome {outcome} --network base
                  </span>
                </div>

                <div className="terminal-lines">
                  {steps.map((step, i) => {
                    const done = completedSteps.includes(i);
                    const running = currentStep === i;
                    return (
                      <AnimatePresence key={i} mode="wait">
                        {(done || running || isDone) && (
                          <motion.div
                            className={`terminal-line ${done || isDone ? "done" : running ? "running" : ""}`}
                            initial={{ opacity: 0, x: -6 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <span style={{ flexShrink: 0, marginTop: "0.1rem" }}>
                              {done || isDone ? (
                                <CheckCircle size={13} />
                              ) : running ? (
                                <Loader size={13} className="terminal-spinner" />
                              ) : (
                                <Circle size={13} />
                              )}
                            </span>
                            <span>
                              {step.label}
                              <span
                                style={{
                                  display: "block",
                                  fontSize: "0.75rem",
                                  color: "var(--text-subtle)",
                                  marginTop: "0.1rem"
                                }}
                              >
                                {step.detail}
                              </span>
                            </span>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    );
                  })}
                </div>

                <AnimatePresence>
                  {receipt && (
                    <motion.div
                      className={`terminal-receipt ${receiptCfg.cls}`}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                    >
                      <p className={`receipt-title ${receiptCfg.cls}`}>
                        {receiptCfg.title}
                      </p>
                      <div style={{ display: "grid", gap: "0.3rem" }}>
                        {[
                          ["Work class", workClass],
                          ["Amount", receipt.amount],
                          ["Tx Hash", receipt.txHash],
                          ["Block", receipt.block],
                          ["Outcome", receipt.outcome],
                          ["Network", "Base Mainnet"]
                        ].map(([key, val]) => (
                          <div className="receipt-row" key={key}>
                            <span className="receipt-key">{key}</span>
                            <span className="receipt-val">{val}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

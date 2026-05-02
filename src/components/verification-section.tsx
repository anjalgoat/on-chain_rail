const EXPLAINER_CARDS = [
  {
    num: "01",
    title: "Commitment comes first",
    body: "The job starts with a structured commitment. It defines the scope of work, the evidence required, the verification class, the payout logic, and the fallback outcomes. No moving goalposts after delivery."
  },
  {
    num: "02",
    title: "Evidence is bounded",
    body: "Workers do not win by submitting more files, longer logs, or plausible-looking output. Only the evidence defined in advance counts — exact machine results, approved sources, workflow records, or evaluator-ready materials depending on the task."
  },
  {
    num: "03",
    title: "Settlement follows verification",
    body: "Once evidence is checked against the precommitted rules, the system routes to the right outcome: release, partial release, refund, retry, delayed finality, or dispute. Payment follows verification strength, not confidence theater."
  }
];

const VERIFICATION_CLASSES = [
  {
    id: "A",
    label: "Class A — Deterministic",
    bestFor: "Work that can be checked exactly",
    description:
      "The success condition is objective and machine-checkable. The system compares the submitted result to a fixed rule, exact state change, artifact hash, or formal constraint.",
    evidence: "API responses, exact output files, state transitions, receipts, hashes, formal pass/fail checks",
    posture: "Autonomous settlement may be allowed when exact checks pass and the audit record is created.",
    color: "var(--success)"
  },
  {
    id: "B",
    label: "Class B — Provenance-Grounded",
    bestFor: "Work tied to approved sources or workflows",
    description:
      "Correctness depends on where the result came from, not just what it looks like. Output must be grounded in approved sources, approved-domain collection, or constrained workflow records.",
    evidence: "Source links, approved-domain records, extraction traces, workflow session records, provenance logs",
    posture: "Autonomous settlement may be allowed, but only with source checks, provenance checks, and challenge rights.",
    color: "var(--info)"
  },
  {
    id: "C",
    label: "Class C — Evaluative",
    bestFor: "Work where quality or judgment matters",
    description:
      "Output can look polished while still missing the real objective. Strategic analysis, drafting quality, legal reasoning, or open-ended synthesis usually belong here.",
    evidence: "Drafts, analyses, source-backed materials, structured review inputs, evaluator context, review records",
    posture: "Requires stronger review. Delayed finality, challenge windows, evaluator rules, and adjudication may be needed.",
    color: "var(--warning)"
  },
  {
    id: "D",
    label: "Class D — Weakly Verifiable",
    bestFor: "Work where business outcome cannot be credibly proven",
    description:
      "Success depends on subjective satisfaction, future business impact, persuasion, or external outcomes that cannot be reliably verified in an autonomous system.",
    evidence: "Milestone records, limited delivery proof, fallback review materials, ratification paths where applicable",
    posture: "Exposure caps, smaller milestones, stronger fallback paths, and no exaggerated autonomy claims.",
    color: "var(--danger)"
  }
];

export function VerificationSection() {
  return (
    <>
      {/* Offchain verification explainer */}
      <section className="section" id="verification">
        <div className="container">
          <div className="section-header">
            <p className="section-label mono-label">Offchain acceptance layer</p>
            <h2 className="section-title">Verification is decided before the work begins.</h2>
            <div className="section-desc-block">
              <p className="section-desc">
                Onchain Rail does not release funds because output looks complete. It releases funds only when submitted
                work passes a precommitted acceptance path.
              </p>
              <p className="section-desc" style={{ marginTop: "1rem" }}>
                Before any work starts, the parties define what is being delivered, what evidence counts, how that
                evidence will be checked, and what happens if the result passes, fails, is disputed, or remains
                inconclusive. The verification itself happens offchain, because the real question is not whether money
                can move, but whether the work truly earned payment. The onchain rail then enforces the economic outcome
                that follows from that verified result.
              </p>
            </div>
          </div>
          <div className="explainer-cards">
            {EXPLAINER_CARDS.map((card) => (
              <div key={card.num} className="explainer-card">
                <span className="explainer-card-num">{card.num}</span>
                <p className="explainer-card-title">{card.title}</p>
                <p className="explainer-card-body">{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Verification classes */}
      <section className="section tone-surface" id="verification-classes">
        <div className="container">
          <div className="section-header">
            <p className="section-label">Verification classes</p>
            <h2 className="section-title">Not every kind of work can be verified the same way.</h2>
            <p className="section-desc">
              Some tasks can be checked exactly by machines. Some depend on trusted sources. Some require judgment.
              Some are too weakly verifiable to justify strong automation claims. Onchain Rail separates these cases
              so settlement posture matches the real verification strength.
            </p>
          </div>
          <div className="vclass-grid">
            {VERIFICATION_CLASSES.map((vc) => (
              <div key={vc.id} className="vclass-card">
                <div className="vclass-card-header">
                  <span className="vclass-id" style={{ color: vc.color }}>
                    {vc.id}
                  </span>
                  <p className="vclass-label">{vc.label}</p>
                  <p className="vclass-best-for">{vc.bestFor}</p>
                </div>
                <p className="vclass-desc">{vc.description}</p>
                <div className="vclass-row">
                  <p className="vclass-row-label">Evidence</p>
                  <p className="vclass-row-value">{vc.evidence}</p>
                </div>
                <div
                  className="vclass-posture"
                  style={{
                    borderColor: `color-mix(in srgb, ${vc.color} 25%, transparent)`,
                    background: `color-mix(in srgb, ${vc.color} 8%, transparent)`
                  }}
                >
                  <p className="vclass-posture-label" style={{ color: vc.color }}>
                    Settlement posture
                  </p>
                  <p className="vclass-posture-body">{vc.posture}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

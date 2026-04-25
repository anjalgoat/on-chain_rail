"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Code2, BookOpen, Database, FileText, Cpu } from "lucide-react";

type WorkClass = {
  id: string;
  icon: React.ElementType;
  label: string;
  description: string;
  guards: string[];
  exampleFlow: string[];
  fraudRisk: string;
};

const WORK_CLASSES: WorkClass[] = [
  {
    id: "code",
    icon: Code2,
    label: "Code & Software",
    description:
      "An AI agent writes a function, module, or feature. Verification checks test results, build artifacts, and code quality before releasing payment.",
    guards: [
      "Test suite passes at threshold",
      "Build artifact hash matches",
      "No plagiarism detected",
      "Delivery within time window"
    ],
    exampleFlow: [
      "Principal: 200 USDC to implement payment module",
      "Agent: Delivers PR with test results and hash",
      "Verifier: Confirms all checks pass",
      "Release: 200 USDC to agent"
    ],
    fraudRisk:
      "Fabricated test results, copied code from elsewhere, or incomplete delivery."
  },
  {
    id: "research",
    icon: BookOpen,
    label: "Research & Analysis",
    description:
      "An agent produces a research report. Verification validates sources, structure, and accuracy before payment.",
    guards: [
      "Sources are verifiable",
      "Output matches schema",
      "Coverage threshold met",
      "No hallucinated citations"
    ],
    exampleFlow: [
      "Principal: 500 USDC for DeFi protocol analysis",
      "Agent: Delivers structured report with citations",
      "Verifier: Checks sources and coverage",
      "Release: 500 USDC to agent"
    ],
    fraudRisk:
      "Hallucinated sources, plagiarized content, or shallow coverage disguised as complete work."
  },
  {
    id: "data",
    icon: Database,
    label: "Data Processing",
    description:
      "An agent labels, transforms, or validates a dataset. Verification checks schema, quality scores, and consistency before payment.",
    guards: [
      "Schema is valid",
      "Quality score meets threshold",
      "Record count matches input",
      "No duplicate rows or inflation"
    ],
    exampleFlow: [
      "Principal: 1,000 USDC for 50k row labeling",
      "Agent: Delivers labeled dataset with quality report",
      "Verifier: Validates schema and quality score",
      "Release: 1,000 USDC to agent"
    ],
    fraudRisk:
      "Inflated record counts, fake quality scores, or garbage data with valid headers."
  },
  {
    id: "content",
    icon: FileText,
    label: "Content & Creative",
    description:
      "An agent writes articles, docs, or scripts. Verification checks originality, format, and factual accuracy before payment.",
    guards: [
      "Originality above plagiarism threshold",
      "Format matches spec",
      "Factual claims verified",
      "No policy violations"
    ],
    exampleFlow: [
      "Principal: 150 USDC for 3 technical blog posts",
      "Agent: Delivers three Markdown files",
      "Verifier: Runs originality and fact checks",
      "Release: 150 USDC to agent"
    ],
    fraudRisk:
      "Recycled content, spec non-conformance, or factual claims from low-quality sources."
  },
  {
    id: "api",
    icon: Cpu,
    label: "API & Service Execution",
    description:
      "An agent executes API calls, inference jobs, or service pipelines. Verification checks schema, hash, and prevents replay attacks before payment.",
    guards: [
      "Response schema is valid",
      "Result hash matches",
      "Timestamp is in window",
      "No replay detected"
    ],
    exampleFlow: [
      "Principal: 75 USDC for batch inference run",
      "Agent: Delivers result with call log",
      "Verifier: Checks hash, schema, and replay log",
      "Release: 75 USDC to agent"
    ],
    fraudRisk:
      "Replayed prior results, fabricated hashes, or timestamp manipulation."
  }
];

export function WorkClasses() {
  const [activeId, setActiveId] = useState<string>("code");
  const active = WORK_CLASSES.find((w) => w.id === activeId)!;
  const Icon = active.icon;

  return (
    <section className="section" style={{ paddingTop: 0 }}>
      <div className="container">
        <div className="section-header">
          <p className="section-label">What agents can trade</p>
          <h2 className="section-title">Any type of autonomous work.</h2>
          <p className="section-desc">
            Code, research, data, content, or API execution. Pick a work class, define your guards, and the contract handles settlement the same way every time.
          </p>
        </div>

        <div className="work-classes-wrap">
          <div className="work-class-nav">
            {WORK_CLASSES.map((wc) => {
              const NavIcon = wc.icon;
              return (
                <button
                  key={wc.id}
                  className={`work-class-btn ${activeId === wc.id ? "active" : ""}`}
                  onClick={() => setActiveId(wc.id)}
                >
                  <span className="work-class-btn-icon">
                    <NavIcon size={15} />
                  </span>
                  <span className="work-class-btn-label">{wc.label}</span>
                </button>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeId}
              className="work-class-detail"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
            >
              <div className="work-class-header">
                <div className="work-class-header-icon">
                  <Icon size={20} />
                </div>
                <div>
                  <p className="work-class-title">{active.label}</p>
                  <p className="work-class-desc" style={{ marginTop: "0.5rem" }}>
                    {active.description}
                  </p>
                </div>
              </div>

              <div className="work-class-cols">
                <div>
                  <p className="work-class-col-title">Verification guards</p>
                  <ul className="work-class-list">
                    {active.guards.map((g) => (
                      <li key={g}>{g}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="work-class-col-title">Example settlement flow</p>
                  <ul className="work-class-list">
                    {active.exampleFlow.map((step) => (
                      <li key={step}>{step}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="work-class-fraud-box">
                <p className="work-class-fraud-label">Fraud risk for this class</p>
                <p style={{ margin: 0 }}>{active.fraudRisk}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  readingTime: string;
  tags: string[];
  body: string[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "what-is-onchain-rail",
    title: "What is Onchain Rail and why does it exist?",
    excerpt:
      "Most payment infrastructure treats the blockchain as an afterthought. Onchain Rail inverts that — the contract is the authoritative settlement layer, and the off-chain service is its gatekeeper.",
    publishedAt: "2026-04-25",
    readingTime: "4 min read",
    tags: ["product", "overview"],
    body: [
      "Traditional payment systems settle through opaque, centralized rails. You trust a counterparty to move money correctly, log it accurately, and handle disputes fairly. There's no public audit trail, and reversals are expensive and slow.",
      "Onchain Rail takes a different approach. The USDC escrow contract on Base Mainnet is the settlement layer. Every payout, refund, and dispute resolution is an on-chain transaction — publicly verifiable, permanently recorded, and governed by immutable contract logic.",
      "The off-chain lifecycle service acts as the gatekeeper. It evaluates delivery conditions, checks authorization guards, and decides whether a settlement should be released, refunded, or escalated. Nothing moves on-chain without its approval. This gives you programmable, rule-based settlement without sacrificing operator control.",
      "The current Phase 28 deployment is production-shaped: the contract is deployed and source-verified on Basescan, the sidecar service integrates with the smart contract via a typed Python client, and the deployment is fully documented. Live user funds aren't enabled yet — that gate opens after all external reviews pass."
    ]
  },
  {
    slug: "usdc-escrow-model-explained",
    title: "The USDC escrow model: how funds stay safe",
    excerpt:
      "The escrow contract holds USDC until the lifecycle service authorizes an outcome. No release, refund, or slash can happen without an authorized signal. Here's exactly how the fund-safety invariants work.",
    publishedAt: "2026-04-25",
    readingTime: "5 min read",
    tags: ["technical", "contract"],
    body: [
      "The core invariant is simple: USDC deposited into the escrow contract can only leave through one of three authorized paths — release to the intended recipient, refund to the depositor, or slash to a designated penalty address. Any other outcome is blocked at the contract level.",
      "The release path requires an explicit authorization from the operator-controlled lifecycle service. The contract verifies the authorization signature on-chain, checks the escrow record, and only then transfers USDC. There is no backdoor, no admin override, and no way to release funds without hitting the on-chain guard.",
      "The refund path is similarly gated. A depositor cannot unilaterally pull funds back. The lifecycle service must authorize the refund — which only happens when delivery conditions are definitively unmet or a timeout window expires. This prevents front-running and ensures the settlement flow completes cleanly.",
      "The slash path is reserved for fraud or material breach cases. It requires the highest-level authorization in the system and routes funds to a pre-configured penalty address, not back to either party. The event emitted is distinct and ledger-reconcilable.",
      "Every path emits structured events with the escrow ID, amount, recipient, block number, and authorization reference. The payment ledger can be fully reconstructed from on-chain events alone — no off-chain database required for the audit trail."
    ]
  },
  {
    slug: "lifecycle-state-machine-overview",
    title: "Understanding the settlement lifecycle state machine",
    excerpt:
      "A settlement goes through a defined sequence of states before it concludes. Each transition has guards that must pass, events that get emitted, and an on-chain effect. This post maps the full lifecycle.",
    publishedAt: "2026-04-25",
    readingTime: "6 min read",
    tags: ["technical", "lifecycle"],
    body: [
      "The settlement lifecycle is a formal state machine. Every escrow record starts in the Created state and moves through a defined set of transitions before reaching a terminal state. There are no shortcuts, no undefined transitions, and no way to skip a guard.",
      "Created → Funded: The depositor transfers USDC into the escrow contract. The contract verifies the amount matches the authorized figure and records the funding block. From this point, the funds are locked.",
      "Funded → In Review: The lifecycle service picks up the escrow record and begins evaluating delivery conditions. This is the only state where off-chain logic has full authority. The contract doesn't change; the service is deciding what outcome to authorize.",
      "In Review → Released: All delivery conditions pass. The lifecycle service signs a release authorization. The contract verifies the signature, transfers USDC to the recipient, and marks the escrow as settled. This is the happy path.",
      "In Review → Refunded: Delivery conditions are definitively unmet, or the evaluation timeout expires. The lifecycle service authorizes a refund. USDC returns to the depositor. The escrow is closed.",
      "In Review → Disputed: A party contests the outcome before the lifecycle service finalizes its decision. Funds freeze. A dispute record is written on-chain. The flow pauses until the dispute is resolved through an authorized resolution path.",
      "The state machine's value is in its predictability. Every participant — depositor, recipient, operator, auditor — can inspect the escrow's current state and understand exactly what can happen next and what authorization is required to make it happen."
    ]
  },
  {
    slug: "phase-28-mainnet-status",
    title: "Phase 28 mainnet deployment: what's live and what isn't",
    excerpt:
      "The UsdcSettlementEscrow contract is deployed and verified on Base Mainnet. Here's the precise status — what's working, what's gated, and what comes next.",
    publishedAt: "2026-04-25",
    readingTime: "3 min read",
    tags: ["deployment", "status"],
    body: [
      "The Phase 28 deployment represents the production-shaped v1 of Onchain Rail. The UsdcSettlementEscrow contract is deployed at 0x15E3...44d0 on Base Mainnet (block 45,167,721) and source-verified on Basescan. The sidecar Python client is integrated, the ABI is stable, and the deployment manifest is fully documented.",
      "What is live: the contract itself, the on-chain verification, the sidecar integration, and the full deployment tooling. What is not live: real user funds. The system is explicitly not approved to accept live settlements until all external security reviews complete and the operator key management process is hardened.",
      "The Phase 28 review identified one critical finding: the operator private key was temporarily exposed in a plaintext .env file during the deployment process. That key has been rotated. A hardened key management process — using a dedicated secrets manager and never writing keys to disk — is a pre-requisite for enabling live funds.",
      "The timeline to live funds is gated on three things: completion of the external security review, implementation of the hardened key management process, and a successful end-to-end fund-path exercise on a test deployment. No user capital is at risk while those gates are open."
    ]
  },
  {
    slug: "why-base-mainnet-for-usdc-settlement",
    title: "Why Base Mainnet for USDC settlement?",
    excerpt:
      "Base offers native USDC, low transaction costs, Ethereum security, and a growing ecosystem of on-chain tooling. For a settlement rail, those properties matter more than chain novelty.",
    publishedAt: "2026-04-25",
    readingTime: "3 min read",
    tags: ["infrastructure", "base"],
    body: [
      "The choice of Base Mainnet for the v1 deployment wasn't arbitrary. It came down to four properties that matter specifically for a settlement rail: native USDC availability, low and predictable transaction costs, Ethereum-equivalent security guarantees, and strong tooling support.",
      "Native USDC on Base means Onchain Rail works with Circle's canonical token — not a bridged or wrapped variant. For a settlement system, using the canonical token eliminates a class of bridge risk and simplifies reconciliation. The depositor transfers USDC; the recipient receives USDC. No wrapping, no bridging.",
      "Transaction costs on Base are low enough to make per-settlement on-chain operations economically viable. A release transaction costs a small fraction of a cent in gas. For high-frequency settlement use cases, this changes the math entirely — on-chain settlement stops being a premium feature and becomes the default.",
      "The Ethereum security model means that the Base Mainnet state is finalized through Ethereum's consensus mechanism. For a settlement system, that's the right security foundation. The contract can't be reorganized out of existence by a small-hashrate attacker.",
      "Finally, the tooling ecosystem on Base — Basescan verification, Foundry support, Cast for transaction management, the Circle USDC contracts — made the Phase 28 deployment straightforward. The implementation used standard, well-audited patterns throughout."
    ]
  }
];

export function getPostBySlug(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}

export function getRecentPosts(count: number = 3) {
  return blogPosts.slice(0, count);
}

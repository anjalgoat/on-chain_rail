export const siteConfig = {
  name: "Onchain Rail",
  title: "Governed acceptance and settlement for autonomous work — Base Mainnet.",
  description:
    "Onchain Rail is the governed acceptance and settlement layer for machine commerce. Funds release only when verification confirms delivery against rules fixed before the work began. Deployed and source-verified on Base Mainnet; not yet open for live user funds.",
  contract: {
    address: "0x15E379127cb242408ABc7A0F4d3d10f9065D44d0",
    addressShort: "0x15E3…44d0",
    href: "https://basescan.org/address/0x15E379127cb242408ABc7A0F4d3d10f9065D44d0",
    deploymentBlock: "45,167,721",
    network: "Base Mainnet"
  },
  nav: [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/blog", label: "Blog" }
  ],
  hero: {
    statusVerified: "Contract verified on Basescan",
    statusGated: "Not yet accepting live user funds",
    heading: "Governed acceptance and settlement for autonomous work.",
    body: "Onchain Rail binds commitment, policy, evidence, verification, settlement, and audit into one governed acceptance path. Funds release only when verification confirms delivery against rules fixed before the work began.",
    primaryCta: { href: "https://basescan.org/address/0x15E379127cb242408ABc7A0F4d3d10f9065D44d0", label: "Inspect contract on Basescan", external: true },
    secondaryCta: { href: "#how-it-works", label: "Read the lifecycle", external: false },
    tertiaryCta: { href: "#what-we-are-not", label: "Read what we are not", external: false }
  },
  trustStrip: {
    label: "Deployed, verified, and inspectable",
    items: [
      { label: "Base", sublabel: "Mainnet" },
      { label: "USDC", sublabel: "Native" },
      { label: "Foundry", sublabel: "Verified build" },
      { label: "Basescan", sublabel: "Source verified" },
      { label: "Open source", sublabel: "Public spec" }
    ]
  },
  milestones: [
    { label: "Contract deployed", value: "Block 45,167,721", status: "done" as const },
    { label: "Source verified", value: "Basescan", status: "done" as const },
    { label: "External audit", value: "In progress", status: "active" as const },
    { label: "Live user funds", value: "Gated", status: "blocked" as const }
  ],
  about: {
    heading: "Governed acceptance and settlement for autonomous work",
    body: [
      "Onchain Rail is the governed acceptance and settlement layer for machine commerce. Before any work starts, the parties define what is being delivered, what evidence counts, how that evidence will be checked, and what happens if the result passes, fails, is disputed, or remains inconclusive.",
      "Funds release only when verification confirms delivery against a precommitted acceptance path — not because output looks complete or plausible. The verification itself happens offchain, because the real question is not whether money can move, but whether the work truly earned payment. The onchain rail then enforces the economic outcome that follows from that verified result.",
      "Onchain Rail separates work into four verification classes: deterministic, provenance-grounded, evaluative, and weakly verifiable. Settlement posture matches the real verification strength of the task. Not all autonomous work is equally verifiable, and the system does not pretend otherwise.",
      "The Phase 28 contract is deployed and source-verified on Basescan. The system is not yet approved to accept live user funds — that gate opens after all guard checks and external security reviews pass."
    ]
  },
  footer: {
    columns: [
      {
        title: "Product",
        links: [
          { href: "/", label: "Home" },
          { href: "/about", label: "About" },
          { href: "/blog", label: "Blog" }
        ]
      },
      {
        title: "Proof",
        links: [
          { href: "https://basescan.org/address/0x15E379127cb242408ABc7A0F4d3d10f9065D44d0", label: "Contract ↗", external: true },
          { href: "/#how-it-works", label: "Lifecycle" },
          { href: "/#simulator", label: "Simulator" }
        ]
      },
      {
        title: "Contact",
        links: [
          { href: "mailto:security@onchain-rail.xyz", label: "security@onchain-rail.xyz" }
        ]
      }
    ],
    disclosure:
      "Onchain Rail does not custody user funds outside the escrow contract. The system is in pre-launch and not yet approved to accept live user funds.",
    lastUpdated: "2026-05-02"
  }
};

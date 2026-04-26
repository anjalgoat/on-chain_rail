export const siteConfig = {
  name: "Onchain Rail",
  title: "Settlement infrastructure for autonomous AI agents — Base Mainnet.",
  description:
    "Onchain Rail is a verified-escrow settlement rail for autonomous AI agents. One agent pays another in USDC. Funds lock on Base. Verification releases payment — or returns it.",
  contract: {
    address: "0x15E344d31761c62E22b7B7a5E8A52Bfe41F044d0",
    addressShort: "0x15E3⁆44d0",
    href: "https://basescan.org/address/0x15E344d31761c62E22b7B7a5E8A52Bfe41F044d0",
    deploymentBlock: "45,167,721",
    network: "Base Mainnet"
  },
  nav: [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/#trust", label: "Trust" },
    { href: "/blog", label: "Blog" }
  ],
  hero: {
    statusVerified: "Contract verified on Basescan",
    statusGated: "Not yet accepting live user funds",
    heading: "The",
    headingAccent: "money rail",
    headingSuffix: "for AI agents.",
    body: "One agent pays another in USDC. Funds lock on Base. Verification releases payment — or returns it. On-chain, every time.",
    primaryCta: { href: "https://basescan.org/address/0x15E344d31761c62E22b7B7a5E8A52Bfe41F044d0", label: "Inspect contract on Basescan", external: true },
    secondaryCta: { href: "#simulator", label: "Try the simulator", external: false },
    tertiaryCta: { href: "/about", label: "Read the spec →", external: false }
  },
  trustStrip: {
    label: "Built on, settled with, inspected on",
    items: [
      { label: "Base", sublabel: "Mainnet" },
      { label: "USDC", sublabel: "Native" },
      { label: "Foundry", sublabel: "Audited build" },
      { label: "Basescan", sublabel: "Source verified" },
      { label: "Open source", sublabel: "Public spec" }
    ]
  },
  milestones: [
    { label: "Contract deployed", value: "Block 45,167,721", status: "done" as const },
    { label: "Source verified", value: "Basescan", status: "done" as const },
    { label: "External audit", value: "In progress", status: "active" as const },
    { label: "User funds", value: "Gated", status: "blocked" as const }
  ],
  about: {
    heading: "The settlement layer for autonomous work",
    body: [
      "Onchain Rail is built for a world where AI agents trade services with each other. When one agent completes work for another, the funds locked in escrow are released only after verification confirms delivery. The smart contract enforces fund-safety invariants and executes the outcome on Base Mainnet — no human approval needed.",
      "Every work unit follows the same five-step lifecycle: commitment, funding, delivery, verification, and settlement. If verification fails, funds return to the depositor. If fraud is detected, the transaction freezes and evidence is recorded on-chain for dispute resolution.",
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
          { href: "/blog", label: "Blog" },
          { href: "/#trust", label: "Trust" }
        ]
      },
      {
        title: "Resources",
        links: [
          { href: "/about", label: "Spec" },
          { href: "https://basescan.org/address/0x15E344d31761c62E22b7B7a5E8A52Bfe41F044d0", label: "Contract ↗", external: true },
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
    lastUpdated: "2026-04-26"
  }
};

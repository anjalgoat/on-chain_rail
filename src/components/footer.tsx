import Link from "next/link";
import { siteConfig } from "@/content/site";

export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-inner">
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <Link className="footer-brand" href="/">
              <span
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 5,
                  background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0
                }}
                aria-hidden="true"
              >
                <svg width="11" height="11" viewBox="0 0 14 14" fill="none">
                  <path d="M7 1L13 4V10L7 13L1 10V4L7 1Z" fill="white" opacity="0.9" />
                </svg>
              </span>
              {siteConfig.name}
            </Link>
            <p className="footer-copy">USDC settlement infrastructure · Base Mainnet</p>
          </div>
          <div className="footer-links">
            {siteConfig.nav.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
          </div>
          <p className="footer-copy">
            Contract verified ·{" "}
            <a
              href="https://basescan.org/address/0x15E344d31761c62E22b7B7a5E8A52Bfe41F044d0"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--accent-light)", textDecoration: "underline", textDecorationColor: "rgba(129,140,248,0.4)" }}
            >
              0x15E3…44d0
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

import Link from "next/link";
import { siteConfig } from "@/content/site";

function RailMark() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{ color: "var(--accent-light)" }}
    >
      <rect x="3" y="3" width="16" height="16" rx="3" stroke="currentColor" strokeWidth="1.5" opacity="0.45" />
      <path d="M4.5 8 L17.5 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M4.5 14 L17.5 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="11" cy="11" r="1.6" fill="currentColor" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand-block">
            <Link className="footer-brand" href="/">
              <RailMark />
              {siteConfig.name}
            </Link>
            <p className="footer-tagline">
              Governed acceptance and settlement for autonomous work. Deployed on Base Mainnet.
            </p>
            <p className="footer-tagline" style={{ fontFamily: "ui-monospace, monospace", fontSize: "0.78rem" }}>
              Contract:{" "}
              <a
                href={siteConfig.contract.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "var(--accent-light)" }}
              >
                {siteConfig.contract.addressShort}
              </a>
            </p>
          </div>

          {siteConfig.footer.columns.map((col) => (
            <div key={col.title}>
              <p className="footer-col-title">{col.title}</p>
              <div className="footer-col-links">
                {col.links.map((link) =>
                  "external" in link && link.external ? (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link key={link.href} href={link.href}>
                      {link.label}
                    </Link>
                  )
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="footer-bottom">
          <p className="footer-disclosure">{siteConfig.footer.disclosure}</p>
          <p className="footer-meta">
            © {new Date().getFullYear()} {siteConfig.name} · Updated{" "}
            <span className="tabular-nums">{siteConfig.footer.lastUpdated}</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

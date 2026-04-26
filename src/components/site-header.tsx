import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/content/site";

function RailMark() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="16" height="16" rx="3" stroke="currentColor" strokeWidth="1.5" opacity="0.45" />
      <path d="M4.5 8 L17.5 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M4.5 14 L17.5 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="11" cy="11" r="1.6" fill="currentColor" />
    </svg>
  );
}

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="container">
        <div className="header-inner">
          <Link className="brand" href="/">
            <span className="brand-mark">
              <RailMark />
            </span>
            <span>{siteConfig.name}</span>
          </Link>
          <nav className="nav" aria-label="Main navigation">
            {siteConfig.nav.map((item) => (
              <Link key={item.href} className="nav-link" href={item.href}>
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="nav-actions">
            <a
              className="nav-cta"
              href={siteConfig.contract.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Verify the Onchain Rail contract on Basescan"
            >
              Verify on Basescan
              <ArrowUpRight size={13} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

import type { Metadata } from "next";
import { Inter, IBM_Plex_Serif } from "next/font/google";

import "./globals.css";
import { Footer } from "@/components/footer";
import { SiteHeader } from "@/components/site-header";
import { siteConfig } from "@/content/site";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap"
});

const plexSerif = IBM_Plex_Serif({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-serif",
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL("https://on-chain-rail.vercel.app"),
  title: {
    default: siteConfig.name,
    template: `%s — ${siteConfig.name}`
  },
  description: siteConfig.description,
  alternates: {
    canonical: "/"
  },
  keywords: [
    "USDC settlement",
    "onchain escrow",
    "Base Mainnet",
    "smart contract settlement",
    "programmable payments",
    "stablecoin infrastructure",
    "EVM escrow",
    "AI agent payments"
  ],
  authors: [{ name: "Onchain Rail" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://on-chain-rail.vercel.app",
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description
  },
  robots: {
    index: true,
    follow: true
  },
  other: {
    "base:app_id": "69f2a1186daaf9236cfba3d8",
    "fc:miniapp": JSON.stringify({
      version: "next",
      imageUrl: "https://on-chain-rail.vercel.app/miniapp/og.svg",
      button: {
        title: "Open Onchain Rail",
        action: {
          type: "launch_miniapp",
          name: siteConfig.name,
          url: "https://on-chain-rail.vercel.app",
          splashImageUrl: "https://on-chain-rail.vercel.app/miniapp/icon.svg",
          splashBackgroundColor: "#0b1020"
        }
      }
    })
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={`${inter.variable} ${plexSerif.variable}`} lang="en">
      <body>
        <div className="page-frame">
          <SiteHeader />
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}

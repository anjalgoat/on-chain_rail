import { siteConfig } from "@/content/site";

export function TrustStrip() {
  return (
    <div className="trust-strip">
      <div className="container">
        <div className="trust-strip-inner">
          <span className="trust-strip-label">{siteConfig.trustStrip.label}</span>
          <div className="trust-strip-items">
            {siteConfig.trustStrip.items.map((item) => (
              <div key={item.label} className="trust-strip-item">
                <span className="trust-strip-item-label">{item.label}</span>
                <span className="trust-strip-item-sub">{item.sublabel}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

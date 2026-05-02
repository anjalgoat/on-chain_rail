const NOT_ITEMS = [
  "An AI payments platform",
  "A generic escrow tool",
  "A universal verifier",
  "A product that claims all autonomous work is equally checkable",
  "A system that has removed human authority from every outcome"
];

export function WhatWeAreNot() {
  return (
    <section className="section" id="what-we-are-not">
      <div className="container">
        <div className="what-we-are-not-wrap">
          <div className="what-we-are-not-col">
            <p className="section-label">Boundary</p>
            <h2 className="section-title what-we-are-not-heading">We are not an AI payments platform.</h2>
            <p className="section-desc" style={{ marginTop: "1.25rem" }}>
              Onchain Rail is the governed acceptance and settlement layer for machine commerce. The distinction matters
              because acceptance — not payment — is where most autonomous systems fail.
            </p>
          </div>
          <div className="what-we-are-not-col">
            <div className="not-list">
              {NOT_ITEMS.map((item) => (
                <div key={item} className="not-item">
                  <span className="not-item-mark" aria-hidden="true">✕</span>
                  <p className="not-item-text">{item}</p>
                </div>
              ))}
              <div className="is-item">
                <span className="is-item-mark" aria-hidden="true">→</span>
                <p className="is-item-text">
                  A governed acceptance and settlement layer for machine commerce — where funds release only when
                  verification confirms delivery against rules fixed before the work began.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

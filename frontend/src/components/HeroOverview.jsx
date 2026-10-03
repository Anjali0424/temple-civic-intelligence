export default function HeroOverview() {
  return (
    <section className="hero glass" aria-labelledby="hero-title">
      <div className="hero-decor" aria-hidden="true">
        <span className="orb orb-1" /><span className="orb orb-2" /><span className="orb orb-3" />
        <span className="ring ring-1" /><span className="ring ring-2" />
      </div>
      <div className="hero-left">
        <p className="hero-greet">Good Morning, Operator</p>
        <h1 id="hero-title">Crowd is under control</h1>
        <p className="hero-sub">Real-time intelligence for safer gatherings</p>
        <div className="hero-status">
          <span className="live-pill"><span className="dot" /> System Live</span>
          <span className="hero-cams">All 20 cameras connected</span>
        </div>
      </div>
      <div className="hero-right">
        <p className="hero-label">Total People</p>
        <p className="hero-total">12,486</p>
        <p className="hero-delta"><span className="up">↑ +12%</span> <span>from last hour</span></p>
      </div>
    </section>
  );
}

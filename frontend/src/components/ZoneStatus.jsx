import { zones } from "../data/mockData";

const fill = { Normal: "#22c55e", Moderate: "#f59e0b", High: "#f97316", Critical: "#ef4444" };

export default function ZoneStatus() {
  return (
    <section className="card glass span-5" aria-labelledby="zone-map-title">
      <div className="card-head">
        <h2 id="zone-map-title">Zone Status</h2>
        <button className="link-btn">View All Zones <span aria-hidden="true">→</span></button>
      </div>
      <svg viewBox="0 0 400 250" className="venue-map" role="img" aria-label="Venue schematic with 4 zones: A normal, B moderate, C high, D normal">
        <rect x="12" y="12" width="376" height="226" rx="18" className="map-frame" />
        <g className="zone-g">
          <rect x="30" y="30" width="160" height="90" rx="12" fill="#22c55e22" stroke="#22c55e" />
          <text x="42" y="60">Zone A</text><text x="42" y="78" className="sub">Main Entrance</text>
        </g>
        <g className="zone-g">
          <rect x="210" y="30" width="160" height="90" rx="12" fill="#f59e0b26" stroke="#f59e0b" />
          <text x="222" y="60">Zone B</text><text x="222" y="78" className="sub">Queue Area</text>
        </g>
        <g className="zone-g">
          <rect x="30" y="136" width="160" height="86" rx="12" fill="#f9731626" stroke="#f97316" />
          <text x="42" y="166">Zone C</text><text x="42" y="184" className="sub">Inner Premises</text>
        </g>
        <g className="zone-g">
          <rect x="210" y="136" width="160" height="86" rx="12" fill="#22c55e22" stroke="#22c55e" />
          <text x="222" y="166">Zone D</text><text x="222" y="184" className="sub">Exit Area</text>
        </g>
        <line x1="200" y1="30" x2="200" y2="222" className="map-flow" strokeDasharray="6 6" />
        <line x1="30" y1="128" x2="370" y2="128" className="map-flow" strokeDasharray="6 6" />
      </svg>
      <ul className="zone-legend">
        {zones.map((z) => (
          <li key={z.id}>
            <span className="swatch" style={{ background: fill[z.status] || "#22c55e" }} aria-hidden="true" />
            {z.name} <small>· {z.status}</small>
          </li>
        ))}
      </ul>
      <p className="legend-row" aria-label="Density legend">
        <span><i className="swatch" style={{ background: "#22c55e" }} /> Low</span>
        <span><i className="swatch" style={{ background: "#f59e0b" }} /> Moderate</span>
        <span><i className="swatch" style={{ background: "#f97316" }} /> High</span>
        <span><i className="swatch" style={{ background: "#ef4444" }} /> Critical</span>
      </p>
    </section>
  );
}

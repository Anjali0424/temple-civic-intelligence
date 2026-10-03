export function ZoneStatusBadge({ status }) {
  return <span className={`chip st-${status.toLowerCase()}`}>{status.toUpperCase()}</span>;
}

// Schematic venue layout (no external map API). Positions are illustrative.
const layout = {
  A: { x: 20, y: 20, w: 180, h: 150 },
  B: { x: 215, y: 20, w: 180, h: 150 },
  C: { x: 410, y: 20, w: 180, h: 150 },
  E: { x: 605, y: 20, w: 175, h: 150 },
  F: { x: 20, y: 185, w: 180, h: 140 },
  G: { x: 215, y: 185, w: 180, h: 140 },
  D: { x: 410, y: 185, w: 180, h: 140 },
  H: { x: 605, y: 185, w: 175, h: 140 },
};

const palette = {
  Normal: { fill: "rgba(34,197,94,.13)", stroke: "#22c55e" },
  Moderate: { fill: "rgba(245,158,11,.15)", stroke: "#f59e0b" },
  High: { fill: "rgba(249,115,22,.15)", stroke: "#f97316" },
  Critical: { fill: "rgba(239,68,68,.15)", stroke: "#ef4444" },
};

export default function VenueZoneMap({ zones, selectedId, onSelect, flows }) {
  const cx = (r) => r.x + r.w / 2;
  return (
    <section className="card glass zone-map-card" aria-labelledby="venue-map-title">
      <div className="card-head">
        <h2 id="venue-map-title">Venue Zone Map</h2>
        <span className="map-hint">Schematic layout · select a zone</span>
      </div>
      <svg viewBox="0 0 800 345" className="venue-svg" role="group" aria-label="Schematic venue zone map">
        <rect x="4" y="4" width="792" height="337" rx="20" className="map-frame" />
        {flows.map((f, i) => {
          const a = layout[f.from], b = layout[f.to];
          if (!a || !b) return null;
          const x1 = cx(a), y1 = a.y + a.h / 2, x2 = cx(b), y2 = b.y + b.h / 2;
          const mx = (x1 + x2) / 2;
          return (
            <g key={i} aria-hidden="true">
              <line x1={x1} y1={y1} x2={x2} y2={y2} className="zone-flow-line" strokeDasharray="6 6" />
              <text x={mx} y={(y1 + y2) / 2 - 8} className="flow-label" textAnchor="middle">+{f.rate}/min</text>
            </g>
          );
        })}
        {zones.map((z) => {
          const r = layout[z.id];
          if (!r) return null;
          const p = palette[z.status] || palette.Normal;
          const sel = z.id === selectedId;
          const pct = Math.round((z.occupancy / z.capacity) * 100);
          return (
            <g key={z.id} role="button" tabIndex={0} className={`zone-node ${sel ? "selected" : ""}`}
              aria-label={`${z.name}, ${z.location}, ${z.status}, ${pct} percent occupied. Activate for details.`}
              aria-pressed={sel}
              onClick={() => onSelect(z.id)}
              onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onSelect(z.id); } }}>
              <rect x={r.x} y={r.y} width={r.w} height={r.h} rx="14"
                fill={p.fill} stroke={p.stroke} strokeWidth={sel ? 3.5 : 1.8} />
              {sel && <rect x={r.x - 5} y={r.y - 5} width={r.w + 10} height={r.h + 10} rx="18" className="zone-sel-ring" />}
              <text x={r.x + 14} y={r.y + 30} className="zone-t">{z.name}</text>
              <text x={r.x + 14} y={r.y + 48} className="zone-sub">{z.location}</text>
              <text x={r.x + 14} y={r.y + r.h - 42} className="zone-occ">{z.occupancy.toLocaleString()} / {z.capacity.toLocaleString()}</text>
              <text x={r.x + 14} y={r.y + r.h - 20} className="zone-pct" fill={p.stroke}>{pct}% · {z.status}{z.restricted ? " · Restricted" : ""}</text>
            </g>
          );
        })}
      </svg>
      <p className="legend-row" aria-label="Density legend">
        <span><i className="swatch" style={{ background: "#22c55e" }} /> Normal</span>
        <span><i className="swatch" style={{ background: "#f59e0b" }} /> Moderate</span>
        <span><i className="swatch" style={{ background: "#f97316" }} /> High</span>
        <span><i className="swatch" style={{ background: "#ef4444" }} /> Critical</span>
      </p>
    </section>
  );
}

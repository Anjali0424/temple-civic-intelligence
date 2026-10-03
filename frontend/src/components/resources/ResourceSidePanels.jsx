import { TriangleAlert } from "lucide-react";

// Schematic deployment overview (illustrative positions — no GPS).
const spots = {
  A: { x: 90, y: 80 }, B: { x: 250, y: 80 }, C: { x: 410, y: 80 }, D: { x: 570, y: 80 },
  E: { x: 680, y: 80 }, F: { x: 90, y: 210 }, G: { x: 250, y: 210 }, H: { x: 410, y: 210 },
};
const typeMark = { "Field Officer": { bg: "#5b5bd6" }, "Medical Team": { bg: "#16a34a" }, "Security Team": { bg: "#8b5cf6" }, Vehicle: { bg: "#0891b2" } };

export function ResourceDeploymentMap({ resources }) {
  const byZone = {};
  resources.filter((r) => r.status !== "Available" || true).forEach((r) => {
    if (!["Deployed", "Responding", "Assigned"].includes(r.status)) return;
    (byZone[r.zone] = byZone[r.zone] || []).push(r);
  });
  return (
    <section className="card glass" aria-labelledby="deploy-map-title">
      <div className="card-head"><div><h2 id="deploy-map-title">Resource Deployment Map</h2>
      <p className="chart-sub">Schematic distribution · not GPS-tracked</p></div></div>
      <svg viewBox="0 0 760 280" className="deploy-svg" role="img" aria-label="Schematic map of deployed resources by zone">
        <rect x="4" y="4" width="752" height="272" rx="18" className="map-frame" />
        {Object.entries(spots).map(([z, p]) => {
          const list = byZone[z] || [];
          return (
            <g key={z}>
              <rect x={p.x - 62} y={p.y - 42} width={124} height={118} rx={12} className="deploy-zone" />
              <text x={p.x} y={p.y - 20} textAnchor="middle" className="deploy-zone-t">Zone {z}</text>
              {list.length === 0 && <text x={p.x} y={p.y + 30} textAnchor="middle" className="deploy-empty">— staged —</text>}
              {list.slice(0, 4).map((r, i) => {
                const m = typeMark[r.type];
                return (
                  <g key={r.id} transform={`translate(${p.x - 45 + (i % 2) * 52}, ${p.y - 8 + Math.floor(i / 2) * 34})`}>
                    <title>{`${r.name} · ${r.status}`}</title>
                    <rect width={44} height={28} rx={8} fill={m.bg} opacity={r.status === "Responding" ? 1 : 0.85} />
                    <text x={22} y={19} textAnchor="middle" className="deploy-mark">
                      {r.type === "Field Officer" ? "O" : r.type === "Medical Team" ? "M" : r.type === "Security Team" ? "S" : "V"}
                    </text>
                  </g>
                );
              })}
              {list.length > 4 && <text x={p.x} y={p.y + 68} textAnchor="middle" className="deploy-empty">+{list.length - 4} more</text>}
            </g>
          );
        })}
      </svg>
      <p className="legend-row" aria-label="Marker legend">
        <span><i className="swatch" style={{ background: "#5b5bd6" }} /> Officer (O)</span>
        <span><i className="swatch" style={{ background: "#16a34a" }} /> Medical (M)</span>
        <span><i className="swatch" style={{ background: "#8b5cf6" }} /> Security (S)</span>
        <span><i className="swatch" style={{ background: "#0891b2" }} /> Vehicle (V)</span>
      </p>
    </section>
  );
}

const needColor = { Critical: "st-critical", High: "st-high", Moderate: "st-moderate", Normal: "st-normal" };

export function ZoneResourceNeeds({ needs }) {
  return (
    <section className="card glass" aria-labelledby="zone-needs-title">
      <div className="card-head"><h2 id="zone-needs-title">Zone Resource Needs</h2></div>
      <ul className="needs-list">
        {needs.map((n) => (
          <li key={n.zone} className="needs-row">
            <TriangleAlert size={15} aria-hidden="true" className={`needs-icon lv-${n.level.toLowerCase()}`} />
            <div><strong>{n.zone}</strong><small>{n.reason}</small></div>
            <span className={`chip ${needColor[n.level]}`}>{n.need}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function ResourceActivity({ activity }) {
  return (
    <section className="card glass" aria-labelledby="res-activity-title">
      <div className="card-head"><h2 id="res-activity-title">Recent Resource Activity</h2></div>
      <ol className="ops-timeline">
        {activity.map((a, i) => (
          <li key={i}><span className="tl-dot" aria-hidden="true" /><div><p>{a.text}</p><strong>{a.time}</strong></div></li>
        ))}
      </ol>
    </section>
  );
}

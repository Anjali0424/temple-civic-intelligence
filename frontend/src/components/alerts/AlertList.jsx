import { ChevronRight, Flame, TrendingUp, TriangleAlert, Info, VideoOff, SignalLow, Footprints, DoorOpen, Users } from "lucide-react";
import { SeverityBadge, StatusBadge } from "./AlertSummary";

const typeIcons = {
  "High Density": Flame, "Capacity Threshold": TrendingUp, "Unusual Movement": Footprints,
  "Restricted Zone": DoorOpen, "Camera Offline": VideoOff, "Camera Degraded": SignalLow,
  "Bottleneck": Users, "Sudden Increase": TrendingUp, Other: Info,
};

const sevDot = { Critical: "#ef4444", High: "#f97316", Warning: "#f59e0b", Info: "#3b82f6" };

export function AlertTabs({ tab, onTab }) {
  return (
    <div className="alert-tabs" role="tablist" aria-label="Alert filter tabs">
      {["Active", "All", "Resolved"].map((t) => (
        <button key={t} role="tab" aria-selected={tab === t} className={`alert-tab ${tab === t ? "on" : ""}`} onClick={() => onTab(t)}>{t}</button>
      ))}
    </div>
  );
}

export default function AlertList({ alerts, selectedId, onSelect, onClearFilters }) {
  if (!alerts.length) {
    return (
      <section className="glass empty-state" aria-live="polite">
        <h2>No alerts match these filters</h2>
        <p>Try a different search term or filter combination.</p>
        <button className="qa-btn primary" onClick={onClearFilters}>Clear filters</button>
      </section>
    );
  }
  return (
    <section className="card glass alert-list-card" aria-label="Alert list">
      <div className="card-head"><h2>Active Alerts</h2><span className="map-hint">{alerts.length} shown</span></div>
      <ul className="ops-alert-list">
        {alerts.map((a) => {
          const Icon = typeIcons[a.type] || Info;
          const sel = a.id === selectedId;
          const pct = Math.round((a.occupancy / a.capacity) * 100);
          return (
            <li key={a.id}>
              <button className={`ops-alert-row sev-accent-${a.severity.toLowerCase()} ${sel ? "selected" : ""}`}
                onClick={() => onSelect(a.id)} aria-pressed={sel}
                aria-label={`${a.severity} ${a.title}, ${a.zoneName}, ${a.time}, status ${a.status}`}>
                <span className="sev-dot" style={{ background: sevDot[a.severity] }} aria-hidden="true" />
                <span className={`sev sev-${a.severity.toLowerCase()}`}><Icon size={16} aria-hidden="true" /></span>
                <span className="ops-alert-main">
                  <span className="ops-alert-title">{a.title}</span>
                  <span className="ops-alert-loc">{a.zoneName}{a.camera ? ` · ${a.camera}` : ""} · {a.time}</span>
                  <span className="ops-alert-metric">{a.occupancy.toLocaleString()} / {a.capacity.toLocaleString()} people ({pct}%)</span>
                </span>
                <span className="ops-alert-side">
                  <SeverityBadge severity={a.severity} />
                  <StatusBadge status={a.status} />
                </span>
                <ChevronRight size={15} aria-hidden="true" className="ops-chev" />
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

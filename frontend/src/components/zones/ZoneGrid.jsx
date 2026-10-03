import { ArrowDown, Lock } from "lucide-react";
import { ZoneStatusBadge } from "./VenueZoneMap";

export function ZoneCard({ zone, selected, onSelect }) {
  const pct = Math.round((zone.occupancy / zone.capacity) * 100);
  const net = zone.entering - zone.exiting;
  return (
    <article className={`glass zone-card ${selected ? "selected" : ""}`} aria-label={`${zone.name} ${zone.location}, ${pct} percent, ${zone.status}`}>
      <button className="zone-card-click" onClick={() => onSelect(zone.id)} aria-pressed={selected}
        aria-label={`Select ${zone.name} for details`}>
        <div className="zone-card-top"><strong>{zone.name}</strong><ZoneStatusBadge status={zone.status} /></div>
        <p className="zone-card-loc">{zone.location} · {zone.type} {zone.restricted && <Lock size={12} aria-label="Restricted" />}</p>
        <p className="zone-card-occ">{zone.occupancy.toLocaleString()} / {zone.capacity.toLocaleString()} <span>· {pct}%</span></p>
        <div className="bar" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} aria-label={`${zone.name} occupancy`}>
          <span className={`fill st-${zone.status.toLowerCase()}`} style={{ width: `${pct}%` }} />
        </div>
        <div className="zone-card-meta">
          <span>In <strong>{zone.entering}/min</strong></span>
          <span>Out <strong>{zone.exiting}/min</strong></span>
          <span>Net <strong>{net >= 0 ? "+" : ""}{net}</strong></span>
          <span>Cams <strong>{zone.cameras.length}</strong></span>
        </div>
      </button>
    </article>
  );
}

export function ZoneFlow({ flows }) {
  return (
    <section className="card glass zone-flow" aria-label="Inter-zone flow">
      <div className="card-head"><h2>Zone Flow</h2><span className="map-hint">Aggregate movement · people/min</span></div>
      <ol className="flow-path">
        {flows.map((f, i) => (
          <li key={i}>
            <span className="flow-edge"><strong>{f.from}</strong> → <strong>{f.to}</strong></span>
            <span className="flow-rate">+{f.rate} people/min</span>
            {i < flows.length - 1 && <ArrowDown size={13} aria-hidden="true" />}
          </li>
        ))}
      </ol>
      <p className="muted small">Aggregate flow rates only — no individual identity tracking.</p>
    </section>
  );
}

export default function ZoneGrid({ zones, view, selectedId, onSelect, onClearFilters }) {
  if (!zones.length) {
    return (
      <section className="glass empty-state" aria-live="polite">
        <h2>No zones match these filters</h2>
        <p>Try a different search term or filter combination.</p>
        <button className="qa-btn primary" onClick={onClearFilters}>Clear filters</button>
      </section>
    );
  }
  if (view === "list") {
    return (
      <section className="glass zone-list" aria-label="Zones, list view">
        <div className="zone-list-head" aria-hidden="true">
          <span>Zone</span><span>Location</span><span>Occupancy</span><span>Capacity</span><span>%</span><span>Density</span><span>Flow</span><span>Cams</span><span>Status</span>
        </div>
        {zones.map((z) => {
          const pct = Math.round((z.occupancy / z.capacity) * 100);
          return (
            <button key={z.id} className={`zone-list-row ${z.id === selectedId ? "selected" : ""}`} onClick={() => onSelect(z.id)}
              aria-label={`${z.name} ${z.location}, ${pct} percent, ${z.status}`}>
              <strong>{z.name}</strong><span>{z.location}</span><span>{z.occupancy.toLocaleString()}</span>
              <span>{z.capacity.toLocaleString()}</span><span>{pct}%</span><span>{z.density}</span>
              <span>+{z.entering - z.exiting}/min</span><span>{z.cameras.length}</span>
              <span><ZoneStatusBadge status={z.status} /></span>
            </button>
          );
        })}
      </section>
    );
  }
  return (
    <section className="zone-grid" aria-label="Zones, grid view">
      {zones.map((z) => <ZoneCard key={z.id} zone={z} selected={z.id === selectedId} onSelect={onSelect} />)}
    </section>
  );
}

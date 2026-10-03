import { UserCheck, HeartPulse, ShieldCheck, Car, ChevronRight } from "lucide-react";
import { ResourceStatusBadge } from "./ResourceSummary";

const typeIcon = { "Field Officer": UserCheck, "Medical Team": HeartPulse, "Security Team": ShieldCheck, Vehicle: Car };

export function ResourceCard({ resource: r, selected, onSelect, onAssign }) {
  const Icon = typeIcon[r.type] || UserCheck;
  return (
    <article className={`glass res-card ${selected ? "selected" : ""}`} aria-label={`${r.name}, ${r.type}, ${r.status}`}>
      <button className="res-card-click" onClick={() => onSelect(r.id)} aria-pressed={selected}
        aria-label={`Select ${r.name} for details`}>
        <span className="res-avatar"><Icon size={17} aria-hidden="true" /></span>
        <span className="res-card-main">
          <strong>{r.name}</strong>
          <small>{r.id} · {r.type}</small>
          <small>{r.zoneName}</small>
          <small>{r.assignment ? `${r.assignment.task}${r.assignment.incident ? ` · ${r.assignment.incident}` : ""}` : "No active assignment"}</small>
        </span>
        <ChevronRight size={15} aria-hidden="true" className="ops-chev" />
      </button>
      <div className="res-card-foot">
        <ResourceStatusBadge status={r.status} />
        <button className="link-btn" onClick={() => onAssign(r)}>Assign <span aria-hidden="true">→</span></button>
      </div>
    </article>
  );
}

export default function ResourceGrid({ resources, view, selectedId, onSelect, onAssign, onClearFilters }) {
  if (!resources.length) {
    return (
      <section className="glass empty-state" aria-live="polite">
        <h2>No resources match these filters</h2>
        <p>Try a different search term or filter combination.</p>
        <button className="qa-btn primary" onClick={onClearFilters}>Clear filters</button>
      </section>
    );
  }
  if (view === "list") {
    return (
      <section className="glass zone-list" aria-label="Resources, list view">
        <div className="res-list-head" aria-hidden="true">
          <span>Resource</span><span>Type</span><span>Status</span><span>Zone</span><span>Assignment</span>
        </div>
        {resources.map((r) => (
          <button key={r.id} className={`res-list-row ${r.id === selectedId ? "selected" : ""}`} onClick={() => onSelect(r.id)}
            aria-label={`${r.name}, ${r.status}, ${r.zoneName}`}>
            <strong>{r.name} <small>· {r.id}</small></strong><span>{r.type}</span>
            <span><ResourceStatusBadge status={r.status} /></span><span>{r.zoneName}</span>
            <span>{r.assignment ? r.assignment.task : "—"}</span>
          </button>
        ))}
      </section>
    );
  }
  return (
    <section className="res-grid" aria-label="Resources, grid view">
      {resources.map((r) => (
        <ResourceCard key={r.id} resource={r} selected={r.id === selectedId} onSelect={onSelect} onAssign={onAssign} />
      ))}
    </section>
  );
}

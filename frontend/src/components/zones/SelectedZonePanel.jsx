import { LogIn, LogOut, ArrowLeftRight, Video, Lock } from "lucide-react";
import { ZoneStatusBadge } from "./VenueZoneMap";

const sevCls = (s) => s === "Critical" ? "sev-critical" : s === "High" ? "sev-high" : s === "Warning" ? "sev-warning" : "sev-system";

export default function SelectedZonePanel({ zone, onViewCamera }) {
  if (!zone) return null;
  const pct = Math.round((zone.occupancy / zone.capacity) * 100);
  const net = zone.entering - zone.exiting;
  return (
    <section className="card glass selected-zone" aria-labelledby="sel-zone-title" aria-live="polite">
      <div className="card-head">
        <div>
          <p className="detail-eyebrow">Selected Zone · {zone.type}{zone.restricted ? " · Restricted" : ""}</p>
          <h2 id="sel-zone-title">{zone.name} — {zone.location} {zone.restricted && <Lock size={15} aria-label="Restricted zone" />}</h2>
        </div>
        <ZoneStatusBadge status={zone.status} />
      </div>

      {(zone.status === "High" || zone.status === "Critical") && (
        <p className={`cap-warning ${zone.status === "Critical" ? "crit" : ""}`} role="note">
          {zone.status === "Critical" ? "Critical Capacity" : "Capacity Warning"} — {pct}% occupied
          {zone.status === "Critical" ? "" : " · near capacity threshold"}
        </p>
      )}

      <div className="zone-cap">
        <div><small>Current Occupancy</small><strong>{zone.occupancy.toLocaleString()}</strong></div>
        <div><small>Maximum Capacity</small><strong>{zone.capacity.toLocaleString()}</strong></div>
        <div><small>Occupancy</small><strong>{pct}%</strong></div>
      </div>
      <div className="bar big" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} aria-label={`${zone.name} occupancy ${pct} percent`}>
        <span className={`fill st-${zone.status.toLowerCase()}`} style={{ width: `${pct}%` }} />
      </div>
      <p className="zone-density">Density: <strong>{zone.density}</strong></p>

      <h3 className="sub-h">People Flow</h3>
      <div className="flow-cards">
        <div className="flow-card"><LogIn size={15} aria-hidden="true" /><div><small>Entering</small><strong>{zone.entering} / min</strong></div></div>
        <div className="flow-card"><LogOut size={15} aria-hidden="true" /><div><small>Exiting</small><strong>{zone.exiting} / min</strong></div></div>
        <div className="flow-card"><ArrowLeftRight size={15} aria-hidden="true" /><div><small>Net Flow</small><strong>{net >= 0 ? "+" : ""}{net} / min</strong></div></div>
      </div>
      <p className="move-line">Direction <strong>{zone.direction}</strong> · observed movement only</p>

      <h3 className="sub-h">Associated Cameras ({zone.cameras.length})</h3>
      <ul className="zone-cam-list">
        {zone.cameras.map((c) => (
          <li key={c.id} className="zone-cam-row">
            <span className="res-icon"><Video size={15} aria-hidden="true" /></span>
            <div><strong>{c.id} · {c.name}</strong><small>{c.status === "Offline" ? "Offline" : `${c.people} people`} · {c.status}</small></div>
            <button className="link-btn" onClick={() => onViewCamera(c.id)}>View <span aria-hidden="true">→</span></button>
          </li>
        ))}
      </ul>

      <h3 className="sub-h">Zone Alerts ({zone.alerts.length})</h3>
      {zone.alerts.length ? (
        <ul className="alert-list">
          {zone.alerts.map((a, i) => (
            <li key={i} className="alert-row"><div className="alert-main"><strong>{a.title}</strong><small>{a.time}</small></div>
            <span className={`chip ${sevCls(a.severity)}`}>{a.severity}</span></li>
          ))}
        </ul>
      ) : <p className="muted">No active alerts for this zone.</p>}
    </section>
  );
}

import { Phone, Clock, MapPin, ClipboardList, UserPlus, Repeat, Radio, Eye } from "lucide-react";
import { ResourceStatusBadge } from "./ResourceSummary";

export default function ResourceDetailPanel({ resource: r, onAssign, onReassign, onStatus, onViewIncident }) {
  if (!r) {
    return (
      <section className="card glass alert-empty" aria-live="polite">
        <h2>No resource selected</h2><p className="muted">Select a resource to review details and assignments.</p>
      </section>
    );
  }
  const a = r.assignment;
  return (
    <section className="card glass res-detail" aria-labelledby="res-detail-title" aria-live="polite">
      <div className="ops-detail-head">
        <div><p className="detail-eyebrow">{r.id} · {r.type}</p><h2 id="res-detail-title">{r.name}</h2></div>
        <ResourceStatusBadge status={r.status} />
      </div>

      <dl className="ops-meta">
        <div><dt>Resource ID</dt><dd>{r.id}</dd></div>
        <div><dt>Current Zone</dt><dd>{r.zoneName}</dd></div>
        <div><dt>Shift</dt><dd>{r.shift}</dd></div>
        <div><dt>Last Update</dt><dd>{r.lastUpdate}</dd></div>
        {r.members && <div><dt>Members</dt><dd>{r.members}</dd></div>}
        {r.base && <div><dt>Base</dt><dd>{r.base}</dd></div>}
      </dl>

      <h3 className="sub-h"><Phone size={13} aria-hidden="true" /> Contact</h3>
      <p className="ops-desc">{r.contact} <small>(masked mock number)</small></p>

      {r.equipment && (
        <>
          <h3 className="sub-h">Equipment</h3>
          <div className="equip-row">{r.equipment.map((e) => <span key={e} className="chip st-normal">{e}</span>)}</div>
        </>
      )}

      <h3 className="sub-h"><ClipboardList size={13} aria-hidden="true" /> Current Assignment</h3>
      {a ? (
        <div className="assign-card">
          <p><strong>Task:</strong> {a.task}</p>
          <p><MapPin size={12} aria-hidden="true" /> {r.zoneName}</p>
          <p><strong>Priority:</strong> {a.priority} · <strong>Since:</strong> {a.since} · <strong>Status:</strong> Active</p>
          {a.incident && <p><strong>Incident:</strong> {a.incident}</p>}
        </div>
      ) : <p className="muted">No active assignment — resource is staged at {r.base || r.zoneName}.</p>}

      <h3 className="sub-h">Actions</h3>
      <div className="ops-actions">
        {r.status === "Available" && (
          <button className="qa-btn primary" onClick={() => onAssign(r)}><UserPlus size={15} aria-hidden="true" /> Assign Resource</button>
        )}
        {["Assigned", "Deployed"].includes(r.status) && (
          <>
            <button className="qa-btn primary" onClick={() => onReassign(r)}><Repeat size={15} aria-hidden="true" /> Reassign</button>
            <button className="qa-btn" onClick={() => onAssign(r, true)}><Eye size={15} aria-hidden="true" /> View Assignment</button>
          </>
        )}
        {r.status === "Responding" && (
          <>
            <button className="qa-btn primary" onClick={() => onViewIncident(a?.incident)}><Radio size={15} aria-hidden="true" /> View Incident</button>
            <button className="qa-btn" onClick={() => onStatus(r)}><Clock size={15} aria-hidden="true" /> Update Status</button>
          </>
        )}
        {r.status === "Unavailable" && (
          <button className="qa-btn" onClick={() => onStatus(r)}><Eye size={15} aria-hidden="true" /> View Details</button>
        )}
      </div>
    </section>
  );
}

import { useState } from "react";
import { X } from "lucide-react";
import { responseOfficers } from "../../data/mockData";

function Dialog({ title, onClose, children }) {
  return (
    <div className="detail-scrim dialog-scrim" onClick={onClose}>
      <div className="glass ops-dialog" role="dialog" aria-modal="true" aria-label={title} onClick={(e) => e.stopPropagation()}>
        <div className="detail-head">
          <h2>{title}</h2>
          <button className="icon-btn" onClick={onClose} aria-label={`Close ${title}`}><X size={17} /></button>
        </div>
        {children}
      </div>
    </div>
  );
}

export function AssignOfficerDialog({ alert, onClose, onConfirm }) {
  const [officer, setOfficer] = useState(responseOfficers[0]);
  const [priority, setPriority] = useState("Normal");
  const [note, setNote] = useState("");
  return (
    <Dialog title="Assign Response Officer" onClose={onClose}>
      <p className="muted">{alert.id} · {alert.title}</p>
      <label className="field">Officer:
        <select value={officer} onChange={(e) => setOfficer(e.target.value)}>{responseOfficers.map((o) => <option key={o}>{o}</option>)}</select>
      </label>
      <label className="field">Priority:
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>{["Normal", "High", "Critical"].map((p) => <option key={p}>{p}</option>)}</select>
      </label>
      <label className="field">Note (optional):
        <textarea value={note} onChange={(e) => setNote(e.target.value)} placeholder="Please check the Main Entrance crowd flow." rows={3} />
      </label>
      <div className="dialog-btns">
        <button className="qa-btn" onClick={onClose}>Cancel</button>
        <button className="qa-btn primary" onClick={() => onConfirm({ officer, priority, note })}>Assign</button>
      </div>
    </Dialog>
  );
}

export function CreateIncidentDialog({ alert, onClose, onConfirm }) {
  const [officer, setOfficer] = useState(alert.assignedOfficer || responseOfficers[0]);
  const [desc, setDesc] = useState(alert.description);
  return (
    <Dialog title="Create Incident" onClose={onClose}>
      <dl className="ops-meta">
        <div><dt>Alert</dt><dd>{alert.title}</dd></div>
        <div><dt>Severity</dt><dd>{alert.severity}</dd></div>
        <div><dt>Location</dt><dd>{alert.zoneName}</dd></div>
      </dl>
      <label className="field">Assigned Officer:
        <select value={officer} onChange={(e) => setOfficer(e.target.value)}>{responseOfficers.map((o) => <option key={o}>{o}</option>)}</select>
      </label>
      <label className="field">Description:
        <textarea value={desc} onChange={(e) => setDesc(e.target.value)} rows={4} />
      </label>
      <div className="dialog-btns">
        <button className="qa-btn" onClick={onClose}>Cancel</button>
        <button className="qa-btn primary" onClick={() => onConfirm({ officer, desc })}>Create Incident</button>
      </div>
    </Dialog>
  );
}

export function EscalateDialog({ alert, onClose, onConfirm }) {
  const [target, setTarget] = useState("Supervisor");
  const [reason, setReason] = useState("");
  return (
    <Dialog title="Escalate Alert" onClose={onClose}>
      <p className="muted">{alert.id} · {alert.title}</p>
      <label className="field">Escalate to:
        <select value={target} onChange={(e) => setTarget(e.target.value)}>
          {["Supervisor", "Emergency Response", "Medical Team", "Security Team"].map((t) => <option key={t}>{t}</option>)}
        </select>
      </label>
      <label className="field">Reason:
        <textarea value={reason} onChange={(e) => setReason(e.target.value)} placeholder="High crowd density remains unresolved." rows={3} />
      </label>
      <div className="dialog-btns">
        <button className="qa-btn" onClick={onClose}>Cancel</button>
        <button className="qa-btn primary" onClick={() => onConfirm({ target, reason })}>Escalate</button>
      </div>
    </Dialog>
  );
}

export function ResolveDialog({ alert, onClose, onConfirm }) {
  const [note, setNote] = useState("");
  return (
    <Dialog title="Resolve Alert" onClose={onClose}>
      <p className="muted">{alert.id} · {alert.title}</p>
      <label className="field">Resolution note:
        <textarea value={note} onChange={(e) => setNote(e.target.value)} placeholder="Density reduced after crowd flow redirected." rows={3} />
      </label>
      <div className="dialog-btns">
        <button className="qa-btn" onClick={onClose}>Cancel</button>
        <button className="qa-btn primary" onClick={() => onConfirm({ note })}>Resolve Alert</button>
      </div>
    </Dialog>
  );
}

export function IncidentList({ incidents }) {
  return (
    <section className="card glass incident-card" aria-label="Recent incidents">
      <div className="card-head"><h2>Recent Incidents</h2><span className="map-hint">{incidents.length} records</span></div>
      <ul className="incident-list">
        {incidents.map((i) => (
          <li key={i.id} className="incident-row">
            <div><strong>{i.id}</strong><small>{i.title} · {i.zone} · {i.time}</small></div>
            <span className={`status-chip stt-${i.status.toLowerCase()}`}>{i.status}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

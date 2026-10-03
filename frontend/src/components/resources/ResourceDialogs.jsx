import { useState } from "react";
import { X } from "lucide-react";

const taskOptions = ["Crowd Monitoring", "Entrance Control", "Queue Management", "Medical Support", "Security Support", "Incident Response"];
const zoneOptions = ["Zone A", "Zone B", "Zone C", "Zone D", "Zone E", "Zone F", "Zone G", "Zone H"];

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

export function AssignResourceDialog({ resource, viewOnly, onClose, onConfirm }) {
  const [zone, setZone] = useState(resource.zoneName);
  const [task, setTask] = useState(resource.assignment?.task || taskOptions[0]);
  const [priority, setPriority] = useState(resource.assignment?.priority || "Normal");
  const [note, setNote] = useState("");
  return (
    <Dialog title={viewOnly ? "Assignment Details" : "Assign Resource"} onClose={onClose}>
      <p className="muted">{resource.id} · {resource.name} · {resource.type}</p>
      <label className="field">Assign To:
        <select value={zone} onChange={(e) => setZone(e.target.value)} disabled={viewOnly}>
          {zoneOptions.map((z) => <option key={z}>{z}</option>)}
        </select>
      </label>
      <label className="field">Task:
        <select value={task} onChange={(e) => setTask(e.target.value)} disabled={viewOnly}>
          {taskOptions.map((t) => <option key={t}>{t}</option>)}
        </select>
      </label>
      <label className="field">Priority:
        <select value={priority} onChange={(e) => setPriority(e.target.value)} disabled={viewOnly}>
          {["Normal", "High", "Critical"].map((p) => <option key={p}>{p}</option>)}
        </select>
      </label>
      {!viewOnly && (
        <label className="field">Notes (optional):
          <textarea value={note} onChange={(e) => setNote(e.target.value)} rows={2} placeholder="Optional note for the assignee" />
        </label>
      )}
      <div className="dialog-btns">
        <button className="qa-btn" onClick={onClose}>{viewOnly ? "Close" : "Cancel"}</button>
        {!viewOnly && <button className="qa-btn primary" onClick={() => onConfirm({ zone, task, priority, note })}>Assign</button>}
      </div>
    </Dialog>
  );
}

export function ReassignResourceDialog({ resource, onClose, onConfirm }) {
  const [zone, setZone] = useState(resource.zoneName);
  const [task, setTask] = useState(resource.assignment?.task || taskOptions[0]);
  const [reason, setReason] = useState("");
  return (
    <Dialog title="Reassign Resource" onClose={onClose}>
      <p className="muted">{resource.id} · {resource.name} · currently {resource.zoneName}</p>
      <label className="field">New Zone:
        <select value={zone} onChange={(e) => setZone(e.target.value)}>{zoneOptions.map((z) => <option key={z}>{z}</option>)}</select>
      </label>
      <label className="field">New Task:
        <select value={task} onChange={(e) => setTask(e.target.value)}>{taskOptions.map((t) => <option key={t}>{t}</option>)}</select>
      </label>
      <label className="field">Reason:
        <textarea value={reason} onChange={(e) => setReason(e.target.value)} rows={2} placeholder="Support required in Zone B" />
      </label>
      <div className="dialog-btns">
        <button className="qa-btn" onClick={onClose}>Cancel</button>
        <button className="qa-btn primary" onClick={() => onConfirm({ zone, task, reason })}>Reassign</button>
      </div>
    </Dialog>
  );
}

export function UpdateStatusDialog({ resource, onClose, onConfirm }) {
  const [status, setStatus] = useState(resource.status);
  const [note, setNote] = useState("");
  return (
    <Dialog title="Update Resource Status" onClose={onClose}>
      <p className="muted">{resource.id} · {resource.name} · currently {resource.status}</p>
      <label className="field">Status:
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          {["Available", "Assigned", "Deployed", "Responding", "Unavailable"].map((s) => <option key={s}>{s}</option>)}
        </select>
      </label>
      <label className="field">Note (optional):
        <textarea value={note} onChange={(e) => setNote(e.target.value)} rows={2} />
      </label>
      <div className="dialog-btns">
        <button className="qa-btn" onClick={onClose}>Cancel</button>
        <button className="qa-btn primary" onClick={() => onConfirm({ status, note })}>Update</button>
      </div>
    </Dialog>
  );
}

import { LogIn, LogOut, ArrowLeftRight, Video, Map as MapIcon, UserPlus, ArrowUpCircle, Stethoscope, FilePlus2, CheckCheck, RotateCcw, Pencil } from "lucide-react";
import { SeverityBadge, StatusBadge } from "./AlertSummary";
import { FeedVisual } from "../live/CameraCard";

export default function AlertDetails({ alert, onAction, onViewCamera, onViewZone }) {
  if (!alert) {
    return (
      <section className="card glass alert-empty" aria-live="polite">
        <h2>No alert selected</h2><p className="muted">Select an alert from the list to review details and respond.</p>
      </section>
    );
  }
  const pct = Math.round((alert.occupancy / alert.capacity) * 100);
  const net = alert.entering - alert.exiting;
  const cam = { id: alert.camera || "CAM-00", status: alert.type === "Camera Offline" ? "Offline" : "Live",
    peopleCount: alert.evidencePeople, density: alert.density };
  const st = alert.status;

  const primary = [];
  if (st === "New") primary.push({ k: "ack", label: "Acknowledge", icon: CheckCheck, cls: "primary" });
  if (["New", "Acknowledged"].includes(st)) primary.push({ k: "assign", label: "Assign Officer", icon: UserPlus });
  if (st === "Acknowledged") primary.push({ k: "escalate", label: "Escalate", icon: ArrowUpCircle });
  if (st === "Assigned") { primary.push({ k: "incident", label: "Create Incident", icon: FilePlus2, cls: "primary" }); primary.push({ k: "escalate", label: "Escalate", icon: ArrowUpCircle }); }
  if (st === "New" && alert.severity === "Critical") primary.push({ k: "incident", label: "Create Incident", icon: FilePlus2 });
  if (st === "In Progress") { primary.push({ k: "resolve", label: "Resolve", icon: CheckCheck, cls: "primary" }); primary.push({ k: "update", label: "Update Status", icon: Pencil }); }
  if (["Resolved", "Closed"].includes(st)) { primary.push({ k: "reopen", label: "Reopen", icon: RotateCcw }); primary.push({ k: "details", label: "View Details", icon: Stethoscope }); }

  return (
    <section className="card glass alert-details" aria-labelledby="alert-detail-title" aria-live="polite">
      <div className="ops-detail-head">
        <div><p className="detail-eyebrow">{alert.id} · {alert.type}</p>
        <h2 id="alert-detail-title">{alert.title}</h2></div>
        <div className="ops-badges"><SeverityBadge severity={alert.severity} /><StatusBadge status={alert.status} /></div>
      </div>

      <dl className="ops-meta">
        <div><dt>Alert ID</dt><dd>{alert.id}</dd></div>
        <div><dt>Created</dt><dd>{alert.created}</dd></div>
        <div><dt>Location</dt><dd>{alert.zoneName}</dd></div>
        <div><dt>Camera</dt><dd>{alert.camera || "—"}</dd></div>
        <div><dt>Density</dt><dd>{alert.density}</dd></div>
        <div><dt>Assigned</dt><dd>{alert.assignedOfficer || "Unassigned"}</dd></div>
      </dl>

      <h3 className="sub-h">Description</h3>
      <p className="ops-desc">{alert.description}</p>

      <h3 className="sub-h">Camera Snapshot</h3>
      <div className="evidence">
        <FeedVisual cam={cam} compact />
        <div className="evidence-bar">
          <span>{alert.camera || "No camera"} · LIVE</span>
          <span>People: <strong>{alert.evidencePeople}</strong></span>
          <span>Density: <strong>{alert.density}</strong></span>
          <span>{alert.evidenceTime}</span>
        </div>
      </div>

      <h3 className="sub-h">Metrics</h3>
      <div className="metric-grid">
        <div><small>Occupancy</small><strong>{alert.occupancy.toLocaleString()}</strong></div>
        <div><small>Capacity</small><strong>{alert.capacity.toLocaleString()}</strong></div>
        <div><small>Occupancy %</small><strong>{pct}%</strong></div>
        <div><small>Entering</small><strong>{alert.entering}/min</strong></div>
        <div><small>Exiting</small><strong>{alert.exiting}/min</strong></div>
        <div><small>Net Flow</small><strong>{net >= 0 ? "+" : ""}{net}/min</strong></div>
      </div>
      <div className="bar" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} aria-label="Alert zone occupancy">
        <span className={`fill st-${pct >= 90 ? "critical" : pct >= 70 ? "high" : pct >= 50 ? "moderate" : "normal"}`} style={{ width: `${pct}%` }} />
      </div>
      <div className="flow-cards" style={{ marginTop: 8 }}>
        <div className="flow-card"><LogIn size={15} aria-hidden="true" /><div><small>Entering</small><strong>{alert.entering} / min</strong></div></div>
        <div className="flow-card"><LogOut size={15} aria-hidden="true" /><div><small>Exiting</small><strong>{alert.exiting} / min</strong></div></div>
        <div className="flow-card"><ArrowLeftRight size={15} aria-hidden="true" /><div><small>Net Flow</small><strong>{net >= 0 ? "+" : ""}{net} / min</strong></div></div>
      </div>

      <h3 className="sub-h">Timeline</h3>
      <ol className="ops-timeline">
        {alert.timeline.map((t, i) => (
          <li key={i}><span className="tl-dot" aria-hidden="true" /><div><strong>{t.time}</strong><p>{t.text}</p></div></li>
        ))}
      </ol>

      <h3 className="sub-h">Actions</h3>
      <div className="ops-actions">
        {primary.map((a) => (
          <button key={a.k} className={`qa-btn ${a.cls || ""}`} onClick={() => onAction(a.k, alert)}>
            <a.icon size={15} aria-hidden="true" /> {a.label}
          </button>
        ))}
      </div>
      <div className="ops-view-links">
        <button className="link-btn" onClick={() => onViewCamera(alert.camera)} disabled={!alert.camera}>
          <Video size={14} aria-hidden="true" /> View Camera <span aria-hidden="true">→</span></button>
        <button className="link-btn" onClick={() => onViewZone(alert.zone)}>
          <MapIcon size={14} aria-hidden="true" /> View Zone <span aria-hidden="true">→</span></button>
      </div>
    </section>
  );
}

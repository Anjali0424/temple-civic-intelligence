import { X, Maximize2 } from "lucide-react";
import { FeedVisual, CameraStatusBadge } from "./CameraCard";

const sevCls = (s) => s === "Critical" ? "sev-critical" : s === "High" ? "sev-high" : s === "Warning" ? "sev-warning" : "sev-system";

export default function CameraDetailPanel({ cam, paused, onClose, onFullscreen }) {
  if (!cam) return null;
  const pct = Math.min(100, Math.round((cam.zoneCurrent / cam.zoneCapacity) * 100));
  return (
    <div className="detail-scrim" onClick={onClose}>
      <aside className="glass detail-panel" role="dialog" aria-modal="true" aria-label={`Details for ${cam.id}`}
        onClick={(e) => e.stopPropagation()}>
        <div className="detail-head">
          <div><p className="detail-eyebrow">{cam.id} · {cam.location}</p><h2>{cam.name}</h2></div>
          <div className="detail-head-btns">
            <CameraStatusBadge status={paused ? "Paused" : cam.status} />
            <button className="icon-btn" onClick={() => onFullscreen(cam)} aria-label="Open fullscreen"><Maximize2 size={16} /></button>
            <button className="icon-btn" onClick={onClose} aria-label="Close details"><X size={17} /></button>
          </div>
        </div>

        <FeedVisual cam={cam} paused={paused} />
        <p className="detail-meta">{cam.resolution} · {cam.fps} FPS · Last update {cam.lastUpdate}</p>

        <section aria-label="AI detection"><h3>AI Detection</h3>
          <div className="metric-grid">
            <div><small>People detected</small><strong>{cam.peopleCount}</strong></div>
            <div><small>Tracked</small><strong>{cam.tracked}</strong></div>
            <div><small>Confidence</small><strong>{cam.confidence}%</strong></div>
            <div><small>Density</small><strong>{cam.density}</strong></div>
            <div><small>Movement</small><strong>{cam.movement}</strong></div>
            <div><small>Signal</small><strong>{cam.signalQuality}</strong></div>
          </div>
        </section>

        <section aria-label="Crowd movement"><h3>Crowd Movement</h3>
          <div className="move-card">
            <span className="move-arrow" aria-hidden="true">{cam.direction?.includes("East") ? "→" : cam.direction?.includes("West") ? "←" : cam.direction?.includes("North") ? "↑" : cam.direction?.includes("South") ? "↓" : "↻"}</span>
            <div><strong>{cam.direction}</strong><small>Direction · observed movement only</small></div>
            <div className="move-right"><strong>{cam.flow}</strong><small>Flow rate</small></div>
          </div>
        </section>

        <section aria-label="Zone information"><h3>{cam.zoneName}</h3>
          <div className="occ-meta"><span>{cam.zoneCurrent.toLocaleString()} / {cam.zoneCapacity.toLocaleString()}</span><span className="chip st-high">{pct}% · {cam.density}</span></div>
          <div className="bar" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} aria-label="Zone occupancy">
            <span className="fill st-high" style={{ width: `${pct}%` }} />
          </div>
        </section>

        <section aria-label="Camera alerts"><h3>Camera Alerts</h3>
          {cam.alerts?.length ? (
            <ul className="alert-list">
              {cam.alerts.map((a, i) => (
                <li key={i} className="alert-row"><div className="alert-main"><strong>{a.title}</strong><small>{a.time}</small></div>
                <span className={`chip ${sevCls(a.severity)}`}>{a.severity}</span></li>
              ))}
            </ul>
          ) : <p className="muted">No active alerts for this camera.</p>}
        </section>
      </aside>
    </div>
  );
}

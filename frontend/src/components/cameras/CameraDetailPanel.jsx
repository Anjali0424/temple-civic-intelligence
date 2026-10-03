import { X, Settings2, Power } from "lucide-react";
import { CameraStatusBadge, AIStatusBadge, CameraHealth } from "./CameraSummary";

function Meter({ label, value }) {
  const cls = value >= 90 ? "h-good" : value >= 70 ? "h-fair" : "h-bad";
  return (
    <div className="meter">
      <div className="meter-top"><span>{label}</span><strong>{value}%</strong></div>
      <div className="bar" role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={100} aria-label={`${label} ${value} percent`}>
        <span className={`fill ${cls}`} style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

export default function CameraDetailPanel({ cam, onClose, onConfigure, onToggleEnabled }) {
  if (!cam) {
    return (
      <section className="card glass alert-empty" aria-live="polite">
        <h2>No camera selected</h2><p className="muted">Select a camera to review health and configuration.</p>
      </section>
    );
  }
  const needsAttention = ["Offline", "Degraded"].includes(cam.status) || !cam.enabled;
  return (
    <aside className="card glass cam-detail" role="dialog" aria-modal="false" aria-labelledby="cam-detail-title" aria-live="polite">
      <div className="detail-head">
        <div><p className="detail-eyebrow">{cam.id} · Zone {cam.zone}</p>
        <h2 id="cam-detail-title">{cam.name}</h2></div>
        <button className="icon-btn" onClick={onClose} aria-label="Close camera details"><X size={17} /></button>
      </div>
      <div className="ops-badges-row">
        <CameraStatusBadge status={cam.status} />
        <AIStatusBadge ai={cam.aiStatus} />
      </div>

      {needsAttention && (
        <p className={`cap-warning ${cam.status === "Offline" ? "crit" : ""}`} role="note">
          <strong>Needs Attention</strong> — {cam.issue || (!cam.enabled ? "Camera is disabled by operator." : "Health below target.")}
        </p>
      )}

      <dl className="ops-meta">
        <div><dt>Camera ID</dt><dd>{cam.id}</dd></div>
        <div><dt>Location</dt><dd>{cam.location}</dd></div>
        <div><dt>Zone</dt><dd>Zone {cam.zone}</dd></div>
        <div><dt>Status</dt><dd>{cam.status}</dd></div>
        <div><dt>AI Status</dt><dd>{cam.aiStatus} · YOLO + Tracker</dd></div>
        <div><dt>FPS</dt><dd>{cam.status === "Offline" || !cam.enabled ? "—" : `${cam.fps} (target ${cam.fpsTarget})`}</dd></div>
        <div><dt>Resolution</dt><dd>{cam.resolution}</dd></div>
        <div><dt>Latency</dt><dd>{cam.status === "Offline" ? "—" : `${cam.latency} ms`}</dd></div>
        <div><dt>Last Heartbeat</dt><dd>{cam.lastHeartbeat}</dd></div>
        <div><dt>Stream Source</dt><dd className="mono">rtsp://••••••••</dd></div>
      </dl>

      <h3 className="sub-h">Camera Health — {cam.health}%</h3>
      <CameraHealth health={cam.health} />
      <div className="meter-list">
        <Meter label="Stream Health" value={cam.streamQuality} />
        <Meter label="FPS Stability" value={cam.fpsStability} />
        <Meter label="Heartbeat" value={cam.heartbeat} />
        <Meter label="AI Pipeline" value={cam.aiPipeline} />
      </div>

      <h3 className="sub-h">Actions</h3>
      <div className="ops-actions">
        <button className="qa-btn primary" onClick={() => onConfigure(cam)}><Settings2 size={15} aria-hidden="true" /> Configure Camera</button>
        <button className="qa-btn" onClick={() => onToggleEnabled(cam)}><Power size={15} aria-hidden="true" /> {cam.enabled ? "Disable" : "Enable"}</button>
      </div>
    </aside>
  );
}

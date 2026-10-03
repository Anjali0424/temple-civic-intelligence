import { Maximize2, Camera as SnapIcon, Pause, Play, MoreHorizontal, RotateCcw } from "lucide-react";

// Deterministic mock boxes per camera so feeds differ but stay stable.
function boxesFor(id) {
  const seed = [...id].reduce((n, ch) => n + ch.charCodeAt(0), 0);
  const base = [
    { l: 8, t: 30, w: 9, h: 34 }, { l: 24, t: 44, w: 8, h: 28 },
    { l: 38, t: 28, w: 9, h: 36 }, { l: 54, t: 44, w: 8, h: 27 },
    { l: 66, t: 32, w: 9, h: 33 }, { l: 80, t: 46, w: 7, h: 25 },
  ];
  const n = 3 + (seed % 3);
  return base.slice(0, n).map((b, i) => ({
    ...b,
    l: `${(b.l + ((seed + i * 7) % 5))}%`, t: `${b.t}%`, w: `${b.w}%`, h: `${b.h}%`,
    id: `ID ${String(142 + ((seed + i * 13) % 400)).padStart(4, "0")}`,
  }));
}

const hueFor = (id) => [...id].reduce((n, ch) => n + ch.charCodeAt(0), 0) % 40 - 20;

export function CameraStatusBadge({ status }) {
  const cls = status === "Live" ? "cb-live" : status === "Offline" ? "cb-off" : status === "Paused" ? "cb-paused" : "cb-deg";
  const label = status === "Live" ? "● LIVE" : status.toUpperCase();
  return <span className={`cam-badge ${cls}`}>{label}</span>;
}

export function FeedVisual({ cam, paused, compact }) {
  if (cam.status === "Offline") {
    return (
      <div className={`feed feed-offline ${compact ? "compact" : ""}`} role="img" aria-label={`${cam.id} ${cam.name} offline`}>
        <div className="feed-bg off" aria-hidden="true" />
        <div className="offline-msg">
          <p className="off-title">Camera Offline</p>
          <p className="off-sub">{cam.id} · {cam.name}</p>
          <p className="off-seen">Last seen: {cam.lastSeen}</p>
        </div>
      </div>
    );
  }
  return (
    <div className={`feed ${compact ? "compact" : ""}`} role="img"
      aria-label={`Mock feed ${cam.id} ${cam.name}, ${cam.peopleCount} people, ${cam.density} density`}>
      <div className="feed-bg" style={{ filter: `hue-rotate(${hueFor(cam.id)}deg)` }} aria-hidden="true" />
      {cam.status === "Degraded" && <span className="deg-ribbon">Degraded · Poor signal</span>}
      {boxesFor(cam.id).map((b) => (
        <div key={b.id} className="bbox" style={{ left: b.l, top: b.t, width: b.w, height: b.h }}>
          <span className="bbox-id">{b.id}</span>
        </div>
      ))}
      {paused && <span className="paused-ribbon">PAUSED</span>}
    </div>
  );
}

export default function CameraCard({ cam, paused, onSelect, onFullscreen, onSnapshot, onTogglePause }) {
  const offline = cam.status === "Offline";
  return (
    <article className={`glass cam-card ${offline ? "is-off" : ""}`} aria-label={`${cam.id} ${cam.name}, ${cam.status}`}>
      <button className="cam-click" onClick={() => onSelect(cam)} aria-label={`Open details for ${cam.id} ${cam.name}`}>
        <div className="cam-top">
          <CameraStatusBadge status={paused ? "Paused" : cam.status} />
          <span className="cam-id2">{cam.id} · {cam.name}<small>{cam.location}</small></span>
          <span className="cam-time">{cam.lastUpdate}</span>
        </div>
        <FeedVisual cam={cam} paused={paused} />
      </button>
      <div className="cam-info">
        <span>People: <strong>{offline ? "—" : cam.peopleCount}</strong></span>
        <span>Density: <strong className={`dens-${(cam.density || "").toLowerCase()}`}>{cam.density}</strong></span>
        <span>Zone: <strong>{cam.zone}</strong></span>
        <span>FPS: <strong>{offline ? "—" : cam.fps}</strong></span>
        <span className={`chip st-mini ${cam.status === "Live" ? "st-normal" : cam.status === "Degraded" ? "st-moderate" : "st-critical"}`}>
          {paused ? "Paused" : cam.status}
        </span>
      </div>
      <div className="cam-controls" role="toolbar" aria-label={`Controls for ${cam.id}`}>
        <button className="cbtn" onClick={() => onFullscreen(cam)} aria-label={`Fullscreen ${cam.id}`} disabled={offline}><Maximize2 size={14} /> Fullscreen</button>
        <button className="cbtn" onClick={() => onSnapshot(cam)} aria-label={`Snapshot ${cam.id}`} disabled={offline}><SnapIcon size={14} /> Snapshot</button>
        <button className="cbtn" onClick={() => onTogglePause(cam)} aria-label={`${paused ? "Resume" : "Pause"} ${cam.id}`} disabled={offline}>
          {paused ? <Play size={14} /> : <Pause size={14} />} {paused ? "Resume" : "Pause"}
        </button>
        <button className="cbtn icon-only" onClick={() => onSelect(cam)} aria-label={`More about ${cam.id}`}><MoreHorizontal size={15} /></button>
      </div>
      {offline && (
        <button className="retry-btn" onClick={() => onSnapshot({ ...cam, retry: true })} aria-label={`Retry connection ${cam.id}`}>
          <RotateCcw size={14} /> Retry Connection
        </button>
      )}
    </article>
  );
}

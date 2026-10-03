import { X, Pause, Play, Camera as SnapIcon } from "lucide-react";
import { FeedVisual, CameraStatusBadge } from "./CameraCard";

export default function FullscreenCameraDialog({ cam, paused, onClose, onSnapshot, onTogglePause }) {
  if (!cam) return null;
  return (
    <div className="detail-scrim" onClick={onClose}>
      <div className="glass fs-dialog" role="dialog" aria-modal="true" aria-label={`Fullscreen ${cam.id}`} onClick={(e) => e.stopPropagation()}>
        <div className="detail-head">
          <div><p className="detail-eyebrow">{cam.id} · {cam.lastUpdate}</p><h2>{cam.name} — {cam.location}</h2></div>
          <div className="detail-head-btns">
            <CameraStatusBadge status={paused ? "Paused" : cam.status} />
            <button className="icon-btn" onClick={onClose} aria-label="Close fullscreen"><X size={17} /></button>
          </div>
        </div>
        <FeedVisual cam={cam} paused={paused} />
        <div className="fs-meta">
          <span>People: <strong>{cam.peopleCount}</strong></span>
          <span>Density: <strong>{cam.density}</strong></span>
          <span>Zone: <strong>{cam.zone}</strong></span>
          <span>FPS: <strong>{cam.fps}</strong></span>
        </div>
        <div className="video-controls">
          <button className="chip-btn" onClick={() => onSnapshot(cam)}><SnapIcon size={15} /> Snapshot</button>
          <button className="chip-btn" onClick={() => onTogglePause(cam)}>{paused ? <Play size={15} /> : <Pause size={15} />} {paused ? "Resume" : "Pause"}</button>
          <button className="chip-btn" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}

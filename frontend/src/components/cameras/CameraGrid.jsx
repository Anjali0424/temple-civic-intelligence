import { useState } from "react";
import { MoreHorizontal, Eye, Settings2, Power } from "lucide-react";
import { FeedVisual } from "../live/CameraCard";
import { CameraStatusBadge, AIStatusBadge, CameraHealth } from "./CameraSummary";

function toFeedCam(c) {
  return { id: c.id, status: c.status === "Online" ? "Live" : c.status === "Disabled" ? "Offline" : c.status,
    peopleCount: c.people, density: c.density };
}

export function CameraPreview({ cam }) {
  return (
    <div className="cam-preview">
      <FeedVisual cam={toFeedCam(cam)} compact={false} />
      <div className="preview-top">
        <CameraStatusBadge status={cam.status} />
        <span className="preview-id">{cam.id}</span>
      </div>
      <div className="preview-bottom"><AIStatusBadge ai={cam.aiStatus} /></div>
    </div>
  );
}

export function CameraActionsMenu({ cam, onView, onConfigure, onToggleEnabled }) {
  const [open, setOpen] = useState(false);
  const act = (fn) => () => { setOpen(false); fn(); };
  return (
    <div className="menu-wrap">
      <button className="cbtn icon-only" onClick={() => setOpen((v) => !v)} aria-haspopup="menu" aria-expanded={open} aria-label={`More actions for ${cam.id}`}>
        <MoreHorizontal size={15} />
      </button>
      {open && (
        <div className="export-menu glass cam-menu" role="menu" aria-label={`Actions for ${cam.id}`}>
          <button role="menuitem" onClick={act(onView)}><Eye size={14} /> View</button>
          <button role="menuitem" onClick={act(onConfigure)}><Settings2 size={14} /> Configure</button>
          <button role="menuitem" onClick={act(onToggleEnabled)}><Power size={14} /> {cam.enabled ? "Disable Camera" : "Enable Camera"}</button>
        </div>
      )}
    </div>
  );
}

export function CameraCard({ cam, selected, onSelect, onConfigure, onToggleEnabled }) {
  return (
    <article className={`glass cam-card inv-card ${selected ? "selected" : ""} ${!cam.enabled ? "is-disabled" : ""}`}
      aria-label={`${cam.id} ${cam.name}, ${cam.status}, AI ${cam.aiStatus}`}>
      <button className="cam-click" onClick={() => onSelect(cam.id)} aria-pressed={selected}
        aria-label={`Open details for ${cam.id} ${cam.name}`}>
        <CameraPreview cam={cam} />
        <div className="inv-meta">
          <strong>{cam.id} · {cam.name}</strong>
          <small>{cam.location} · Zone {cam.zone}</small>
        </div>
        <div className="inv-specs">
          <span>FPS <strong>{cam.status === "Offline" || !cam.enabled ? "—" : cam.fps}</strong></span>
          <span>{cam.resolution}</span>
          <span>♥ <CameraHealth health={cam.health} compact /></span>
        </div>
        <p className="inv-beat">Last heartbeat: {cam.lastHeartbeat}</p>
      </button>
      <div className="cam-controls">
        <button className="cbtn" onClick={() => onSelect(cam.id)}>View</button>
        <button className="cbtn" onClick={() => onConfigure(cam)}>Configure</button>
        <CameraActionsMenu cam={cam} onView={() => onSelect(cam.id)} onConfigure={() => onConfigure(cam)} onToggleEnabled={() => onToggleEnabled(cam)} />
      </div>
    </article>
  );
}

export default function CameraGrid({ cameras, view, selectedId, onSelect, onConfigure, onToggleEnabled, onClearFilters }) {
  if (!cameras.length) {
    return (
      <section className="glass empty-state" aria-live="polite">
        <h2>No cameras match these filters</h2>
        <p>Try a different search term or filter combination.</p>
        <button className="qa-btn primary" onClick={onClearFilters}>Clear filters</button>
      </section>
    );
  }
  if (view === "list") {
    return (
      <section className="glass cam-table" aria-label="Cameras, list view">
        <div className="cam-table-head" aria-hidden="true">
          <span>Camera</span><span>Location</span><span>Zone</span><span>Status</span><span>AI Status</span>
          <span>FPS</span><span>Resolution</span><span>Health</span><span>Heartbeat</span><span>Actions</span>
        </div>
        {cameras.map((c) => (
          <div key={c.id} className={`cam-table-row ${c.id === selectedId ? "selected" : ""}`}>
            <button className="row-main" onClick={() => onSelect(c.id)} aria-label={`${c.id} ${c.name}, ${c.status}`}>
              <strong>{c.id} · {c.name}</strong>
            </button>
            <span>{c.location}</span><span>Zone {c.zone}</span>
            <span><CameraStatusBadge status={c.status} /></span>
            <span><AIStatusBadge ai={c.aiStatus} /></span>
            <span>{c.status === "Offline" || !c.enabled ? "—" : c.fps}</span>
            <span>{c.resolution}</span>
            <span><CameraHealth health={c.health} compact /></span>
            <span>{c.lastHeartbeat}</span>
            <span className="row-actions">
              <button className="link-btn" onClick={() => onSelect(c.id)}>View</button>
              <button className="link-btn" onClick={() => onConfigure(c)}>Configure</button>
            </span>
          </div>
        ))}
      </section>
    );
  }
  return (
    <section className="cam-grid inv-grid" aria-label="Cameras, grid view">
      {cameras.map((c) => (
        <CameraCard key={c.id} cam={c} selected={c.id === selectedId}
          onSelect={onSelect} onConfigure={onConfigure} onToggleEnabled={onToggleEnabled} />
      ))}
    </section>
  );
}

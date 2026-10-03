import { useState } from "react";
import { X } from "lucide-react";

const zoneOptions = ["A", "B", "C", "D", "E", "F", "G", "H"];
const resOptions = ["1920 × 1080", "1280 × 720", "2560 × 1440"];
const fpsOptions = [12, 20, 24, 25, 30];

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

const idFor = () => `CAM-${String(Math.floor(21 + Math.random() * 60)).padStart(2, "0")}`;

export function AddCameraDialog({ onClose, onConfirm, existingIds }) {
  const [form, setForm] = useState({ id: "", name: "", location: "", zone: "A", streamSource: "rtsp://camera-source/…", resolution: "1920 × 1080", fps: 24, ai: "Processing", status: "Connecting" });
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value === "fps" || k === "fps" ? Number(e.target.value) : e.target.value });
  const id = form.id.trim() || idFor();
  const valid = form.name.trim() && form.location.trim() && !existingIds.includes(id);
  return (
    <Dialog title="Add Camera" onClose={onClose}>
      <div className="form-grid">
        <label className="field">Camera ID:<input value={form.id} onChange={(e) => setForm({ ...form, id: e.target.value.toUpperCase() })} placeholder="Auto-assigned if blank" /></label>
        <label className="field">Camera Name:<input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. South Gate" /></label>
        <label className="field">Location:<input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} placeholder="e.g. South Entry Lane" /></label>
        <label className="field">Zone:
          <select value={form.zone} onChange={set("zone")}>{zoneOptions.map((z) => <option key={z} value={z}>Zone {z}</option>)}</select>
        </label>
        <label className="field wide">Stream Source:<input value={form.streamSource} onChange={(e) => setForm({ ...form, streamSource: e.target.value })} placeholder="rtsp://camera-source/…" /></label>
        <label className="field">Resolution:
          <select value={form.resolution} onChange={set("resolution")}>{resOptions.map((r) => <option key={r}>{r}</option>)}</select>
        </label>
        <label className="field">FPS:
          <select value={form.fps} onChange={(e) => setForm({ ...form, fps: Number(e.target.value) })}>{fpsOptions.map((f) => <option key={f} value={f}>{f}</option>)}</select>
        </label>
        <label className="field">AI Processing:
          <select value={form.ai} onChange={set("ai")}>{["Processing", "Paused"].map((a) => <option key={a}>{a}</option>)}</select>
        </label>
        <label className="field">Status:
          <select value={form.status} onChange={set("status")}>{["Connecting", "Online", "Offline"].map((s) => <option key={s}>{s}</option>)}</select>
        </label>
      </div>
      {!valid && <p className="form-err" role="alert">Name, location and a unique ID are required.</p>}
      <div className="dialog-btns">
        <button className="qa-btn" onClick={onClose}>Cancel</button>
        <button className="qa-btn primary" disabled={!valid} onClick={() => onConfirm({ ...form, id })}>Add Camera</button>
      </div>
    </Dialog>
  );
}

export function CameraConfigurationDialog({ cam, onClose, onConfirm }) {
  const [form, setForm] = useState({ name: cam.name, location: cam.location, zone: cam.zone, resolution: cam.resolution, fpsTarget: cam.fpsTarget, ai: cam.aiStatus, status: cam.status });
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  return (
    <Dialog title={`Configure ${cam.id}`} onClose={onClose}>
      <p className="muted">Zone association is free — a zone may hold many cameras.</p>
      <div className="form-grid">
        <label className="field">Camera Name:<input value={form.name} onChange={set("name")} /></label>
        <label className="field">Location:<input value={form.location} onChange={set("location")} /></label>
        <label className="field">Zone:
          <select value={form.zone} onChange={set("zone")}>{zoneOptions.map((z) => <option key={z} value={z}>Zone {z}</option>)}</select>
        </label>
        <label className="field">Camera Status:
          <select value={form.status} onChange={set("status")}>{["Online", "Offline", "Degraded", "Connecting"].map((s) => <option key={s}>{s}</option>)}</select>
        </label>
        <label className="field">AI Processing:
          <select value={form.ai} onChange={set("ai")}>{["Processing", "Paused", "Error"].map((a) => <option key={a}>{a}</option>)}</select>
        </label>
        <label className="field">Resolution:
          <select value={form.resolution} onChange={set("resolution")}>
            {(resOptions.includes(form.resolution) ? resOptions : [...resOptions, form.resolution]).map((r) => <option key={r}>{r}</option>)}
          </select>
        </label>
        <label className="field">FPS Target:
          <select value={form.fpsTarget} onChange={(e) => setForm({ ...form, fpsTarget: Number(e.target.value) })}>{fpsOptions.map((f) => <option key={f} value={f}>{f}</option>)}</select>
        </label>
        <label className="field wide">Stream Source:<input value={cam.streamSource} disabled aria-label="Stream source (read-only mock)" /></label>
      </div>
      <div className="dialog-btns">
        <button className="qa-btn" onClick={onClose}>Cancel</button>
        <button className="qa-btn primary" onClick={() => onConfirm(form)}>Save Changes</button>
      </div>
    </Dialog>
  );
}

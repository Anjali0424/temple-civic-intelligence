import { useState } from "react";
import { X } from "lucide-react";

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

export function ConfirmationDialog({ title, message, confirmLabel, onClose, onConfirm }) {
  return (
    <Dialog title={title} onClose={onClose}>
      <p className="muted">{message}</p>
      <div className="dialog-btns">
        <button className="qa-btn" onClick={onClose}>Cancel</button>
        <button className="qa-btn primary" onClick={onConfirm}>{confirmLabel}</button>
      </div>
    </Dialog>
  );
}

export function ChangePasswordDialog({ onClose, onConfirm }) {
  const [form, setForm] = useState({ current: "", next: "", repeat: "" });
  const valid = form.current && form.next.length >= 6 && form.next === form.repeat;
  return (
    <Dialog title="Change Password" onClose={onClose}>
      <p className="muted">Prototype only — no real authentication is updated.</p>
      <label className="field">Current password:<input type="password" value={form.current} onChange={(e) => setForm({ ...form, current: e.target.value })} /></label>
      <label className="field">New password:<input type="password" value={form.next} onChange={(e) => setForm({ ...form, next: e.target.value })} /></label>
      <label className="field">Confirm new password:<input type="password" value={form.repeat} onChange={(e) => setForm({ ...form, repeat: e.target.value })} /></label>
      <div className="dialog-btns">
        <button className="qa-btn" onClick={onClose}>Cancel</button>
        <button className="qa-btn primary" disabled={!valid} onClick={onConfirm}>Update Password</button>
      </div>
    </Dialog>
  );
}

export function EditProfileDialog({ profile, onClose, onConfirm }) {
  const [form, setForm] = useState({ ...profile });
  return (
    <Dialog title="Edit Profile" onClose={onClose}>
      <label className="field">Name:<input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></label>
      <label className="field">Department:<input value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })} /></label>
      <label className="field">Email:<input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></label>
      <label className="field">Phone:<input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></label>
      <div className="dialog-btns">
        <button className="qa-btn" onClick={onClose}>Cancel</button>
        <button className="qa-btn primary" disabled={!form.name.trim()} onClick={() => onConfirm(form)}>Save Profile</button>
      </div>
    </Dialog>
  );
}

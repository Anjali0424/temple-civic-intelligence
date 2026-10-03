import { useState } from "react";
import { X, Plus, Download } from "lucide-react";

function Dialog({ title, wide, onClose, children }) {
  return (
    <div className="detail-scrim dialog-scrim" onClick={onClose}>
      <div className={`glass ops-dialog ${wide ? "wide" : ""}`} role="dialog" aria-modal="true" aria-label={title} onClick={(e) => e.stopPropagation()}>
        <div className="detail-head">
          <h2>{title}</h2>
          <button className="icon-btn" onClick={onClose} aria-label={`Close ${title}`}><X size={17} /></button>
        </div>
        {children}
      </div>
    </div>
  );
}

export function CreateReportDialog({ initialType, onClose, onConfirm }) {
  const [form, setForm] = useState({
    name: "Daily Crowd Safety Report",
    type: initialType || "Crowd Summary",
    range: "Today", zone: "All Zones", format: "PDF",
  });
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  const valid = form.name.trim().length > 0;
  return (
    <Dialog title="Create Report" onClose={onClose}>
      <div className="form-grid">
        <label className="field wide">Report Name:<input value={form.name} onChange={set("name")} /></label>
        <label className="field">Report Type:
          <select value={form.type} onChange={set("type")}>
            {["Crowd Summary", "Zone Analysis", "Alert & Incident", "Camera Health", "Resource Deployment", "Event Summary"].map((t) => <option key={t}>{t}</option>)}
          </select>
        </label>
        <label className="field">Date Range:
          <select value={form.range} onChange={set("range")}>
            {["Today", "Yesterday", "Last 7 Days", "Last 30 Days", "Custom"].map((r) => <option key={r}>{r}</option>)}
          </select>
        </label>
        <label className="field">Zones:
          <select value={form.zone} onChange={set("zone")}>
            {["All Zones", "Zone A", "Zone B", "Zone C", "Zone D", "Zone E", "Zone F", "Zone G", "Zone H"].map((z) => <option key={z}>{z}</option>)}
          </select>
        </label>
        <label className="field">Format:
          <select value={form.format} onChange={set("format")}>{["PDF", "CSV"].map((f) => <option key={f}>{f}</option>)}</select>
        </label>
      </div>
      <div className="dialog-btns">
        <button className="qa-btn" onClick={onClose}>Cancel</button>
        <button className="qa-btn primary" disabled={!valid} onClick={() => onConfirm(form)}>Generate Report</button>
      </div>
    </Dialog>
  );
}

export function TextDialog({ title, initial, confirmLabel, onClose, onConfirm }) {
  const [value, setValue] = useState(initial || "");
  return (
    <Dialog title={title} onClose={onClose}>
      <label className="field">Name:<input value={value} onChange={(e) => setValue(e.target.value)} /></label>
      <div className="dialog-btns">
        <button className="qa-btn" onClick={onClose}>Cancel</button>
        <button className="qa-btn primary" disabled={!value.trim()} onClick={() => onConfirm(value.trim())}>{confirmLabel}</button>
      </div>
    </Dialog>
  );
}

export function ScheduleReportDialog({ onClose, onConfirm }) {
  const [form, setForm] = useState({ name: "Daily Crowd Summary", schedule: "Every day", time: "08:00 PM" });
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  return (
    <Dialog title="Create Schedule" onClose={onClose}>
      <label className="field">Report:<input value={form.name} onChange={set("name")} /></label>
      <label className="field">Frequency:
        <select value={form.schedule} onChange={set("schedule")}>
          {["Every day", "Every Monday", "1st of every month"].map((s) => <option key={s}>{s}</option>)}
        </select>
      </label>
      <label className="field">Time:<input value={form.time} onChange={set("time")} placeholder="08:00 PM" /></label>
      <div className="dialog-btns">
        <button className="qa-btn" onClick={onClose}>Cancel</button>
        <button className="qa-btn primary" disabled={!form.name.trim()} onClick={() => onConfirm(form)}>Create Schedule</button>
      </div>
    </Dialog>
  );
}

export function ReportPreviewDialog({ report, children, onClose, onDownload }) {
  return (
    <Dialog title={report ? `${report.name} — Preview` : "Report Preview"} wide onClose={onClose}>
      {children}
      <div className="dialog-btns preview-btns">
        <button className="qa-btn" onClick={() => onDownload(report, "PDF")}><Download size={15} /> Download PDF</button>
        <button className="qa-btn" onClick={() => onDownload(report, "CSV")}><Download size={15} /> Download CSV</button>
        <button className="qa-btn primary" onClick={onClose}>Close</button>
      </div>
    </Dialog>
  );
}

export function ScheduledReports({ schedules, onCreate, onToggle }) {
  return (
    <section className="card glass" aria-labelledby="sched-title">
      <div className="card-head">
        <h2 id="sched-title">Scheduled Reports</h2>
        <button className="link-btn" onClick={onCreate}><Plus size={14} aria-hidden="true" /> Create Schedule</button>
      </div>
      <ul className="sched-list">
        {schedules.map((s) => (
          <li key={s.id} className="sched-row">
            <div><strong>{s.name}</strong><small>{s.schedule} · {s.time}</small></div>
            <button className={`chip ${s.active ? "st-normal" : "st-low"}`} onClick={() => onToggle(s.id)}
              aria-pressed={s.active} aria-label={`Toggle ${s.name}`}>{s.active ? "Active" : "Paused"}</button>
          </li>
        ))}
      </ul>
    </section>
  );
}

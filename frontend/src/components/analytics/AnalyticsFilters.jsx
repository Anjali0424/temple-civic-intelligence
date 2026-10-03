import { useState } from "react";
import { Download, FileText, FileBarChart, Table } from "lucide-react";

export function ExportMenu() {
  const [open, setOpen] = useState(false);
  const [note, setNote] = useState(null);
  const pick = (kind) => { setOpen(false); setNote(`${kind} export queued (UI demo)`); setTimeout(() => setNote(null), 2200); };
  return (
    <div className="export-wrap">
      <button className="mt-refresh" onClick={() => setOpen((v) => !v)} aria-haspopup="menu" aria-expanded={open} aria-label="Export analytics">
        <Download size={15} /> Export
      </button>
      {open && (
        <div className="export-menu glass" role="menu" aria-label="Export options">
          <button role="menuitem" onClick={() => pick("CSV")}><Table size={15} /> Export CSV</button>
          <button role="menuitem" onClick={() => pick("PDF")}><FileText size={15} /> Export PDF</button>
          <button role="menuitem" onClick={() => pick("Summary")}><FileBarChart size={15} /> Export Summary</button>
        </div>
      )}
      {note && <span className="export-note" role="status">{note}</span>}
    </div>
  );
}

const metricOptions = ["Occupancy", "Entry Rate", "Exit Rate", "Density", "Alerts", "Flow"];
const timeOptions = ["All Day", "Morning", "Afternoon", "Evening"];

export default function AnalyticsFilters({ draft, onChange, onApply, onReset, cameraOptions, zoneOptions }) {
  const set = (k) => (e) => onChange({ ...draft, [k]: e.target.value });
  return (
    <section className="glass monitor-toolbar analytics-filters" aria-label="Analytics filters">
      <label className="mt-select">Date range:
        <select value={draft.range} onChange={set("range")} aria-label="Date range">
          {["Today", "Yesterday", "Last 7 Days", "Last 30 Days", "Custom Range"].map((o) => <option key={o}>{o}</option>)}
        </select>
      </label>
      <label className="mt-select">Time:
        <select value={draft.time} onChange={set("time")} aria-label="Time range">
          {timeOptions.map((o) => <option key={o}>{o}</option>)}
        </select>
      </label>
      <label className="mt-select">Zone:
        <select value={draft.zone} onChange={set("zone")} aria-label="Zone filter">
          {zoneOptions.map((o) => <option key={o}>{o}</option>)}
        </select>
      </label>
      <label className="mt-select">Camera:
        <select value={draft.camera} onChange={set("camera")} aria-label="Camera filter">
          {cameraOptions.map((o) => <option key={o}>{o}</option>)}
        </select>
      </label>
      <label className="mt-select">Metric:
        <select value={draft.metric} onChange={set("metric")} aria-label="Metric">
          {metricOptions.map((o) => <option key={o}>{o}</option>)}
        </select>
      </label>
      <button className="qa-btn primary apply-btn" onClick={onApply}>Apply</button>
      <button className="qa-btn" onClick={onReset}>Reset</button>
    </section>
  );
}

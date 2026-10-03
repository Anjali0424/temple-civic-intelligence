export default function ReportFilters({ draft, onChange, onApply, onReset }) {
  const set = (k) => (e) => onChange({ ...draft, [k]: e.target.value });
  return (
    <section className="glass monitor-toolbar" aria-label="Report filters">
      <label className="mt-select">Date Range:
        <select value={draft.range} onChange={set("range")} aria-label="Date range">
          {["Today", "Yesterday", "Last 7 Days", "Last 30 Days", "Custom Range"].map((o) => <option key={o}>{o}</option>)}
        </select>
      </label>
      <label className="mt-select">Report Type:
        <select value={draft.type} onChange={set("type")} aria-label="Report type filter">
          {["All Reports", "Crowd Summary", "Zone Analysis", "Alert & Incident", "Camera Health", "Resource Deployment", "Event Summary"].map((o) => <option key={o}>{o}</option>)}
        </select>
      </label>
      <label className="mt-select">Zone:
        <select value={draft.zone} onChange={set("zone")} aria-label="Zone scope">
          {["All Zones", "Zone A", "Zone B", "Zone C", "Zone D", "Zone E", "Zone F", "Zone G", "Zone H"].map((o) => <option key={o}>{o}</option>)}
        </select>
      </label>
      <label className="mt-select">Status:
        <select value={draft.status} onChange={set("status")} aria-label="Status filter">
          {["All", "Generated", "Processing", "Scheduled", "Failed"].map((o) => <option key={o}>{o}</option>)}
        </select>
      </label>
      <button className="qa-btn primary apply-btn" onClick={onApply}>Apply</button>
      <button className="qa-btn" onClick={onReset}>Reset</button>
    </section>
  );
}

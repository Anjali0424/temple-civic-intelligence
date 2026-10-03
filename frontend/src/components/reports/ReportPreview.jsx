import {
  analyticsSummary, venueZones, cameraInventory, opsResources, opsIncidents,
} from "../../data/mockData";

export function CrowdSummary() {
  const s = analyticsSummary;
  const rows = [
    ["Average Occupancy", s.avgOccupancy.toLocaleString()],
    ["Peak Occupancy", s.peakOccupancy.toLocaleString()],
    ["Peak Period", "11:30 AM – 1:30 PM"],
    ["Average Entry Rate", "356/min"],
    ["Average Exit Rate", "298/min"],
  ];
  return (
    <section aria-label="Crowd summary"><h3>Crowd Summary</h3>
      <dl className="doc-kv">{rows.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
    </section>
  );
}

export function ZoneSummary({ zoneFilter }) {
  const letter = zoneFilter?.replace("Zone ", "");
  const rows = venueZones
    .filter((z) => !letter || zoneFilter === "All Zones" || z.id === letter)
    .map((z) => ({ ...z, pct: Math.round((z.occupancy / z.capacity) * 100) }));
  return (
    <section aria-label="Zone summary"><h3>Zone Summary</h3>
      <div className="doc-table-wrap"><table className="doc-table">
        <thead><tr><th>Zone</th><th>Occupancy</th><th>Capacity</th><th>Utilization</th><th>Density</th><th>Status</th></tr></thead>
        <tbody>{rows.map((z) => (
          <tr key={z.id}><td>{z.name}</td><td>{z.occupancy.toLocaleString()}</td><td>{z.capacity.toLocaleString()}</td>
          <td>{z.pct}%</td><td>{z.density}</td><td>{z.status}</td></tr>
        ))}</tbody>
      </table></div>
    </section>
  );
}

export function AlertSummary() {
  const open = opsIncidents.filter((i) => !["Resolved", "Closed"].includes(i.status)).length;
  return (
    <section aria-label="Alert and incident summary"><h3>Alert &amp; Incident Summary</h3>
      <dl className="doc-kv cols-3">
        <div><dt>Total Alerts</dt><dd>42</dd></div>
        <div><dt>Critical</dt><dd>4</dd></div>
        <div><dt>High</dt><dd>12</dd></div>
        <div><dt>Warning</dt><dd>18</dd></div>
        <div><dt>Info</dt><dd>8</dd></div>
        <div><dt>Resolved</dt><dd>38</dd></div>
        <div><dt>Open</dt><dd>{open}</dd></div>
      </dl>
      <ul className="doc-list">
        {opsIncidents.map((i) => <li key={i.id}><strong>{i.id}</strong> · {i.title} · {i.zone} · {i.status} · {i.time}</li>)}
      </ul>
    </section>
  );
}

export function CameraSummary() {
  const c = cameraInventory;
  const n = (fn) => c.filter(fn).length;
  return (
    <section aria-label="Camera health summary"><h3>Camera Health</h3>
      <dl className="doc-kv cols-3">
        <div><dt>Total</dt><dd>{c.length}</dd></div>
        <div><dt>Online</dt><dd>{n((x) => x.status === "Online")}</dd></div>
        <div><dt>Offline</dt><dd>{n((x) => x.status === "Offline")}</dd></div>
        <div><dt>Degraded</dt><dd>{n((x) => x.status === "Degraded")}</dd></div>
        <div><dt>AI Processing</dt><dd>{n((x) => x.aiStatus === "Processing")}</dd></div>
        <div><dt>Healthy</dt><dd>{n((x) => x.health >= 90)}</dd></div>
      </dl>
    </section>
  );
}

export function ResourceSummary() {
  const r = opsResources;
  const inType = (t) => r.filter((x) => x.type === t).length;
  const inStatus = (s) => r.filter((x) => x.status === s).length;
  return (
    <section aria-label="Resource deployment summary"><h3>Resource Deployment</h3>
      <dl className="doc-kv cols-3">
        <div><dt>Field Officers</dt><dd>{inType("Field Officer")}</dd></div>
        <div><dt>Medical Teams</dt><dd>{inType("Medical Team")}</dd></div>
        <div><dt>Security Teams</dt><dd>{inType("Security Team")}</dd></div>
        <div><dt>Vehicles</dt><dd>{inType("Vehicle")}</dd></div>
        <div><dt>Available</dt><dd>{inStatus("Available")}</dd></div>
        <div><dt>Deployed</dt><dd>{inStatus("Deployed") + inStatus("Assigned")}</dd></div>
        <div><dt>Responding</dt><dd>{inStatus("Responding")}</dd></div>
      </dl>
    </section>
  );
}

export default function ReportPreview({ range, zone }) {
  const s = analyticsSummary;
  return (
    <section className="doc-paper" aria-labelledby="doc-title">
      <header className="doc-head">
        <p className="doc-brand">AI Crowd Intelligence</p>
        <h2 id="doc-title">Daily Crowd Safety Report</h2>
        <p className="doc-meta">Date: 12 September 2025 · Venue: Main Gathering Area · Period: {range} · Scope: {zone}</p>
      </header>
      <section aria-label="Executive summary"><h3>Executive Summary</h3>
        <dl className="doc-kv cols-3">
          <div><dt>Total Visitors</dt><dd>{s.visitors.toLocaleString()}</dd></div>
          <div><dt>Peak Occupancy</dt><dd>{s.peakOccupancy.toLocaleString()}</dd></div>
          <div><dt>Peak Hour</dt><dd>{s.peakHour}</dd></div>
          <div><dt>Total Entries</dt><dd>{s.entries.toLocaleString()}</dd></div>
          <div><dt>Total Exits</dt><dd>{s.exits.toLocaleString()}</dd></div>
        </dl>
      </section>
      <CrowdSummary />
      <ZoneSummary zoneFilter={zone} />
      <AlertSummary />
      <CameraSummary />
      <ResourceSummary />
      <footer className="doc-foot">Generated 12 Sep 2025 · 10:15 AM · Control Room Operator · Mock data — system values pending backend integration.</footer>
    </section>
  );
}

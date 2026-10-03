import { Search, RefreshCw } from "lucide-react";

export const statusOptions = ["All", "New", "Acknowledged", "Assigned", "In Progress", "Resolved", "Closed"];
export const severityOptions = ["All", "Info", "Warning", "High", "Critical"];
export const sortOptions = ["Newest", "Oldest", "Highest Severity"];

export default function AlertToolbar({ search, onSearch, status, onStatus, severity, onSeverity,
  type, onType, zone, onZone, sort, onSort, onRefresh, typeOptions }) {
  return (
    <section className="glass monitor-toolbar" aria-label="Alert controls">
      <label className="mt-search">
        <Search size={16} aria-hidden="true" />
        <input type="search" value={search} onChange={(e) => onSearch(e.target.value)}
          placeholder="Search alerts, zones, cameras..." aria-label="Search alerts by title, ID, zone or camera" />
      </label>
      <label className="mt-select">Status:
        <select value={status} onChange={(e) => onStatus(e.target.value)} aria-label="Filter by status">
          {statusOptions.map((o) => <option key={o}>{o}</option>)}
        </select>
      </label>
      <label className="mt-select">Severity:
        <select value={severity} onChange={(e) => onSeverity(e.target.value)} aria-label="Filter by severity">
          {severityOptions.map((o) => <option key={o}>{o}</option>)}
        </select>
      </label>
      <label className="mt-select">Type:
        <select value={type} onChange={(e) => onType(e.target.value)} aria-label="Filter by alert type">
          {typeOptions.map((o) => <option key={o}>{o}</option>)}
        </select>
      </label>
      <label className="mt-select">Zone:
        <select value={zone} onChange={(e) => onZone(e.target.value)} aria-label="Filter by zone">
          {["All Zones", "Zone A", "Zone B", "Zone C", "Zone D", "Zone E", "Zone F", "Zone G", "Zone H"].map((o) => <option key={o}>{o}</option>)}
        </select>
      </label>
      <label className="mt-select">Sort:
        <select value={sort} onChange={(e) => onSort(e.target.value)} aria-label="Sort alerts">
          {sortOptions.map((o) => <option key={o}>{o}</option>)}
        </select>
      </label>
      <button className="mt-refresh" onClick={onRefresh} aria-label="Refresh alerts"><RefreshCw size={15} /> Refresh</button>
    </section>
  );
}

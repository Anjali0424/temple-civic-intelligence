import { Search, LayoutGrid, List, RefreshCw } from "lucide-react";

const statusOptions = ["All Cameras", "Online", "Offline", "Degraded", "High Density", "Critical Alerts"];
const zoneOptions = ["All Zones", "Zone A", "Zone B", "Zone C", "Zone D"];

export default function MonitoringToolbar({ search, onSearch, status, onStatus, zone, onZone, view, onView, onRefresh }) {
  return (
    <section className="glass monitor-toolbar" aria-label="Monitoring controls">
      <label className="mt-search">
        <Search size={16} aria-hidden="true" />
        <input type="search" value={search} onChange={(e) => onSearch(e.target.value)}
          placeholder="Search cameras..." aria-label="Search cameras by ID, name, location or zone" />
      </label>
      <label className="mt-select">Filter:
        <select value={status} onChange={(e) => onStatus(e.target.value)} aria-label="Filter by camera status">
          {statusOptions.map((o) => <option key={o}>{o}</option>)}
        </select>
      </label>
      <label className="mt-select">
        <select value={zone} onChange={(e) => onZone(e.target.value)} aria-label="Filter by zone">
          {zoneOptions.map((o) => <option key={o}>{o}</option>)}
        </select>
      </label>
      <div className="mt-view" role="group" aria-label="View mode">
        <span className="mt-view-label">View:</span>
        <button className={`mt-toggle ${view === "grid" ? "on" : ""}`} onClick={() => onView("grid")}
          aria-pressed={view === "grid"} aria-label="Grid view">
          <LayoutGrid size={15} /> Grid
        </button>
        <button className={`mt-toggle ${view === "list" ? "on" : ""}`} onClick={() => onView("list")}
          aria-pressed={view === "list"} aria-label="List view">
          <List size={15} /> List
        </button>
      </div>
      <button className="mt-refresh" onClick={onRefresh} aria-label="Refresh camera feeds">
        <RefreshCw size={15} /> Refresh
      </button>
    </section>
  );
}

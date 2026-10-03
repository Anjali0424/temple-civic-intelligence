import { Search, RefreshCw, LayoutGrid, List } from "lucide-react";

export const resourceTypeTabs = ["All", "Field Officers", "Medical", "Security", "Vehicles"];
export const statusOptions = ["All", "Available", "Assigned", "Deployed", "Responding", "Unavailable"];
export const sortOptions = ["Availability", "Name", "Zone", "Status"];

export function ResourceTabs({ tab, onTab, counts }) {
  return (
    <div className="alert-tabs res-tabs" role="tablist" aria-label="Resource type tabs">
      {resourceTypeTabs.map((t) => (
        <button key={t} role="tab" aria-selected={tab === t} className={`alert-tab ${tab === t ? "on" : ""}`} onClick={() => onTab(t)}>
          {t}{counts?.[t] != null && <span className="tab-count">{counts[t]}</span>}
        </button>
      ))}
    </div>
  );
}

export default function ResourceToolbar({ search, onSearch, type, onType, status, onStatus, zone, onZone, sort, onSort, onRefresh, view, onView }) {
  return (
    <section className="glass monitor-toolbar" aria-label="Resource controls">
      <label className="mt-search">
        <Search size={16} aria-hidden="true" />
        <input type="search" value={search} onChange={(e) => onSearch(e.target.value)}
          placeholder="Search resources, officers, teams..." aria-label="Search resources by name, ID, type, zone or assignment" />
      </label>
      <label className="mt-select">Type:
        <select value={type} onChange={(e) => onType(e.target.value)} aria-label="Filter by resource type">
          {["All", "Field Officer", "Medical Team", "Security Team", "Vehicle"].map((o) => <option key={o}>{o}</option>)}
        </select>
      </label>
      <label className="mt-select">Status:
        <select value={status} onChange={(e) => onStatus(e.target.value)} aria-label="Filter by status">
          {statusOptions.map((o) => <option key={o}>{o}</option>)}
        </select>
      </label>
      <label className="mt-select">Zone:
        <select value={zone} onChange={(e) => onZone(e.target.value)} aria-label="Filter by zone">
          {["All Zones", "Zone A", "Zone B", "Zone C", "Zone D", "Zone E", "Zone F", "Zone G", "Zone H"].map((o) => <option key={o}>{o}</option>)}
        </select>
      </label>
      <label className="mt-select">Sort:
        <select value={sort} onChange={(e) => onSort(e.target.value)} aria-label="Sort resources">
          {sortOptions.map((o) => <option key={o}>{o}</option>)}
        </select>
      </label>
      <div className="mt-view" role="group" aria-label="View mode">
        <button className={`mt-toggle ${view === "grid" ? "on" : ""}`} onClick={() => onView("grid")} aria-pressed={view === "grid"} aria-label="Grid view"><LayoutGrid size={15} /></button>
        <button className={`mt-toggle ${view === "list" ? "on" : ""}`} onClick={() => onView("list")} aria-pressed={view === "list"} aria-label="List view"><List size={15} /></button>
      </div>
      <button className="mt-refresh" onClick={onRefresh} aria-label="Refresh resources"><RefreshCw size={15} /> Refresh</button>
    </section>
  );
}

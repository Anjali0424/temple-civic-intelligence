import { Search, LayoutGrid, List, RefreshCw } from "lucide-react";

export default function ZoneToolbar({ search, onSearch, status, onStatus, type, onType, view, onView, onRefresh, typeOptions }) {
  return (
    <section className="glass monitor-toolbar" aria-label="Zone controls">
      <label className="mt-search">
        <Search size={16} aria-hidden="true" />
        <input type="search" value={search} onChange={(e) => onSearch(e.target.value)}
          placeholder="Search zones..." aria-label="Search zones by name, location or ID" />
      </label>
      <label className="mt-select">Status:
        <select value={status} onChange={(e) => onStatus(e.target.value)} aria-label="Filter by zone status">
          {["All Status", "Normal", "Moderate", "High", "Critical"].map((o) => <option key={o}>{o}</option>)}
        </select>
      </label>
      <label className="mt-select">Type:
        <select value={type} onChange={(e) => onType(e.target.value)} aria-label="Filter by zone type">
          {typeOptions.map((o) => <option key={o}>{o}</option>)}
        </select>
      </label>
      <div className="mt-view" role="group" aria-label="View mode">
        <span className="mt-view-label">View:</span>
        <button className={`mt-toggle ${view === "grid" ? "on" : ""}`} onClick={() => onView("grid")}
          aria-pressed={view === "grid"} aria-label="Grid view"><LayoutGrid size={15} /> Grid</button>
        <button className={`mt-toggle ${view === "list" ? "on" : ""}`} onClick={() => onView("list")}
          aria-pressed={view === "list"} aria-label="List view"><List size={15} /> List</button>
      </div>
      <button className="mt-refresh" onClick={onRefresh} aria-label="Refresh zone data"><RefreshCw size={15} /> Refresh</button>
    </section>
  );
}

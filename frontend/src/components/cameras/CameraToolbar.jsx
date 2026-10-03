import { Search, RefreshCw, LayoutGrid, List } from "lucide-react";

export const camStatusOptions = ["All", "Online", "Offline", "Degraded", "Connecting", "Disabled"];
export const aiStatusOptions = ["All", "Processing", "Paused", "Error"];
export const camSortOptions = ["Name", "Status", "Zone", "Health", "Last Heartbeat"];

export default function CameraToolbar({ search, onSearch, status, onStatus, zone, onZone, ai, onAi, sort, onSort, view, onView, onRefresh }) {
  return (
    <section className="glass monitor-toolbar" aria-label="Camera controls">
      <label className="mt-search">
        <Search size={16} aria-hidden="true" />
        <input type="search" value={search} onChange={(e) => onSearch(e.target.value)}
          placeholder="Search cameras, locations, camera IDs..." aria-label="Search cameras by ID, name, location or zone" />
      </label>
      <label className="mt-select">Status:
        <select value={status} onChange={(e) => onStatus(e.target.value)} aria-label="Filter by camera status">
          {camStatusOptions.map((o) => <option key={o}>{o}</option>)}
        </select>
      </label>
      <label className="mt-select">Zone:
        <select value={zone} onChange={(e) => onZone(e.target.value)} aria-label="Filter by zone">
          {["All Zones", "Zone A", "Zone B", "Zone C", "Zone D", "Zone E", "Zone F", "Zone G", "Zone H"].map((o) => <option key={o}>{o}</option>)}
        </select>
      </label>
      <label className="mt-select">AI:
        <select value={ai} onChange={(e) => onAi(e.target.value)} aria-label="Filter by AI status">
          {aiStatusOptions.map((o) => <option key={o}>{o}</option>)}
        </select>
      </label>
      <label className="mt-select">Sort:
        <select value={sort} onChange={(e) => onSort(e.target.value)} aria-label="Sort cameras">
          {camSortOptions.map((o) => <option key={o}>{o}</option>)}
        </select>
      </label>
      <div className="mt-view" role="group" aria-label="View mode">
        <button className={`mt-toggle ${view === "grid" ? "on" : ""}`} onClick={() => onView("grid")} aria-pressed={view === "grid"} aria-label="Grid view"><LayoutGrid size={15} /></button>
        <button className={`mt-toggle ${view === "list" ? "on" : ""}`} onClick={() => onView("list")} aria-pressed={view === "list"} aria-label="List view"><List size={15} /></button>
      </div>
      <button className="mt-refresh" onClick={onRefresh} aria-label="Refresh camera inventory"><RefreshCw size={15} /> Refresh</button>
    </section>
  );
}

import CameraCard from "./CameraCard";

export default function CameraGrid({ cameras, view, pausedMap, onSelect, onFullscreen, onSnapshot, onTogglePause, onClearFilters }) {
  if (!cameras.length) {
    return (
      <section className="glass empty-state" aria-live="polite">
        <h2>No cameras match these filters</h2>
        <p>Try a different search term or filter combination.</p>
        <button className="qa-btn primary" onClick={onClearFilters}>Clear filters</button>
      </section>
    );
  }
  if (view === "list") {
    return (
      <section className="glass cam-list" aria-label="Cameras, list view">
        <div className="cam-list-head" aria-hidden="true">
          <span>Camera</span><span>Location</span><span>Status</span><span>People</span><span>Density</span><span>Zone</span><span>FPS</span><span>Updated</span>
        </div>
        {cameras.map((c) => {
          const paused = !!pausedMap[c.id];
          return (
            <button key={c.id} className="cam-list-row" onClick={() => onSelect(c)}
              aria-label={`${c.id} ${c.name}, ${paused ? "paused" : c.status}, ${c.peopleCount} people, ${c.density}, zone ${c.zone}`}>
              <strong>{c.id} · {c.name}</strong>
              <span>{c.location}</span>
              <span>{paused ? "Paused" : c.status}</span>
              <span>{c.status === "Offline" ? "—" : c.peopleCount}</span>
              <span>{c.density}</span>
              <span>{c.zone}</span>
              <span>{c.status === "Offline" ? "—" : c.fps}</span>
              <span>{c.lastUpdate}</span>
            </button>
          );
        })}
      </section>
    );
  }
  return (
    <section className="cam-grid" aria-label="Cameras, grid view">
      {cameras.map((c) => (
        <CameraCard key={c.id} cam={c} paused={!!pausedMap[c.id]}
          onSelect={onSelect} onFullscreen={onFullscreen} onSnapshot={onSnapshot} onTogglePause={onTogglePause} />
      ))}
    </section>
  );
}

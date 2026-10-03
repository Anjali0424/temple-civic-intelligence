import { useMemo, useState } from "react";
import MonitoringToolbar from "./MonitoringToolbar";
import MonitoringStats from "./MonitoringStats";
import CameraGrid from "./CameraGrid";
import CameraDetailPanel from "./CameraDetailPanel";
import FullscreenCameraDialog from "./FullscreenCameraDialog";
import { cameras } from "../../data/mockData";

const zoneLetter = (z) => z.replace("Zone ", "");

export default function LiveMonitoringPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All Cameras");
  const [zone, setZone] = useState("All Zones");
  const [view, setView] = useState("grid");
  const [selected, setSelected] = useState(null);
  const [fullscreen, setFullscreen] = useState(null);
  const [pausedMap, setPausedMap] = useState({});
  const [toast, setToast] = useState(null);
  const [stamp, setStamp] = useState("12 Sep 2025 · 10:24:36 AM");

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(null), 2200); };

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return cameras.filter((c) => {
      if (status === "Online" && c.status !== "Live") return false;
      if (status === "Offline" && c.status !== "Offline") return false;
      if (status === "Degraded" && c.status !== "Degraded") return false;
      if (status === "High Density" && c.density !== "High") return false;
      if (status === "Critical Alerts" && !c.alerts?.some((a) => a.severity === "Critical")) return false;
      if (zone !== "All Zones" && c.zone !== zoneLetter(zone)) return false;
      if (q && ![c.id, c.name, c.location, `zone ${c.zone}`, `zone ${c.zoneName}`.toLowerCase()].join(" ").toLowerCase().includes(q)) return false;
      return true;
    });
  }, [search, status, zone]);

  const togglePause = (cam) => {
    if (cam.status === "Offline") return;
    setPausedMap((m) => ({ ...m, [cam.id]: !m[cam.id] }));
  };
  const snapshot = (cam) => {
    if (cam.retry) { showToast(`Retry requested — ${cam.id}`); return; }
    showToast(`Snapshot captured — ${cam.id}`);
  };

  return (
    <div className="live-page">
      <section className="page-head" aria-labelledby="live-page-title">
        <div>
          <h1 id="live-page-title">Live Monitoring</h1>
          <p>Real-time CCTV intelligence and crowd activity</p>
        </div>
        <div className="page-head-right">
          <span className="live-pill"><span className="dot" /> System Live</span>
          <span className="head-cams">20 Cameras Connected</span>
          <span className="head-stamp">{stamp}</span>
        </div>
      </section>

      <MonitoringToolbar search={search} onSearch={setSearch} status={status} onStatus={setStatus}
        zone={zone} onZone={setZone} view={view} onView={setView}
        onRefresh={() => { setStamp("12 Sep 2025 · 10:24:36 AM"); showToast("Feeds refreshed"); }} />

      <MonitoringStats cameras={cameras} />

      <CameraGrid cameras={filtered} view={view} pausedMap={pausedMap}
        onSelect={setSelected} onFullscreen={setFullscreen} onSnapshot={snapshot} onTogglePause={togglePause}
        onClearFilters={() => { setSearch(""); setStatus("All Cameras"); setZone("All Zones"); }} />

      <CameraDetailPanel cam={selected} paused={selected ? !!pausedMap[selected.id] : false}
        onClose={() => setSelected(null)} onFullscreen={(c) => setFullscreen(c)} />

      <FullscreenCameraDialog cam={fullscreen} paused={fullscreen ? !!pausedMap[fullscreen.id] : false}
        onClose={() => setFullscreen(null)} onSnapshot={snapshot} onTogglePause={togglePause} />

      {toast && <div className="toast" role="status" aria-live="polite">{toast}</div>}
    </div>
  );
}

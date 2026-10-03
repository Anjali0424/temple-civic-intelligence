import { useMemo, useState } from "react";
import { Plus } from "lucide-react";
import CameraToolbar from "./CameraToolbar";
import CameraSummary from "./CameraSummary";
import CameraGrid from "./CameraGrid";
import CameraDetailPanel from "./CameraDetailPanel";
import { AddCameraDialog, CameraConfigurationDialog } from "./CameraDialogs";
import { cameraInventory } from "../../data/mockData";

const zoneLetter = (z) => z.replace("Zone ", "");
const hbRank = (hb) => hb; // "10:24:36 AM" strings sort lexicographically within same period

export default function CamerasPage() {
  const [inventory, setInventory] = useState(cameraInventory);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [zone, setZone] = useState("All Zones");
  const [ai, setAi] = useState("All");
  const [sort, setSort] = useState("Name");
  const [view, setView] = useState("grid");
  const [selectedId, setSelectedId] = useState("CAM-01");
  const [dialog, setDialog] = useState(null);
  const [toast, setToast] = useState(null);
  const [stamp, setStamp] = useState("12 Sep 2025 · 10:24:36 AM");

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(null), 2400); };
  const patch = (id, fn) => setInventory((list) => list.map((c) => (c.id === id ? fn(c) : c)));

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    let list = inventory.filter((c) => {
      if (status !== "All" && c.status !== status) return false;
      if (zone !== "All Zones" && c.zone !== zoneLetter(zone)) return false;
      if (ai !== "All" && c.aiStatus !== ai) return false;
      if (q && !`${c.id} ${c.name} ${c.location} zone ${c.zone}`.toLowerCase().includes(q)) return false;
      return true;
    });
    const statRank = { Online: 0, Connecting: 1, Degraded: 2, Offline: 3, Disabled: 4 };
    list = [...list].sort((a, b) =>
      sort === "Status" ? statRank[a.status] - statRank[b.status] || a.id.localeCompare(b.id)
      : sort === "Zone" ? a.zone.localeCompare(b.zone) || a.id.localeCompare(b.id)
      : sort === "Health" ? b.health - a.health
      : sort === "Last Heartbeat" ? hbRank(b.lastHeartbeat).localeCompare(hbRank(a.lastHeartbeat))
      : a.id.localeCompare(b.id));
    return list;
  }, [inventory, search, status, zone, ai, sort]);

  const selected = inventory.find((c) => c.id === selectedId) || filtered[0] || null;

  const toggleEnabled = (cam) => {
    if (cam.enabled) {
      patch(cam.id, (c) => ({ ...c, enabled: false, status: "Disabled", aiStatus: "Paused" }));
      showToast(`${cam.id} disabled · AI paused`);
    } else {
      patch(cam.id, (c) => ({ ...c, enabled: true, status: "Online", aiStatus: "Processing", lastHeartbeat: "10:26:00 AM" }));
      showToast(`${cam.id} enabled · back online`);
    }
  };

  return (
    <div className="live-page cameras-page">
      <section className="page-head" aria-labelledby="cameras-title">
        <div>
          <h1 id="cameras-title">Cameras</h1>
          <p>Manage camera sources, health and AI monitoring status</p>
        </div>
        <div className="page-head-right">
          <span className="live-pill"><span className="dot" /> System Live</span>
          <span className="head-cams">{inventory.length} Cameras</span>
          <span className="head-stamp">{stamp}</span>
          <button className="mt-refresh" onClick={() => setDialog({ kind: "add" })} aria-label="Add camera"><Plus size={15} /> Add Camera</button>
        </div>
      </section>

      <CameraSummary inventory={inventory} />

      <CameraToolbar search={search} onSearch={setSearch} status={status} onStatus={setStatus}
        zone={zone} onZone={setZone} ai={ai} onAi={setAi} sort={sort} onSort={setSort}
        view={view} onView={setView}
        onRefresh={() => { setStamp("12 Sep 2025 · 10:24:36 AM"); showToast("Inventory refreshed"); }} />

      <section className="cams-main" aria-label="Camera inventory workspace">
        <div className="cams-left">
          <CameraGrid cameras={filtered} view={view} selectedId={selected?.id}
            onSelect={setSelectedId} onConfigure={(c) => setDialog({ kind: "config", cam: c })} onToggleEnabled={toggleEnabled}
            onClearFilters={() => { setSearch(""); setStatus("All"); setZone("All Zones"); setAi("All"); }} />
        </div>
        <CameraDetailPanel cam={selected} onClose={() => setSelectedId(null)}
          onConfigure={(c) => setDialog({ kind: "config", cam: c })} onToggleEnabled={toggleEnabled} />
      </section>

      {dialog?.kind === "add" && (
        <AddCameraDialog onClose={() => setDialog(null)} existingIds={inventory.map((c) => c.id)}
          onConfirm={(f) => {
            setInventory((list) => [...list, {
              id: f.id, name: f.name, location: f.location, zone: f.zone, status: f.status,
              aiStatus: f.ai, fps: f.status === "Online" ? f.fps : 0, fpsTarget: f.fps, resolution: f.resolution,
              health: f.status === "Online" ? 95 : 50, streamQuality: 95, fpsStability: 94, heartbeat: 100,
              aiPipeline: f.ai === "Processing" ? 94 : 0, latency: 90, lastHeartbeat: "10:26:00 AM",
              streamSource: f.streamSource || "rtsp://camera-source/…", enabled: true, people: 0, density: "Normal",
            }]);
            setSelectedId(f.id); setDialog(null); showToast("Camera added successfully");
          }} />
      )}
      {dialog?.kind === "config" && (
        <CameraConfigurationDialog cam={dialog.cam} onClose={() => setDialog(null)}
          onConfirm={(f) => {
            patch(dialog.cam.id, (c) => ({ ...c, name: f.name, location: f.location, zone: f.zone,
              resolution: f.resolution, fpsTarget: f.fpsTarget, fps: c.status === "Offline" ? 0 : Math.min(c.fps || f.fpsTarget, f.fpsTarget),
              aiStatus: f.ai, status: f.status }));
            setDialog(null); showToast("Camera configuration updated");
          }} />
      )}

      {toast && <div className="toast" role="status" aria-live="polite">{toast}</div>}
    </div>
  );
}

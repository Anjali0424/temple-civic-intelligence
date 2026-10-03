import { useMemo, useState } from "react";
import ZoneToolbar from "./ZoneToolbar";
import ZoneSummaryCards from "./ZoneSummaryCards";
import VenueZoneMap from "./VenueZoneMap";
import SelectedZonePanel from "./SelectedZonePanel";
import ZoneGrid, { ZoneFlow } from "./ZoneGrid";
import { venueZones, zoneFlows } from "../../data/mockData";

export default function ZonesPage({ onViewCamera }) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All Status");
  const [type, setType] = useState("All Types");
  const [view, setView] = useState("grid");
  const [selectedId, setSelectedId] = useState("A");
  const [toast, setToast] = useState(null);
  const [stamp, setStamp] = useState("12 Sep 2025 · 10:24:36 AM");

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(null), 2200); };
  const typeOptions = useMemo(() => ["All Types", ...new Set(venueZones.map((z) => z.type))], []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return venueZones.filter((z) => {
      if (status !== "All Status" && z.status !== status) return false;
      if (type !== "All Types" && z.type !== type) return false;
      if (q && !`${z.id} ${z.name} zone ${z.id} ${z.location}`.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [search, status, type]);

  const selected = venueZones.find((z) => z.id === selectedId) || filtered[0] || venueZones[0];

  return (
    <div className="live-page zones-page">
      <section className="page-head" aria-labelledby="zones-title">
        <div>
          <h1 id="zones-title">Zones</h1>
          <p>Monitor occupancy, density and movement across venue zones</p>
        </div>
        <div className="page-head-right">
          <span className="live-pill"><span className="dot" /> System Live</span>
          <span className="head-cams">20 Cameras Connected</span>
          <span className="head-stamp">{stamp}</span>
        </div>
      </section>

      <ZoneToolbar search={search} onSearch={setSearch} status={status} onStatus={setStatus}
        type={type} onType={setType} view={view} onView={setView} typeOptions={typeOptions}
        onRefresh={() => { setStamp("12 Sep 2025 · 10:24:36 AM"); showToast("Zone data refreshed"); }} />

      <ZoneSummaryCards zones={venueZones} />

      <section className="zone-main" aria-label="Map and selected zone">
        <VenueZoneMap zones={filtered.length ? filtered : venueZones} selectedId={selected?.id}
          onSelect={setSelectedId} flows={zoneFlows} />
        <SelectedZonePanel zone={selected} onViewCamera={(camId) => onViewCamera?.(camId)} />
      </section>

      <ZoneFlow flows={zoneFlows} />

      <ZoneGrid zones={filtered} view={view} selectedId={selected?.id} onSelect={setSelectedId}
        onClearFilters={() => { setSearch(""); setStatus("All Status"); setType("All Types"); }} />

      {toast && <div className="toast" role="status" aria-live="polite">{toast}</div>}
    </div>
  );
}

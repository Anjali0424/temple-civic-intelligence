import { useMemo, useState } from "react";
import ResourceToolbar, { ResourceTabs } from "./ResourceToolbar";
import ResourceSummary, { ResourceAvailability } from "./ResourceSummary";
import ResourceGrid from "./ResourceGrid";
import ResourceDetailPanel from "./ResourceDetailPanel";
import { ResourceDeploymentMap, ZoneResourceNeeds, ResourceActivity } from "./ResourceSidePanels";
import { AssignResourceDialog, ReassignResourceDialog, UpdateStatusDialog } from "./ResourceDialogs";
import { opsResources, zoneResourceNeeds, resourceActivity } from "../../data/mockData";

const tabToType = { All: null, "Field Officers": "Field Officer", Medical: "Medical Team", Security: "Security Team", Vehicles: "Vehicle" };
const availRank = { Available: 0, Assigned: 1, Responding: 2, Deployed: 3, Unavailable: 4 };
const zoneLetter = (z) => z.replace("Zone ", "");
const zoneNames = {
  A: "Zone A — Main Entrance", B: "Zone B — Queue Area", C: "Zone C — Inner Premises",
  D: "Zone D — Exit Area", E: "Zone E — Courtyard", F: "Zone F — North Gate",
  G: "Zone G — Parking", H: "Zone H — Service Area",
};

export default function ResourcesPage() {
  const [resources, setResources] = useState(opsResources);
  const [activity, setActivity] = useState(resourceActivity);
  const [search, setSearch] = useState("");
  const [type, setType] = useState("All");
  const [status, setStatus] = useState("All");
  const [zone, setZone] = useState("All Zones");
  const [sort, setSort] = useState("Availability");
  const [tab, setTab] = useState("All");
  const [view, setView] = useState("grid");
  const [selectedId, setSelectedId] = useState("FO-0012");
  const [dialog, setDialog] = useState(null);
  const [toast, setToast] = useState(null);
  const [stamp, setStamp] = useState("12 Sep 2025 · 10:24:36 AM");

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(null), 2400); };
  const log = (text) => setActivity((a) => [{ text, time: "just now" }, ...a].slice(0, 8));
  const patch = (id, fn) => setResources((list) => list.map((r) => (r.id === id ? fn(r) : r)));

  const counts = useMemo(() => {
    const c = { All: resources.length };
    for (const [tabName, t] of Object.entries(tabToType)) {
      if (t) c[tabName] = resources.filter((r) => r.type === t).length;
    }
    return c;
  }, [resources]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    let list = resources.filter((r) => {
      if (tabToType[tab] && r.type !== tabToType[tab]) return false;
      if (type !== "All" && r.type !== type) return false;
      if (status !== "All" && r.status !== status) return false;
      if (zone !== "All Zones" && r.zone !== zoneLetter(zone)) return false;
      if (q && !`${r.name} ${r.id} ${r.type} ${r.zoneName} ${r.assignment?.task || ""}`.toLowerCase().includes(q)) return false;
      return true;
    });
    list = [...list].sort((a, b) =>
      sort === "Name" ? a.name.localeCompare(b.name)
      : sort === "Zone" ? a.zone.localeCompare(b.zone) || a.name.localeCompare(b.name)
      : sort === "Status" ? a.status.localeCompare(b.status)
      : availRank[a.status] - availRank[b.status] || a.name.localeCompare(b.name));
    return list;
  }, [resources, search, type, status, zone, sort, tab]);

  const selected = resources.find((r) => r.id === selectedId) || filtered[0] || null;
  const activeCount = resources.filter((r) => r.status !== "Unavailable").length;

  return (
    <div className="live-page resources-page">
      <section className="page-head" aria-labelledby="resources-title">
        <div>
          <h1 id="resources-title">Resources</h1>
          <p>Coordinate field teams, medical support, security and vehicles</p>
        </div>
        <div className="page-head-right">
          <span className="live-pill"><span className="dot" /> System Live</span>
          <span className="head-cams">{activeCount} Resources Active</span>
          <span className="head-stamp">{stamp}</span>
        </div>
      </section>

      <ResourceSummary resources={resources} />

      <section className="grid res-top-grid" aria-label="Availability and deployment">
        <div className="res-top-avail"><ResourceAvailability resources={resources} /></div>
        <div className="res-top-map"><ResourceDeploymentMap resources={resources} /></div>
      </section>

      <ResourceToolbar search={search} onSearch={setSearch} type={type} onType={setType}
        status={status} onStatus={setStatus} zone={zone} onZone={setZone} sort={sort} onSort={setSort}
        view={view} onView={setView}
        onRefresh={() => { setStamp("12 Sep 2025 · 10:24:36 AM"); showToast("Resources refreshed"); }} />

      <ResourceTabs tab={tab} onTab={setTab} counts={counts} />

      <section className="res-main" aria-label="Resource workspace">
        <div className="res-left">
          <ResourceGrid resources={filtered} view={view} selectedId={selected?.id}
            onSelect={setSelectedId} onAssign={(r) => setDialog({ kind: "assign", resource: r })}
            onClearFilters={() => { setSearch(""); setType("All"); setStatus("All"); setZone("All Zones"); setTab("All"); }} />
        </div>
        <div className="res-right">
          <ResourceDetailPanel resource={selected}
            onAssign={(r, viewOnly) => setDialog({ kind: "assign", resource: r, viewOnly })}
            onReassign={(r) => setDialog({ kind: "reassign", resource: r })}
            onStatus={(r) => setDialog({ kind: "status", resource: r })}
            onViewIncident={(inc) => showToast(inc ? `${inc} · response tracked in Alerts & Incidents` : "No linked incident")} />
          <ZoneResourceNeeds needs={zoneResourceNeeds} />
          <ResourceActivity activity={activity} />
        </div>
      </section>

      {dialog?.kind === "assign" && (
        <AssignResourceDialog resource={dialog.resource} viewOnly={dialog.viewOnly} onClose={() => setDialog(null)}
          onConfirm={({ zone: z, task, priority }) => {
            const letter = zoneLetter(z);
            patch(dialog.resource.id, (r) => ({ ...r, status: "Assigned", zone: letter, zoneName: zoneNames[letter] || z,
              assignment: { task, priority, since: "10:26 AM", incident: r.assignment?.incident || null }, lastUpdate: "10:26 AM" }));
            log(`${dialog.resource.name} assigned to ${z}`);
            setDialog(null); showToast("Resource assigned successfully");
          }} />
      )}
      {dialog?.kind === "reassign" && (
        <ReassignResourceDialog resource={dialog.resource} onClose={() => setDialog(null)}
          onConfirm={({ zone: z, task }) => {
            const letter = zoneLetter(z);
            patch(dialog.resource.id, (r) => ({ ...r, zone: letter, zoneName: zoneNames[letter] || z,
              assignment: { ...(r.assignment || { priority: "Normal", since: "10:26 AM", incident: null }), task }, lastUpdate: "10:26 AM" }));
            log(`${dialog.resource.name} reassigned to ${z}`);
            setDialog(null); showToast("Resource reassigned");
          }} />
      )}
      {dialog?.kind === "status" && (
        <UpdateStatusDialog resource={dialog.resource} onClose={() => setDialog(null)}
          onConfirm={({ status: s }) => {
            patch(dialog.resource.id, (r) => ({ ...r, status: s, lastUpdate: "10:26 AM" }));
            log(`${dialog.resource.name} marked ${s}`);
            setDialog(null); showToast(`Status updated to ${s}`);
          }} />
      )}

      {toast && <div className="toast" role="status" aria-live="polite">{toast}</div>}
    </div>
  );
}

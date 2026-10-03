import { useMemo, useState } from "react";
import AlertToolbar from "./AlertToolbar";
import AlertSummary from "./AlertSummary";
import AlertList, { AlertTabs } from "./AlertList";
import AlertDetails from "./AlertDetails";
import { AssignOfficerDialog, CreateIncidentDialog, EscalateDialog, ResolveDialog, IncidentList } from "./AlertDialogs";
import { opsAlerts, opsIncidents } from "../../data/mockData";

const sevRank = { Critical: 4, High: 3, Warning: 2, Info: 1 };
const zoneLetter = (z) => z.replace("Zone ", "");

export default function AlertsPage({ onViewCamera, onViewZone }) {
  const [alerts, setAlerts] = useState(opsAlerts);
  const [incidents, setIncidents] = useState(opsIncidents);
  const [incidentSeq, setIncidentSeq] = useState(122);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [severity, setSeverity] = useState("All");
  const [type, setType] = useState("All Types");
  const [zone, setZone] = useState("All Zones");
  const [sort, setSort] = useState("Newest");
  const [tab, setTab] = useState("Active");
  const [selectedId, setSelectedId] = useState("ALT-00124");
  const [dialog, setDialog] = useState(null);
  const [toast, setToast] = useState(null);
  const [stamp, setStamp] = useState("12 Sep 2025 · 10:24:36 AM");

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(null), 2400); };
  const typeOptions = useMemo(() => ["All Types", ...new Set(opsAlerts.map((a) => a.type))], []);

  const patch = (id, fn) => setAlerts((list) => list.map((a) => (a.id === id ? fn(a) : a)));
  const addTimeline = (a, text) => ({ ...a, timeline: [...a.timeline, { time: "10:26 AM", text }] });

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    let list = alerts.filter((a) => {
      if (tab === "Active" && ["Resolved", "Closed"].includes(a.status)) return false;
      if (tab === "Resolved" && !["Resolved", "Closed"].includes(a.status)) return false;
      if (status !== "All" && a.status !== status) return false;
      if (severity !== "All" && a.severity !== severity) return false;
      if (type !== "All Types" && a.type !== type) return false;
      if (zone !== "All Zones" && a.zone !== zoneLetter(zone)) return false;
      if (q && !`${a.title} ${a.id} ${a.zoneName} ${a.camera || ""} ${a.zone}`.toLowerCase().includes(q)) return false;
      return true;
    });
    list = [...list].sort((x, y) => sort === "Oldest" ? x.id.localeCompare(y.id)
      : sort === "Highest Severity" ? (sevRank[y.severity] - sevRank[x.severity] || y.id.localeCompare(x.id))
      : y.id.localeCompare(x.id));
    return list;
  }, [alerts, search, status, severity, type, zone, sort, tab]);

  const selected = alerts.find((a) => a.id === selectedId) || filtered[0] || null;

  const handleAction = (k, alert) => {
    if (k === "ack") {
      patch(alert.id, (a) => addTimeline({ ...a, status: "Acknowledged" }, "Operator acknowledged alert"));
      showToast("Alert acknowledged");
    } else if (k === "update") {
      patch(alert.id, (a) => addTimeline(a, "Operator posted a status update"));
      showToast("Status update recorded");
    } else if (k === "reopen") {
      patch(alert.id, (a) => addTimeline({ ...a, status: "New" }, "Alert reopened by operator"));
      showToast("Alert reopened");
    } else if (k === "details") {
      showToast(`${alert.id} · full audit trail available in Reports`);
    } else {
      setDialog({ kind: k, alert });
    }
  };

  const closeDialog = () => setDialog(null);

  return (
    <div className="live-page alerts-page">
      <section className="page-head" aria-labelledby="alerts-title">
        <div>
          <h1 id="alerts-title">Alerts &amp; Incidents</h1>
          <p>Monitor, acknowledge and respond to crowd safety events</p>
        </div>
        <div className="page-head-right">
          <span className="live-pill"><span className="dot" /> System Live</span>
          <span className="head-cams">{alerts.filter((a) => !["Resolved", "Closed"].includes(a.status)).length} Active Alerts</span>
          <span className="head-stamp">{stamp}</span>
        </div>
      </section>

      <AlertToolbar search={search} onSearch={setSearch} status={status} onStatus={setStatus}
        severity={severity} onSeverity={setSeverity} type={type} onType={setType} zone={zone} onZone={setZone}
        sort={sort} onSort={setSort} typeOptions={typeOptions}
        onRefresh={() => { setStamp("12 Sep 2025 · 10:24:36 AM"); showToast("Alerts refreshed"); }} />

      <AlertSummary alerts={alerts} />

      <AlertTabs tab={tab} onTab={setTab} />

      <section className="alerts-main" aria-label="Alert workspace">
        <div className="alerts-left">
          <AlertList alerts={filtered} selectedId={selected?.id} onSelect={setSelectedId}
            onClearFilters={() => { setSearch(""); setStatus("All"); setSeverity("All"); setType("All Types"); setZone("All Zones"); setTab("All"); }} />
          <IncidentList incidents={incidents} />
        </div>
        <AlertDetails alert={selected} onAction={handleAction}
          onViewCamera={(cam) => onViewCamera?.(cam)} onViewZone={(z) => onViewZone?.(z)} />
      </section>

      {dialog?.kind === "assign" && (
        <AssignOfficerDialog alert={dialog.alert} onClose={closeDialog}
          onConfirm={({ officer, priority }) => {
            patch(dialog.alert.id, (a) => addTimeline({ ...a, status: "Assigned", assignedOfficer: officer }, `${officer} assigned (${priority} priority)`));
            closeDialog(); showToast(`Assigned to ${officer}`);
          }} />
      )}
      {dialog?.kind === "incident" && (
        <CreateIncidentDialog alert={dialog.alert} onClose={closeDialog}
          onConfirm={({ officer }) => {
            const id = `INC-${String(incidentSeq).padStart(5, "0")}`;
            setIncidentSeq((n) => n + 1);
            setIncidents((list) => [{ id, title: dialog.alert.title, zone: dialog.alert.zoneName, status: "Open", time: "just now" }, ...list]);
            patch(dialog.alert.id, (a) => addTimeline({ ...a, status: "In Progress", assignedOfficer: officer }, `Incident ${id} created — response in progress`));
            closeDialog(); showToast(`Incident ${id} created · Status: Open`);
          }} />
      )}
      {dialog?.kind === "escalate" && (
        <EscalateDialog alert={dialog.alert} onClose={closeDialog}
          onConfirm={({ target }) => {
            patch(dialog.alert.id, (a) => addTimeline(a, `Escalated to ${target}`));
            closeDialog(); showToast(`Escalated to ${target}`);
          }} />
      )}
      {dialog?.kind === "resolve" && (
        <ResolveDialog alert={dialog.alert} onClose={closeDialog}
          onConfirm={() => {
            patch(dialog.alert.id, (a) => addTimeline({ ...a, status: "Resolved" }, "Alert resolved"));
            closeDialog(); showToast("Alert resolved");
          }} />
      )}

      {toast && <div className="toast" role="status" aria-live="polite">{toast}</div>}
    </div>
  );
}

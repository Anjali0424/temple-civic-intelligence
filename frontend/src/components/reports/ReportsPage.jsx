import { useMemo, useState } from "react";
import { Plus } from "lucide-react";
import { ReportSummary, QuickReportCards } from "./ReportSummary";
import ReportFilters from "./ReportFilters";
import ReportPreview from "./ReportPreview";
import ReportHistory from "./ReportHistory";
import { CreateReportDialog, TextDialog, ScheduleReportDialog, ReportPreviewDialog, ScheduledReports } from "./ReportDialogs";
import { reportHistorySeed, scheduledReportsSeed } from "../../data/mockData";

const defaultFilters = { range: "Today", type: "All Reports", zone: "All Zones", status: "All" };
let seq = 1025;

export default function ReportsPage() {
  const [history, setHistory] = useState(reportHistorySeed);
  const [schedules, setSchedules] = useState(scheduledReportsSeed);
  const [added, setAdded] = useState(0);
  const [draft, setDraft] = useState(defaultFilters);
  const [applied, setApplied] = useState(defaultFilters);
  const [dialog, setDialog] = useState(null);
  const [preview, setPreview] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(null), 2400); };

  const generate = (info) => {
    const id = `RP-${seq++}`;
    const entry = { id, name: info.name || info.title, type: info.type, date: "12 Sep 2025",
      createdBy: "Operator", format: info.format || "PDF", status: "Processing" };
    setHistory((h) => [entry, ...h]);
    setAdded((n) => n + 1);
    showToast("Report generation started");
    setTimeout(() => {
      setHistory((h) => h.map((r) => (r.id === id ? { ...r, status: "Generated" } : r)));
      showToast("Report generated successfully");
    }, 2500);
  };

  const filteredHistory = useMemo(() => history.filter((r) => {
    if (applied.type !== "All Reports" && r.type !== applied.type) return false;
    if (applied.status !== "All" && r.status !== applied.status) return false;
    if (applied.range === "Today" && !r.date.startsWith("12 Sep")) return false;
    if (applied.range === "Yesterday" && !r.date.startsWith("11 Sep")) return false;
    return true;
  }), [history, applied]);

  return (
    <div className="live-page reports-page">
      <section className="page-head" aria-labelledby="reports-title">
        <div>
          <h1 id="reports-title">Reports</h1>
          <p>Generate operational reports from crowd, safety and system activity</p>
        </div>
        <div className="page-head-right">
          <span className="live-pill"><span className="dot" /> System Live</span>
          <span className="head-stamp">12 Sep 2025</span>
          <button className="mt-refresh" onClick={() => setDialog({ kind: "create" })} aria-label="Create report">
            <Plus size={15} /> Create Report
          </button>
        </div>
      </section>

      <ReportSummary generatedTotal={24 + added} thisWeek={8 + added} scheduled={schedules.filter((s) => s.active).length} />

      <ReportFilters draft={draft} onChange={setDraft}
        onApply={() => { setApplied(draft); showToast("Filters applied"); }}
        onReset={() => { setDraft(defaultFilters); setApplied(defaultFilters); showToast("Filters reset"); }} />

      <QuickReportCards onGenerate={(q) => generate({ name: q.title, type: q.type, format: "PDF" })} />

      <section className="reports-main" aria-label="Preview and history">
        <div className="reports-preview-col">
          <section className="card glass" aria-labelledby="preview-title">
            <div className="card-head"><h2 id="preview-title">Report Preview</h2>
              <span className="map-hint">{applied.range} · {applied.zone}</span></div>
            <ReportPreview range={applied.range} zone={applied.zone} />
          </section>
        </div>
        <div className="reports-side">
          <ReportHistory reports={filteredHistory}
            onPreview={(r) => setPreview(r)}
            onDownload={(r) => showToast(`${r.format} export queued — ${r.name}`)}
            onRename={(r) => setDialog({ kind: "rename", report: r })}
            onDuplicate={(r) => {
              const id = `RP-${seq++}`;
              setHistory((h) => [{ ...r, id, name: `${r.name} (copy)`, status: "Generated" }, ...h]);
              setAdded((n) => n + 1); showToast("Report duplicated");
            }}
            onDelete={(r) => { setHistory((h) => h.filter((x) => x.id !== r.id)); showToast("Report deleted"); }} />
          <ScheduledReports schedules={schedules}
            onCreate={() => setDialog({ kind: "schedule" })}
            onToggle={(id) => setSchedules((s) => s.map((x) => (x.id === id ? { ...x, active: !x.active } : x)))} />
        </div>
      </section>

      {dialog?.kind === "create" && (
        <CreateReportDialog initialType={applied.type !== "All Reports" ? applied.type : undefined}
          onClose={() => setDialog(null)}
          onConfirm={(f) => { setDialog(null); generate(f); }} />
      )}
      {dialog?.kind === "rename" && (
        <TextDialog title={`Rename ${dialog.report.id}`} initial={dialog.report.name} confirmLabel="Rename"
          onClose={() => setDialog(null)}
          onConfirm={(name) => {
            setHistory((h) => h.map((x) => (x.id === dialog.report.id ? { ...x, name } : x)));
            setDialog(null); showToast("Report renamed");
          }} />
      )}
      {dialog?.kind === "schedule" && (
        <ScheduleReportDialog onClose={() => setDialog(null)}
          onConfirm={(f) => {
            setSchedules((s) => [...s, { id: `SCH-${String(s.length + 1).padStart(2, "0")}`, ...f, active: true }]);
            setDialog(null); showToast("Schedule created");
          }} />
      )}
      {preview && (
        <ReportPreviewDialog report={preview} onClose={() => setPreview(null)}
          onDownload={(r, fmt) => showToast(`${fmt} export queued — ${r.name}`)}>
          <ReportPreview range={applied.range} zone={applied.zone} />
        </ReportPreviewDialog>
      )}

      {toast && <div className="toast" role="status" aria-live="polite">{toast}</div>}
    </div>
  );
}

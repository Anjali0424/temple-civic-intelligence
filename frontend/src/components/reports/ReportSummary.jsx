import { FileBarChart, FileText, Table2, CalendarClock, BellRing, Camera } from "lucide-react";
import { quickReportTypes } from "../../data/mockData";

const icons = {
  crowd: FileBarChart, zone: Table2, alert: BellRing,
  camera: Camera, resource: CalendarClock, event: FileText,
};

export function ReportSummary({ generatedTotal, thisWeek, scheduled }) {
  const items = [
    { label: "Reports Generated", value: generatedTotal, sub: "all time" },
    { label: "Reports This Week", value: thisWeek, sub: "last 7 days" },
    { label: "Latest Report", value: "Today", sub: "Daily Crowd Safety" },
    { label: "Last Generated", value: "10:15 AM", sub: "12 Sep 2025" },
    { label: "Scheduled Reports", value: scheduled, sub: "active schedules" },
  ];
  return (
    <section className="monitor-stats report-stats" aria-label="Report summary">
      {items.map((s) => (
        <article key={s.label} className="glass mstat">
          <span className="mstat-icon"><FileBarChart size={16} aria-hidden="true" /></span>
          <div><p className="mstat-label">{s.label}</p>
          <p className="mstat-value">{s.value}</p>
          <p className="mstat-sub">{s.sub}</p></div>
        </article>
      ))}
    </section>
  );
}

export function QuickReportCards({ onGenerate }) {
  return (
    <section className="card glass" aria-labelledby="quick-reports-title">
      <div className="card-head"><h2 id="quick-reports-title">Quick Reports</h2></div>
      <div className="quick-grid">
        {quickReportTypes.map((q) => {
          const Icon = icons[q.key] || FileText;
          return (
            <article key={q.key} className="quick-card">
              <span className="res-avatar"><Icon size={17} aria-hidden="true" /></span>
              <div><strong>{q.title}</strong><p>{q.desc}</p></div>
              <button className="qa-btn" onClick={() => onGenerate(q)}>Generate</button>
            </article>
          );
        })}
      </div>
    </section>
  );
}

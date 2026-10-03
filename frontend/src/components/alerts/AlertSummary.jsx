import { BellRing, OctagonAlert, TrendingUp, TriangleAlert, UserCheck, Loader, CircleCheck } from "lucide-react";

export function SeverityBadge({ severity }) {
  const cls = { Critical: "sev-critical", High: "sev-high", Warning: "sev-warning", Info: "sev-system" }[severity] || "sev-system";
  return <span className={`chip ${cls}`}>{severity.toUpperCase()}</span>;
}

export function StatusBadge({ status }) {
  return <span className={`status-chip stt-${status.toLowerCase().replace(/ /g, "-")}`}>{status}</span>;
}

export default function AlertSummary({ alerts }) {
  const active = alerts.filter((a) => !["Resolved", "Closed"].includes(a.status));
  const n = (fn) => alerts.filter(fn).length;
  const items = [
    { icon: BellRing, label: "Active Alerts", value: active.length, sub: "need attention" },
    { icon: OctagonAlert, label: "Critical", value: n((a) => a.severity === "Critical" && !["Resolved", "Closed"].includes(a.status)), sub: "highest severity" },
    { icon: TrendingUp, label: "High", value: n((a) => a.severity === "High" && !["Resolved", "Closed"].includes(a.status)), sub: "elevated severity" },
    { icon: TriangleAlert, label: "Warning", value: n((a) => a.severity === "Warning" && !["Resolved", "Closed"].includes(a.status)), sub: "watch closely" },
    { icon: UserCheck, label: "Acknowledged", value: n((a) => ["Acknowledged", "Assigned"].includes(a.status)), sub: "being handled" },
    { icon: Loader, label: "In Progress", value: n((a) => a.status === "In Progress"), sub: "response ongoing" },
    { icon: CircleCheck, label: "Resolved Today", value: 14, sub: "closed loop" },
  ];
  return (
    <section className="monitor-stats alert-stats" aria-label="Alert summary">
      {items.map((s) => (
        <article key={s.label} className="glass mstat">
          <span className="mstat-icon"><s.icon size={16} aria-hidden="true" /></span>
          <div><p className="mstat-label">{s.label}</p>
          <p className="mstat-value">{s.value}</p>
          <p className="mstat-sub">{s.sub}</p></div>
        </article>
      ))}
    </section>
  );
}

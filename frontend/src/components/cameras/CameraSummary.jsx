import { Camera, Wifi, WifiOff, AlertTriangle, Cpu, HeartPulse, Stethoscope } from "lucide-react";

export function CameraStatusBadge({ status }) {
  const cls = { Online: "cb-live", Offline: "cb-off", Degraded: "cb-deg", Connecting: "cb-conn", Disabled: "cb-off" }[status] || "cb-live";
  return <span className={`cam-badge ${cls}`}>● {status.toUpperCase()}</span>;
}

export function AIStatusBadge({ ai }) {
  const cls = ai === "Processing" ? "ai-on" : ai === "Paused" ? "ai-paused" : "ai-err";
  return <span className={`ai-badge ${cls}`}>{ai === "Processing" ? "● AI Processing" : ai === "Paused" ? "❚❚ AI Paused" : "▲ AI Error"}</span>;
}

export function CameraHealth({ health, compact }) {
  const cls = health >= 90 ? "h-good" : health >= 70 ? "h-fair" : "h-bad";
  if (compact) {
    return (
      <span className="health-inline" role="img" aria-label={`Health ${health} percent`}>
        <span className="bar mini"><span className={`fill ${cls}`} style={{ width: `${health}%` }} /></span>
        <strong>{health}%</strong>
      </span>
    );
  }
  return (
    <div className="bar" role="progressbar" aria-valuenow={health} aria-valuemin={0} aria-valuemax={100} aria-label={`Health ${health} percent`}>
      <span className={`fill ${cls}`} style={{ width: `${health}%` }} />
    </div>
  );
}

export default function CameraSummary({ inventory }) {
  const n = (fn) => inventory.filter(fn).length;
  const online = n((c) => c.status === "Online");
  const items = [
    { icon: Camera, label: "Total Cameras", value: inventory.length, sub: "managed sources" },
    { icon: Wifi, label: "Online", value: online, sub: "streaming" },
    { icon: WifiOff, label: "Offline", value: n((c) => c.status === "Offline"), sub: "no heartbeat" },
    { icon: AlertTriangle, label: "Degraded", value: n((c) => c.status === "Degraded"), sub: "reduced quality" },
    { icon: Cpu, label: "AI Processing", value: n((c) => c.aiStatus === "Processing"), sub: "YOLO + tracker" },
    { icon: HeartPulse, label: "Healthy", value: n((c) => c.health >= 90), sub: "health ≥ 90%" },
    { icon: Stethoscope, label: "Needs Attention", value: n((c) => ["Offline", "Degraded"].includes(c.status)), sub: "review required" },
  ];
  return (
    <section className="monitor-stats cam-stats" aria-label="Camera summary">
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

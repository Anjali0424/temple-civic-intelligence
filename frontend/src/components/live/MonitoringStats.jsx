import { Camera, Wifi, WifiOff, AlertTriangle, Users, Flame, BellRing } from "lucide-react";

export default function MonitoringStats({ cameras }) {
  const total = cameras.length;
  const online = cameras.filter((c) => c.status === "Live").length;
  const offline = cameras.filter((c) => c.status === "Offline").length;
  const degraded = cameras.filter((c) => c.status === "Degraded").length;
  const people = cameras.reduce((n, c) => n + (c.peopleCount || 0), 0);
  const highDensity = cameras.filter((c) => c.density === "High").length;
  const camAlerts = cameras.reduce((n, c) => n + (c.alerts?.length || 0), 0);

  const items = [
    { icon: Camera, label: "Total Cameras", value: total, sub: "across 4 zones" },
    { icon: Wifi, label: "Online", value: online, sub: "streaming live" },
    { icon: WifiOff, label: "Offline", value: offline, sub: "needs attention" },
    { icon: AlertTriangle, label: "Degraded", value: degraded, sub: "poor signal" },
    { icon: Users, label: "People Detected", value: people.toLocaleString(), sub: "all live feeds" },
    { icon: Flame, label: "High Density", value: `${highDensity} Cameras`, sub: "crowded views" },
    { icon: BellRing, label: "Active Camera Alerts", value: camAlerts, sub: "open alerts" },
  ];

  return (
    <section className="monitor-stats" aria-label="Camera overview statistics">
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

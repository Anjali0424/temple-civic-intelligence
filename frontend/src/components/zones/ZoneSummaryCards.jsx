import { LayoutGrid, CircleCheck, Thermometer, Flame, OctagonAlert, Users, Database, Gauge } from "lucide-react";

export default function ZoneSummaryCards({ zones }) {
  const count = (s) => zones.filter((z) => z.status === s).length;
  const totalOcc = zones.reduce((n, z) => n + z.occupancy, 0);
  const totalCap = zones.reduce((n, z) => n + z.capacity, 0);
  const avg = totalCap ? Math.round((totalOcc / totalCap) * 100) : 0;
  const items = [
    { icon: LayoutGrid, label: "Total Zones", value: zones.length, sub: "monitored areas" },
    { icon: CircleCheck, label: "Normal", value: count("Normal"), sub: "within limits" },
    { icon: Thermometer, label: "Moderate", value: count("Moderate"), sub: "elevated" },
    { icon: Flame, label: "High", value: count("High"), sub: "near threshold" },
    { icon: OctagonAlert, label: "Critical", value: count("Critical"), sub: "action needed" },
    { icon: Users, label: "Total Occupancy", value: totalOcc.toLocaleString(), sub: "people in zones" },
    { icon: Database, label: "Overall Capacity", value: totalCap.toLocaleString(), sub: "max capacity" },
    { icon: Gauge, label: "Average Occupancy", value: `${avg}%`, sub: "across zones" },
  ];
  return (
    <section className="monitor-stats zone-stats" aria-label="Zone summary">
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

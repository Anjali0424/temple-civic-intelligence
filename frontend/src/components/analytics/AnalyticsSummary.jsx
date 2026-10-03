import { Users, ArrowUpCircle, Gauge, Clock, LogIn, LogOut, Flame, BellRing } from "lucide-react";
import { analyticsSummary, rangeFactors } from "../../data/mockData";

export default function AnalyticsSummary({ range }) {
  const f = rangeFactors[range] ?? 1;
  const s = analyticsSummary;
  const num = (v) => Math.round(v * f).toLocaleString();
  const items = [
    { icon: Users, label: "Total Visitors", value: num(s.visitors), trend: "+8% vs prev" },
    { icon: ArrowUpCircle, label: "Peak Occupancy", value: num(s.peakOccupancy), trend: "observed peak" },
    { icon: Gauge, label: "Average Occupancy", value: num(s.avgOccupancy), trend: "selected period" },
    { icon: Clock, label: "Peak Hour", value: s.peakHour, trend: "busiest hour" },
    { icon: LogIn, label: "Total Entries", value: num(s.entries), trend: "+10% vs prev" },
    { icon: LogOut, label: "Total Exits", value: num(s.exits), trend: "+3% vs prev" },
    { icon: Flame, label: "High Density Events", value: Math.round(s.highDensityEvents * f), trend: "recorded events" },
    { icon: BellRing, label: "Total Alerts", value: Math.round(s.alerts * f), trend: "all severities" },
  ];
  return (
    <section className="analytics-kpis" aria-label="Analytics summary">
      {items.map((k) => (
        <article key={k.label} className="glass mstat">
          <span className="mstat-icon"><k.icon size={16} aria-hidden="true" /></span>
          <div><p className="mstat-label">{k.label}</p>
          <p className="mstat-value">{k.value}</p>
          <p className="mstat-sub">{k.trend}</p></div>
        </article>
      ))}
    </section>
  );
}

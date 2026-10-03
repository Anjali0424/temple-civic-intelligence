import { Users, HeartPulse, ShieldCheck, Car, Layers } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

export function ResourceStatusBadge({ status }) {
  const cls = { Available: "rb-available", Assigned: "rb-assigned", Deployed: "rb-deployed", Responding: "rb-responding", Unavailable: "rb-unavailable" }[status] || "rb-available";
  const dot = status === "Available" || status === "Responding";
  return <span className={`res-badge ${cls}`}>{dot ? "● " : ""}{status}</span>;
}

export default function ResourceSummary({ resources }) {
  const inType = (t) => resources.filter((r) => r.type === t);
  const avail = (list) => list.filter((r) => r.status === "Available").length;
  const busy = (list) => list.length - avail(list);
  const cards = [
    { icon: Users, label: "Field Officers", list: inType("Field Officer") },
    { icon: HeartPulse, label: "Medical Teams", list: inType("Medical Team") },
    { icon: ShieldCheck, label: "Security Teams", list: inType("Security Team") },
    { icon: Car, label: "Vehicles", list: inType("Vehicle") },
    { icon: Layers, label: "Total Resources", list: resources },
  ];
  return (
    <section className="monitor-stats res-summary" aria-label="Resource summary">
      {cards.map((c) => (
        <article key={c.label} className="glass mstat">
          <span className="mstat-icon"><c.icon size={16} aria-hidden="true" /></span>
          <div><p className="mstat-label">{c.label}</p>
          <p className="mstat-value">{c.list.length}</p>
          <p className="mstat-sub">{avail(c.list)} Available · {busy(c.list)} Deployed</p></div>
        </article>
      ))}
    </section>
  );
}

export function ResourceAvailability({ resources }) {
  const order = ["Available", "Deployed", "Responding", "Unavailable"];
  const color = { Available: "#22c55e", Deployed: "#8b5cf6", Responding: "#f97316", Unavailable: "#94a3b8" };
  const data = [
    ...order.map((s) => ({ name: s, value: resources.filter((r) => r.status === s || (s === "Deployed" && r.status === "Assigned")).length })),
  ];
  const assigned = resources.filter((r) => r.status === "Assigned").length;
  const total = resources.length;
  return (
    <section className="card glass" aria-labelledby="res-avail-title">
      <div className="card-head"><h2 id="res-avail-title">Resource Availability</h2></div>
      <div className="donut-wrap">
        <div style={{ width: 150, height: 150 }} role="img" aria-label={`${data[0].value} of ${total} resources available`}>
          <ResponsiveContainer>
            <PieChart>
              <Pie data={data} dataKey="value" innerRadius={52} outerRadius={70} paddingAngle={3} strokeWidth={0} isAnimationActive={false}>
                {data.map((d) => <Cell key={d.name} fill={color[d.name]} />)}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="donut-center"><strong>{data[0].value}</strong><small>of {total}<br />Available</small></div>
        </div>
        <ul className="donut-legend">
          {data.map((d) => <li key={d.name}><i style={{ background: color[d.name] }} /> {d.name} — {d.value}</li>)}
        </ul>
      </div>
      {assigned > 0 && <p className="muted small" style={{ margin: "8px 0 0" }}>{assigned} newly assigned included under Deployed.</p>}
    </section>
  );
}

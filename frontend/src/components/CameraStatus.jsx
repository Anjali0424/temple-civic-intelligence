import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { cameraStats } from "../data/mockData";

export default function CameraStatus() {
  const c = cameraStats;
  const data = [
    { name: "Online", value: c.online, color: "#22c55e" },
    { name: "Offline", value: c.offline, color: "#ef4444" },
    { name: "Degraded", value: c.degraded, color: "#f59e0b" },
    ...(c.connecting ? [{ name: "Connecting", value: c.connecting, color: "#6366f1" }] : []),
  ];
  return (
    <section className="card glass span-4" aria-labelledby="cam-title">
      <div className="card-head"><h2 id="cam-title">Camera Status</h2>
        <button className="link-btn">View All <span aria-hidden="true">→</span></button></div>
      <div className="donut-wrap">
        <div style={{ width: 150, height: 150 }} role="img" aria-label={`${c.online} of ${c.total} cameras online, ${c.uptimePct} percent`}>
          <ResponsiveContainer>
            <PieChart>
              <Pie data={data} dataKey="value" innerRadius={52} outerRadius={70} paddingAngle={3} strokeWidth={0} isAnimationActive={false}>
                {data.map((d) => <Cell key={d.name} fill={d.color} />)}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="donut-center"><strong>{c.uptimePct}%</strong><small>{c.online} / {c.total}<br />Cameras Online</small></div>
        </div>
        <ul className="donut-legend">
          <li><i style={{ background: "#22c55e" }} /> Online — {c.online}</li>
          <li><i style={{ background: "#ef4444" }} /> Offline — {c.offline}</li>
          <li><i style={{ background: "#f59e0b" }} /> Degraded — {c.degraded}</li>
          <li><i style={{ background: "#6366f1" }} /> Connecting — {c.connecting}</li>
        </ul>
      </div>
    </section>
  );
}

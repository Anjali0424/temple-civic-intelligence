import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import { venueZones, densityDistributionData, peakHourData } from "../../data/mockData";

const densColor = { Normal: "#22c55e", Moderate: "#f59e0b", High: "#f97316", Critical: "#ef4444" };

export function ZoneUtilization({ highlight }) {
  const rows = venueZones.map((z) => ({ ...z, pct: Math.round((z.occupancy / z.capacity) * 100) }))
    .sort((a, b) => b.pct - a.pct);
  const top = rows[0], low = rows[rows.length - 1];
  return (
    <section className="card glass span-6" aria-labelledby="zone-util-title">
      <div className="card-head"><div><h2 id="zone-util-title">Zone Utilization</h2>
      <p className="chart-sub">Highest: {top.name} · Lowest: {low.name}{highlight && highlight !== "All Zones" ? ` · Highlight: ${highlight}` : ""}</p></div></div>
      <ul className="util-list">
        {rows.map((z) => (
          <li key={z.id} className={highlight && highlight !== "All Zones" && !highlight.endsWith(z.id) ? "dimmed" : ""}
            aria-label={`${z.name} ${z.location}, ${z.pct} percent utilized`}>
            <span className="util-name">{z.name}</span>
            <span className="util-bar"><span className="util-fill" style={{ width: `${z.pct}%`, background: densColor[z.status] || "#5b5bd6" }} /></span>
            <span className="util-pct">{z.pct}%</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function DensityDistribution() {
  return (
    <section className="card glass span-6" aria-labelledby="dens-dist-title">
      <div className="card-head"><h2 id="dens-dist-title">Crowd Density Distribution</h2></div>
      <div className="donut-wrap">
        <div style={{ width: 170, height: 170 }} role="img" aria-label="Density distribution: Normal 58, Moderate 24, High 14, Critical 4 percent">
          <ResponsiveContainer>
            <PieChart>
              <Pie data={densityDistributionData} dataKey="value" nameKey="name" innerRadius={58} outerRadius={78}
                paddingAngle={3} strokeWidth={0} isAnimationActive={false}>
                {densityDistributionData.map((d) => <Cell key={d.name} fill={densColor[d.name]} />)}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: 12, fontSize: 12 }} formatter={(v, n) => [`${v}%`, n]} />
            </PieChart>
          </ResponsiveContainer>
          <div className="donut-center"><strong>100%</strong><small>observed<br />states</small></div>
        </div>
        <ul className="donut-legend">
          {densityDistributionData.map((d) => (
            <li key={d.name}><i style={{ background: densColor[d.name] }} /> {d.name} — {d.value}%</li>
          ))}
        </ul>
      </div>
      <p className="muted small">Distribution of observed crowd-density states during the selected period.</p>
    </section>
  );
}

const heatColor = (l) => l >= 90 ? "#dc2626" : l >= 65 ? "#f97316" : l >= 35 ? "#f59e0b" : "#22c55e";

export function PeakHours() {
  return (
    <section className="card glass span-6" aria-labelledby="peak-hours-title">
      <div className="card-head"><div><h2 id="peak-hours-title">Peak Crowd Periods</h2>
      <p className="chart-sub">Peak period: 11:30 AM – 1:30 PM</p></div></div>
      <div style={{ width: "100%", height: 200 }} role="img" aria-label="Hourly activity heatmap peaking midday">
        <ResponsiveContainer>
          <BarChart data={peakHourData} margin={{ top: 10, right: 12, bottom: 0, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(15,23,42,.08)" vertical={false} />
            <XAxis dataKey="t" tick={{ fontSize: 11, fill: "#5b6478" }} axisLine={false} tickLine={false} />
            <YAxis hide domain={[0, 110]} />
            <Tooltip contentStyle={{ borderRadius: 12, fontSize: 12 }} formatter={(v) => [`${v}% activity`, "Level"]} />
            <Bar dataKey="level" radius={[7, 7, 4, 4]} isAnimationActive={false}>
              {peakHourData.map((p) => <Cell key={p.t} fill={heatColor(p.level)} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <p className="legend-row" aria-label="Activity legend">
        <span><i className="swatch" style={{ background: "#22c55e" }} /> Low</span>
        <span><i className="swatch" style={{ background: "#f59e0b" }} /> Moderate</span>
        <span><i className="swatch" style={{ background: "#f97316" }} /> High</span>
        <span><i className="swatch" style={{ background: "#dc2626" }} /> Peak</span>
      </p>
    </section>
  );
}

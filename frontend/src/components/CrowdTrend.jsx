import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceDot } from "recharts";
import { trendData } from "../data/mockData";

export default function CrowdTrend() {
  return (
    <section className="card glass span-7" aria-labelledby="trend-title">
      <div className="card-head">
        <h2 id="trend-title">Crowd Trend</h2>
        <label className="select-wrap">Period:
          <select aria-label="Trend period" defaultValue="Today">
            <option>Today</option><option>Yesterday</option><option>Last 7 days</option>
          </select>
        </label>
      </div>
      <div style={{ width: "100%", height: 260 }} role="img" aria-label="Crowd trend chart peaking at 12,486 at 10:24 AM">
        <ResponsiveContainer>
          <AreaChart data={trendData} margin={{ top: 10, right: 12, bottom: 0, left: 0 }}>
            <defs>
              <linearGradient id="crowdGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#5b5bd6" stopOpacity={0.35} />
                <stop offset="100%" stopColor="#5b5bd6" stopOpacity={0.03} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(15,23,42,.08)" vertical={false} />
            <XAxis dataKey="t" tick={{ fontSize: 11, fill: "#5b6478" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: "#5b6478" }} axisLine={false} tickLine={false}
              tickFormatter={(v) => (v >= 1000 ? `${Math.round(v / 1000)}K` : v)} width={40} />
            <Tooltip formatter={(v) => [Number(v).toLocaleString(), "Crowd"]}
              contentStyle={{ borderRadius: 12, border: "1px solid rgba(15,23,42,.1)", fontSize: 12 }} />
            <Area type="monotone" dataKey="crowd" stroke="#5b5bd6" strokeWidth={2.5} fill="url(#crowdGrad)" />
            <ReferenceDot x="10AM" y={12486} r={5} fill="#5b5bd6" stroke="#fff" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <p className="trend-note"><strong>12,486</strong> · 10:24 AM · current point highlighted</p>
    </section>
  );
}

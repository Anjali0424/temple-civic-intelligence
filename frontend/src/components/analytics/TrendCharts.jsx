import { useState } from "react";
import { AreaChart, Area, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { zoneComparisonData } from "../../data/mockData";

const fmtK = (v) => (v >= 1000 ? `${Math.round(v / 100) / 10}K` : v);
const tipStyle = { borderRadius: 12, border: "1px solid rgba(15,23,42,.1)", fontSize: 12 };

const metricConf = {
  Occupancy: { key: "occupancy", color: "#5b5bd6", fill: "crowdGrad", label: "Occupancy" },
  "Entry Rate": { key: "entering", color: "#16a34a", fill: "enterGrad", label: "Entering / min" },
  "Exit Rate": { key: "exiting", color: "#0891b2", fill: "exitGrad", label: "Exiting / min" },
  Density: { key: "densityScore", color: "#f59e0b", fill: "densGrad", label: "Density score" },
  Alerts: { key: "alerts", color: "#dc2626", fill: "alertGrad", label: "Alerts" },
  Flow: { key: "net", color: "#7c3aed", fill: "flowGrad", label: "Net flow / min" },
};

const densScore = { Normal: 25, Moderate: 50, High: 75, Critical: 100 };

export function MetricTip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  const p = payload[0].payload;
  return (
    <div className="chart-tip">
      <strong>{label}</strong>
      <span>Occupancy: {p.occupancy?.toLocaleString()}</span>
      <span>Entering: {p.entering}/min · Exiting: {p.exiting}/min</span>
      <span>Density: {p.density}</span>
    </div>
  );
}

export function OccupancyTrend({ allTrends, range, onRange, metric }) {
  const data = allTrends[range] || allTrends.Today;
  const conf = metricConf[metric] || metricConf.Occupancy;
  const peak = data.reduce((m, p) => (p.occupancy > m.occupancy ? p : m), data[0]);
  const tabs = ["Today", "Last 7 Days", "Last 30 Days"];
  return (
    <section className="card glass span-12 analytics-main-chart" aria-labelledby="occ-trend-title">
      <div className="card-head">
        <div><h2 id="occ-trend-title">Crowd {conf.label} Trend</h2>
        <p className="chart-sub">Peak {peak.occupancy.toLocaleString()} · 12:10 PM · {range}</p></div>
        <div className="chart-tabs" role="group" aria-label="Trend range">
          {tabs.map((t) => (
            <button key={t} className={`mt-toggle ${range === t ? "on" : ""}`} onClick={() => onRange(t)}
              aria-pressed={range === t}>{t === "Last 7 Days" ? "7 Days" : t === "Last 30 Days" ? "30 Days" : t}</button>
          ))}
        </div>
      </div>
      <div style={{ width: "100%", height: 300 }} role="img" aria-label={`Crowd trend chart, peak ${peak.occupancy.toLocaleString()}`}>
        <ResponsiveContainer>
          <AreaChart data={data} margin={{ top: 10, right: 12, bottom: 0, left: 0 }}>
            <defs>
              <linearGradient id="crowdGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={conf.color} stopOpacity={0.35} />
                <stop offset="100%" stopColor={conf.color} stopOpacity={0.03} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(15,23,42,.08)" vertical={false} />
            <XAxis dataKey="t" tick={{ fontSize: 11, fill: "#5b6478" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: "#5b6478" }} axisLine={false} tickLine={false} tickFormatter={fmtK} width={42} />
            <Tooltip content={<MetricTip />} />
            <Area type="monotone" dataKey={conf.key} name={conf.label} stroke={conf.color} strokeWidth={2.5} fill="url(#crowdGrad)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <p className="trend-note">Observed measurements only · no predictive claims</p>
    </section>
  );
}

export function EntryExitChart({ data, cameraNote }) {
  const peakIn = data.reduce((m, p) => (p.entering > m.entering ? p : m), data[0]);
  const peakOut = data.reduce((m, p) => (p.exiting > m.exiting ? p : m), data[0]);
  return (
    <section className="card glass span-6" aria-labelledby="entry-exit-title">
      <div className="card-head"><div><h2 id="entry-exit-title">Entry vs Exit Flow</h2>
      <p className="chart-sub">In peak {peakIn.entering}/min · Out peak {peakOut.exiting}/min{cameraNote ? ` · ${cameraNote}` : ""}</p></div></div>
      <div style={{ width: "100%", height: 250 }} role="img" aria-label="Entry versus exit flow chart">
        <ResponsiveContainer>
          <LineChart data={data} margin={{ top: 10, right: 12, bottom: 0, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(15,23,42,.08)" vertical={false} />
            <XAxis dataKey="t" tick={{ fontSize: 11, fill: "#5b6478" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: "#5b6478" }} axisLine={false} tickLine={false} width={36} />
            <Tooltip contentStyle={tipStyle} formatter={(v, name) => [`${v}/min`, name]} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Line type="monotone" dataKey="entering" name="Entering" stroke="#16a34a" strokeWidth={2.2} dot={false} />
            <Line type="monotone" dataKey="exiting" name="Exiting" stroke="#0891b2" strokeWidth={2.2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}

const zoneColors = { A: "#5b5bd6", B: "#0891b2", C: "#16a34a", D: "#f59e0b", E: "#ef4444" };

export function ZoneComparison({ data, preselected }) {
  const [sel, setSel] = useState(["A", "B", "C", "D"]);
  const toggle = (z) => setSel((s) => {
    if (s.includes(z)) return s.length > 1 ? s.filter((x) => x !== z) : s;
    if (s.length >= 4) return s;
    const next = [...s, z];
    return next;
  });
  const zones = Object.keys(zoneColors);
  return (
    <section className="card glass span-6" aria-labelledby="zone-comp-title">
      <div className="card-head"><div><h2 id="zone-comp-title">Zone Occupancy Comparison</h2>
      <p className="chart-sub">Select up to 4 zones {preselected && preselected !== "All Zones" ? `· filtered: ${preselected}` : ""}</p></div></div>
      <div className="zone-toggle-row" role="group" aria-label="Zones to compare">
        {zones.map((z) => (
          <button key={z} className={`zone-toggle ${sel.includes(z) ? "on" : ""}`} onClick={() => toggle(z)}
            aria-pressed={sel.includes(z)} style={sel.includes(z) ? { borderColor: zoneColors[z], color: zoneColors[z] } : undefined}>
            Zone {z}
          </button>
        ))}
      </div>
      <div style={{ width: "100%", height: 220 }} role="img" aria-label={`Zone comparison for ${sel.join(", ")}`}>
        <ResponsiveContainer>
          <LineChart data={data} margin={{ top: 10, right: 12, bottom: 0, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(15,23,42,.08)" vertical={false} />
            <XAxis dataKey="t" tick={{ fontSize: 11, fill: "#5b6478" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: "#5b6478" }} axisLine={false} tickLine={false} tickFormatter={fmtK} width={42} />
            <Tooltip contentStyle={tipStyle} formatter={(v) => [Number(v).toLocaleString(), "Occupancy"]} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            {sel.map((z) => <Line key={z} type="monotone" dataKey={z} name={`Zone ${z}`} stroke={zoneColors[z]} strokeWidth={2} dot={false} />)}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}

export { zoneComparisonData };

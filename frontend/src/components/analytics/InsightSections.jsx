import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Sparkles, ArrowRight } from "lucide-react";
import { alertTrendData, alertByTypeData, zoneFlows, insightData, comparisonData } from "../../data/mockData";

const sevColor = { Critical: "#ef4444", High: "#f97316", Warning: "#f59e0b", Info: "#3b82f6" };

export function AlertAnalytics() {
  const counts = [
    { label: "Critical", value: 4 }, { label: "High", value: 12 },
    { label: "Warning", value: 18 }, { label: "Info", value: 8 },
  ];
  return (
    <section className="card glass span-6" aria-labelledby="alert-analytics-title">
      <div className="card-head"><div><h2 id="alert-analytics-title">Alert Analytics</h2>
      <p className="chart-sub">Total 42 alerts · recorded in period</p></div></div>
      <ul className="alert-count-row">
        {counts.map((c) => (
          <li key={c.label}><i style={{ background: sevColor[c.label] }} />{c.label}<strong>{c.value}</strong></li>
        ))}
      </ul>
      <div style={{ width: "100%", height: 170 }} role="img" aria-label="Alert frequency over time">
        <ResponsiveContainer>
          <BarChart data={alertTrendData} margin={{ top: 10, right: 12, bottom: 0, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(15,23,42,.08)" vertical={false} />
            <XAxis dataKey="t" tick={{ fontSize: 11, fill: "#5b6478" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: "#5b6478" }} axisLine={false} tickLine={false} width={30} />
            <Tooltip contentStyle={{ borderRadius: 12, fontSize: 12 }} formatter={(v) => [v, "Alerts"]} />
            <Bar dataKey="alerts" fill="#5b5bd6" radius={[6, 6, 3, 3]} isAnimationActive={false} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <ul className="by-type-list">
        {alertByTypeData.map((t) => (
          <li key={t.type}><span>{t.type}</span><span className="by-type-bar"><span style={{ width: `${Math.round((t.count / 11) * 100)}%` }} /></span><strong>{t.count}</strong></li>
        ))}
      </ul>
    </section>
  );
}

export function FlowAnalytics() {
  return (
    <section className="card glass span-6" aria-labelledby="flow-analytics-title">
      <div className="card-head"><div><h2 id="flow-analytics-title">Crowd Flow</h2>
      <p className="chart-sub">Top observed movement paths · aggregate only</p></div></div>
      <ol className="flow-rank">
        {zoneFlows.map((f, i) => (
          <li key={i}>
            <span className="flow-rank-num">{i + 1}</span>
            <span className="flow-edge"><strong>Zone {f.from}</strong> <ArrowRight size={13} aria-hidden="true" /> <strong>Zone {f.to}</strong></span>
            <span className="flow-rate">{f.rate} people/min</span>
          </li>
        ))}
      </ol>
      <p className="muted small">Aggregate observed movement — no individual identity tracking.</p>
    </section>
  );
}

export function InsightPanel() {
  return (
    <section className="card glass span-6 insight-panel" aria-labelledby="insights-title">
      <div className="card-head"><h2 id="insights-title"><Sparkles size={16} aria-hidden="true" /> AI Crowd Insights</h2></div>
      <ul className="insight-list">
        {insightData.map((t, i) => <li key={i}>{t}</li>)}
      </ul>
      <p className="muted small">Descriptive observations from recorded data — not predictions.</p>
    </section>
  );
}

export function ComparisonControl() {
  const modes = Object.keys(comparisonData);
  const [mode, setMode] = useState(modes[0]);
  return (
    <section className="card glass span-6" aria-labelledby="compare-title">
      <div className="card-head"><div><h2 id="compare-title">Compare Periods</h2>
      <p className="chart-sub">Frontend-only mock comparison</p></div>
        <div className="chart-tabs" role="group" aria-label="Comparison mode">
          {modes.map((m) => (
            <button key={m} className={`mt-toggle ${mode === m ? "on" : ""}`} onClick={() => setMode(m)} aria-pressed={mode === m}>
              {m === "Today vs Yesterday" ? "Day" : "Week"}
            </button>
          ))}
        </div>
      </div>
      <p className="muted small" style={{ margin: "0 0 8px" }}>{mode}</p>
      <ul className="compare-list">
        {comparisonData[mode].map((r) => (
          <li key={r.metric}>
            <span>{r.metric}</span>
            <span className="compare-vals">{r.current} <small>vs {r.previous}</small></span>
            <span className={`trend ${r.dir}`}>{r.dir === "up" ? "↑" : "↓"} {r.delta}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

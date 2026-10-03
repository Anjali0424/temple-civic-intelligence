import { AreaChart, Area, ResponsiveContainer } from "recharts";

export default function StatCard({ icon: Icon, title, value, unit, delta, deltaDir, hint, data, tone = "info" }) {
  const pts = (data || []).map((v, i) => ({ i, v }));
  return (
    <article className="stat glass" aria-label={`${title}: ${value}`}>
      <div className="stat-top">
        <span className={`stat-icon tone-${tone}`}><Icon size={18} aria-hidden="true" /></span>
        <span className={`trend ${deltaDir}`} aria-label={`trend ${delta}`}>
          {deltaDir === "up" ? "↑" : "↓"} {delta}
        </span>
      </div>
      <p className="stat-title">{title}</p>
      <p className="stat-value">{value}{unit && <small> {unit}</small>}</p>
      {hint && <p className="stat-hint">{hint}</p>}
      <div className="spark" aria-hidden="true">
        <ResponsiveContainer width="100%" height={36}>
          <AreaChart data={pts} margin={{ top: 2, bottom: 0, left: 0, right: 0 }}>
            <Area type="monotone" dataKey="v" stroke="#5b5bd6" strokeWidth={1.8} fill="rgba(91,91,214,.16)" isAnimationActive={false} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </article>
  );
}

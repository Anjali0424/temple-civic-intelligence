import { TriangleAlert, OctagonAlert, TrendingUp, WifiOff } from "lucide-react";
import { alerts } from "../data/mockData";

const sev = {
  Critical: { icon: OctagonAlert, cls: "sev-critical" },
  Warning: { icon: TriangleAlert, cls: "sev-warning" },
  High: { icon: TrendingUp, cls: "sev-high" },
  System: { icon: WifiOff, cls: "sev-system" },
};

export default function RecentAlerts() {
  return (
    <section className="card glass span-7" aria-labelledby="alerts-title">
      <div className="card-head">
        <h2 id="alerts-title">Recent Alerts</h2>
        <button className="link-btn">View All <span aria-hidden="true">→</span></button>
      </div>
      <ul className="alert-list">
        {alerts.map((a) => {
          const S = sev[a.severity] || sev.Warning;
          const Icon = S.icon;
          return (
            <li key={a.id} className="alert-row" tabIndex={0}>
              <span className={`sev ${S.cls}`}><Icon size={16} aria-hidden="true" /></span>
              <div className="alert-main">
                <strong>{a.title}</strong>
                <small>{a.location} · {a.time}</small>
              </div>
              <span className={`chip ${S.cls}`}>{a.severity}</span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

import { HeartPulse, ShieldCheck, Car, UserCheck } from "lucide-react";
import { resources } from "../data/mockData";

const icons = { officers: UserCheck, medical: HeartPulse, security: ShieldCheck, vehicles: Car };

export default function ResourceStatus() {
  return (
    <section className="card glass span-4" aria-labelledby="res-title">
      <div className="card-head"><h2 id="res-title">Resource Status</h2></div>
      <ul className="res-list">
        {resources.map((r) => {
          const Icon = icons[r.id] || UserCheck;
          return (
            <li key={r.id} className="res-row">
              <span className="res-icon"><Icon size={16} aria-hidden="true" /></span>
              <div><strong>{r.label}</strong><small>{r.total} total</small></div>
              <span className="res-avail">{r.available} Available</span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

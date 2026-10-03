import { ChevronRight } from "lucide-react";
import { zones } from "../data/mockData";

const pct = (z) => Math.round((z.current / z.capacity) * 100);

export default function ZoneOccupancy() {
  return (
    <section className="card glass span-5" aria-labelledby="occ-title">
      <div className="card-head">
        <h2 id="occ-title">Zone Occupancy</h2>
        <button className="link-btn">View Details <span aria-hidden="true">→</span></button>
      </div>
      <ul className="occ-list">
        {zones.map((z) => {
          const p = pct(z);
          return (
            <li key={z.id} className="occ-row" tabIndex={0} aria-label={`${z.name} ${z.desc}, ${z.current} of ${z.capacity}, ${p} percent, ${z.status}`}>
              <div className="occ-main">
                <div><strong>{z.name}</strong><small>{z.desc}</small></div>
                <ChevronRight size={15} aria-hidden="true" />
              </div>
              <div className="occ-meta">
                <span>{z.current.toLocaleString()} / {z.capacity.toLocaleString()}</span>
                <span className={`chip st-${z.status.toLowerCase()}`}>{z.status} · {p}%</span>
              </div>
              <div className="bar" role="progressbar" aria-valuenow={p} aria-valuemin={0} aria-valuemax={100} aria-label={`${z.name} occupancy`}>
                <span style={{ width: `${p}%` }} className={`fill st-${z.status.toLowerCase()}`} />
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

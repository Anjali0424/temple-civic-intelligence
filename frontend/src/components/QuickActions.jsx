import { Video, Bell, UserPlus, FileBarChart } from "lucide-react";

const actions = [
  { icon: Video, label: "View Live Cameras", primary: true },
  { icon: Bell, label: "Manage Alerts" },
  { icon: UserPlus, label: "Assign Resources" },
  { icon: FileBarChart, label: "Generate Report" },
];

export default function QuickActions() {
  return (
    <section className="card glass span-4" aria-labelledby="qa-title">
      <div className="card-head"><h2 id="qa-title">Quick Actions</h2></div>
      <div className="qa-grid">
        {actions.map((a) => (
          <button key={a.label} className={`qa-btn ${a.primary ? "primary" : ""}`}>
            <a.icon size={16} aria-hidden="true" /> {a.label}
          </button>
        ))}
      </div>
    </section>
  );
}

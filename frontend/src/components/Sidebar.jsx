import {
  LayoutDashboard, Video, Map, Bell, BarChart3, Users,
  Camera, FileText, Settings, ShieldCheck, ChevronRight,
} from "lucide-react";
import { navItems } from "../data/mockData";

const icons = {
  Dashboard: LayoutDashboard,
  "Live Monitoring": Video,
  Zones: Map,
  Alerts: Bell,
  Analytics: BarChart3,
  Resources: Users,
  Cameras: Camera,
  Reports: FileText,
  Settings: Settings,
};

export default function Sidebar({ open, onNavigate, active = "Dashboard" }) {
  return (
    <aside className={`sidebar glass ${open ? "open" : ""}`} aria-label="Primary navigation">
      <div className="brand">
        <div className="brand-mark" aria-hidden="true">
          <span className="brand-orb" />
          <ShieldCheck size={20} strokeWidth={2.2} />
        </div>
        <div className="brand-text">
          <strong>AI Crowd</strong>
          <span>Intelligence</span>
        </div>
      </div>

      <nav>
        <ul className="nav-list">
          {navItems.map((item) => {
            const Icon = icons[item] || LayoutDashboard;
            const isActive = item === active;
            return (
              <li key={item}>
                <button
                  className={`nav-item ${isActive ? "active" : ""}`}
                  aria-current={isActive ? "page" : undefined}
                  onClick={() => onNavigate?.(item)}
                >
                  <Icon size={18} strokeWidth={2} aria-hidden="true" />
                  <span>{item}</span>
                  {item === "Alerts" && (
                    <em className="nav-badge" aria-label="3 active alerts">3</em>
                  )}
                  {isActive && <ChevronRight size={15} className="nav-chev" aria-hidden="true" />}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="sidebar-foot">
        <div className="sys-card">
          <p className="sys-title">System Status</p>
          <p className="sys-ok"><span className="dot" aria-hidden="true" /> All Systems Online</p>
        </div>
        <p className="version">Version 1.0.0</p>
        <p className="foot-tag">AI for<br />Safer Gatherings</p>
      </div>
    </aside>
  );
}

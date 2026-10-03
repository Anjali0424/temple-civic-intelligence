import {
  LayoutGrid, Users, BellRing, Cpu, Camera, Bell, Palette, UserRound, ShieldCheck, Info,
} from "lucide-react";

const icons = {
  General: LayoutGrid, "Crowd Monitoring": Users, Alerts: BellRing, "AI & Detection": Cpu,
  Cameras: Camera, Notifications: Bell, Appearance: Palette, Profile: UserRound,
  Security: ShieldCheck, System: Info,
};

export default function SettingsNavigation({ sections, active, onSelect }) {
  return (
    <nav className="glass settings-nav" aria-label="Settings sections">
      <ul>
        {sections.map((s) => {
          const Icon = icons[s] || Info;
          const on = s === active;
          return (
            <li key={s}>
              <button className={`nav-item ${on ? "active" : ""}`} aria-current={on ? "true" : undefined} onClick={() => onSelect(s)}>
                <Icon size={17} aria-hidden="true" /><span>{s}</span>
              </button>
            </li>
          );
        })}
      </ul>
      <label className="nav-select-label">Section:
        <select value={active} onChange={(e) => onSelect(e.target.value)} aria-label="Settings section">
          {sections.map((s) => <option key={s}>{s}</option>)}
        </select>
      </label>
    </nav>
  );
}

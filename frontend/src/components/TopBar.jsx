import { Search, Bell, Palette, Menu, ChevronDown } from "lucide-react";

export default function TopBar({ onMenu }) {
  return (
    <header className="topbar glass" role="banner">
      <button className="icon-btn menu-btn" onClick={onMenu} aria-label="Toggle navigation">
        <Menu size={19} />
      </button>
      <label className="search" aria-label="Search cameras, zones, alerts">
        <Search size={17} aria-hidden="true" />
        <input type="search" placeholder="Search cameras, zones, alerts, people..." aria-label="Search cameras, zones, alerts, people" />
        <kbd aria-hidden="true">⌘ K</kbd>
      </label>
      <div className="top-actions">
        <button className="icon-btn" aria-label="Change appearance"><Palette size={18} /></button>
        <button className="icon-btn bell" aria-label="Notifications, 3 unread">
          <Bell size={18} />
          <em aria-hidden="true">3</em>
        </button>
        <button className="profile" aria-label="Operator profile menu">
          <span className="avatar" aria-hidden="true">OP</span>
          <span className="profile-text"><strong>Operator</strong><small>Control Room</small></span>
          <ChevronDown size={15} aria-hidden="true" />
        </button>
      </div>
    </header>
  );
}

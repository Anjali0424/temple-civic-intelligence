import Sidebar from "./Sidebar";
import TopBar from "./TopBar";

export default function AppShell({ sidebarOpen, setSidebarOpen, onNavigate, active, children }) {
  return (
    <div className="shell">
      <Sidebar open={sidebarOpen} onNavigate={onNavigate} active={active} />
      {sidebarOpen && <button className="scrim" aria-label="Close navigation" onClick={() => setSidebarOpen(false)} />}
      <div className="main-col">
        <TopBar onMenu={() => setSidebarOpen((v) => !v)} />
        <main className="content" id="main">{children}</main>
      </div>
    </div>
  );
}

import { useState } from "react";
import { Users, LogIn, LogOut, Bell, Camera } from "lucide-react";
import AppShell from "./components/AppShell";
import HeroOverview from "./components/HeroOverview";
import StatCard from "./components/StatCard";
import LiveCrowdOverview from "./components/LiveCrowdOverview";
import ZoneStatus from "./components/ZoneStatus";
import CrowdTrend from "./components/CrowdTrend";
import ZoneOccupancy from "./components/ZoneOccupancy";
import RecentAlerts from "./components/RecentAlerts";
import CameraStatus from "./components/CameraStatus";
import ResourceStatus from "./components/ResourceStatus";
import QuickActions from "./components/QuickActions";
import LiveMonitoringPage from "./components/live/LiveMonitoringPage";
import ZonesPage from "./components/zones/ZonesPage";
import AlertsPage from "./components/alerts/AlertsPage";
import AnalyticsPage from "./components/analytics/AnalyticsPage";
import ResourcesPage from "./components/resources/ResourcesPage";
import CamerasPage from "./components/cameras/CamerasPage";
import ReportsPage from "./components/reports/ReportsPage";
import SettingsPage from "./components/settings/SettingsPage";
import { dashboardStats, spark } from "./data/mockData";
import "./theme.css";
import "./App.css";

function DashboardPage() {
  const s = dashboardStats;
  return (
    <>
      <HeroOverview />
      <section className="kpis" aria-label="Key metrics">
        <StatCard icon={Users} title="Total People" value="12,486" delta={s.totalPeople.delta} deltaDir="up" hint="from last hour" data={spark.total} tone="info" />
        <StatCard icon={LogIn} title="Entering" value="428" unit="/min" delta={s.entering.delta} deltaDir="up" data={spark.entering} tone="success" />
        <StatCard icon={LogOut} title="Exiting" value="312" unit="/min" delta={s.exiting.delta} deltaDir="down" data={spark.exiting} tone="violet" />
        <StatCard icon={Bell} title="Active Alerts" value="3" delta={s.activeAlerts.delta} deltaDir="up" data={spark.alerts} tone="warning" />
        <StatCard icon={Camera} title="Cameras Online" value="18 / 20" delta={s.camerasOnline.delta} deltaDir="up" data={spark.cameras} tone="success" />
      </section>
      <section className="grid" aria-label="Dashboard details">
        <LiveCrowdOverview />
        <ZoneStatus />
        <CrowdTrend />
        <ZoneOccupancy />
        <RecentAlerts />
        <CameraStatus />
        <ResourceStatus />
        <QuickActions />
      </section>
    </>
  );
}

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [page, setPage] = useState("Dashboard");

  const handleNav = (item) => { setPage(item); setSidebarOpen(false); };
  const implemented = ["Dashboard", "Live Monitoring", "Zones", "Alerts", "Analytics", "Resources", "Cameras", "Reports", "Settings"];

  return (
    <AppShell sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} onNavigate={handleNav} active={implemented.includes(page) ? page : "Dashboard"}>
      {page === "Dashboard" && <DashboardPage />}
      {page === "Live Monitoring" && <LiveMonitoringPage />}
      {page === "Zones" && <ZonesPage onViewCamera={() => setPage("Live Monitoring")} />}
      {page === "Alerts" && <AlertsPage onViewCamera={() => setPage("Live Monitoring")} onViewZone={() => setPage("Zones")} />}
      {page === "Analytics" && <AnalyticsPage />}
      {page === "Resources" && <ResourcesPage />}
      {page === "Cameras" && <CamerasPage />}
      {page === "Reports" && <ReportsPage />}
      {page === "Settings" && <SettingsPage />}
      {!implemented.includes(page) && (
        <section className="glass placeholder" aria-live="polite">
          <h1>{page}</h1>
          <p>All operator pages are implemented. Remaining roles are out of scope for now.</p>
          <button className="qa-btn primary" onClick={() => setPage("Dashboard")}>Back to Dashboard</button>
        </section>
      )}
    </AppShell>
  );
}

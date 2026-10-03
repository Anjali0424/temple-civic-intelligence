import { useMemo, useState } from "react";
import AnalyticsFilters, { ExportMenu } from "./AnalyticsFilters";
import AnalyticsSummary from "./AnalyticsSummary";
import { OccupancyTrend, EntryExitChart, ZoneComparison, zoneComparisonData } from "./TrendCharts";
import { ZoneUtilization, DensityDistribution, PeakHours } from "./DistributionCharts";
import { AlertAnalytics, FlowAnalytics, InsightPanel, ComparisonControl } from "./InsightSections";
import { occupancyTrendData, alertTrendData, cameras } from "../../data/mockData";

const densScore = { Normal: 25, Moderate: 50, High: 75, Critical: 100 };
const defaultFilters = { range: "Today", time: "All Day", zone: "All Zones", camera: "All Cameras", metric: "Occupancy" };

const enrich = (points) => points.map((p, i) => ({
  ...p,
  densityScore: densScore[p.density] ?? 25,
  net: p.entering - p.exiting,
  alerts: alertTrendData[i]?.alerts ?? 0,
}));

const sliceTime = (points, time) => {
  if (time === "Morning") return points.slice(0, 4);
  if (time === "Afternoon") return points.slice(3, 6);
  if (time === "Evening") return points.slice(5);
  return points;
};

export default function AnalyticsPage() {
  const [draft, setDraft] = useState(defaultFilters);
  const [applied, setApplied] = useState(defaultFilters);
  const [toast, setToast] = useState(null);

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(null), 2200); };

  const cameraOptions = useMemo(() => ["All Cameras", ...cameras.filter((c) => c.status === "Live").map((c) => c.id)], []);
  const zoneOptions = useMemo(() => ["All Zones", "Zone A", "Zone B", "Zone C", "Zone D", "Zone E", "Zone F", "Zone G", "Zone H"], []);

  const rangeKey = ["Today", "Yesterday", "Last 7 Days", "Last 30 Days"].includes(applied.range) ? applied.range : "Today";

  const allTrends = useMemo(() => {
    const out = {};
    for (const k of Object.keys(occupancyTrendData)) out[k] = sliceTime(enrich(occupancyTrendData[k]), applied.time);
    return out;
  }, [applied.time]);

  const trend = useMemo(() => allTrends[rangeKey], [allTrends, rangeKey]);

  const { entryExit, cameraNote } = useMemo(() => {
    if (applied.camera === "All Cameras") return { entryExit: trend, cameraNote: null };
    const cam = cameras.find((c) => c.id === applied.camera);
    const total = cameras.filter((c) => c.status !== "Offline").reduce((n, c) => n + c.peopleCount, 0) || 1;
    const share = cam ? cam.peopleCount / total : 1;
    return {
      entryExit: trend.map((p) => ({ ...p, entering: Math.round(p.entering * share), exiting: Math.round(p.exiting * share) })),
      cameraNote: `${applied.camera} share`,
    };
  }, [trend, applied.camera]);

  return (
    <div className="live-page analytics-page">
      <section className="page-head" aria-labelledby="analytics-title">
        <div>
          <h1 id="analytics-title">Analytics</h1>
          <p>Understand crowd patterns, occupancy trends and operational activity</p>
        </div>
        <div className="page-head-right">
          <span className="live-pill"><span className="dot" /> System Live</span>
          <span className="head-stamp">12 Sep 2025</span>
          <ExportMenu />
        </div>
      </section>

      <AnalyticsFilters draft={draft} onChange={setDraft} cameraOptions={cameraOptions} zoneOptions={zoneOptions}
        onApply={() => { setApplied(draft); showToast("Filters applied"); }}
        onReset={() => { setDraft(defaultFilters); setApplied(defaultFilters); showToast("Filters reset"); }} />

      <AnalyticsSummary range={rangeKey} />

      <section className="grid analytics-grid" aria-label="Analytics charts">
        <OccupancyTrend allTrends={allTrends} range={rangeKey}
          onRange={(r) => { setDraft((d) => ({ ...d, range: r })); setApplied((a) => ({ ...a, range: r })); }}
          metric={applied.metric} />
        <EntryExitChart data={entryExit} cameraNote={cameraNote} />
        <ZoneComparison data={zoneComparisonData} preselected={applied.zone} />
        <ZoneUtilization highlight={applied.zone} />
        <DensityDistribution />
        <PeakHours />
        <AlertAnalytics />
        <FlowAnalytics />
        <InsightPanel />
        <ComparisonControl />
      </section>

      {toast && <div className="toast" role="status" aria-live="polite">{toast}</div>}
    </div>
  );
}

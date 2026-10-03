// Centralised mock data.
// Later: replace each export with REST fetch / WebSocket subscription.
// Shapes are intentionally backend-ready (ids, timestamps, camera/zone refs).

export const dashboardStats = {
  totalPeople: { value: 12486, delta: "+12%", deltaDir: "up", hint: "from last hour" },
  entering: { value: 428, unit: "/min", delta: "+8%", deltaDir: "up" },
  exiting: { value: 312, unit: "/min", delta: "-6%", deltaDir: "down" },
  activeAlerts: { value: 3, delta: "2 new", deltaDir: "up" },
  camerasOnline: { value: "18 / 20", delta: "90% uptime", deltaDir: "up" },
};

export const zones = [
  { id: "A", name: "Zone A", desc: "Main Entrance", current: 3248, capacity: 4000, status: "High" },
  { id: "B", name: "Zone B", desc: "Queue Area", current: 2186, capacity: 3000, status: "Moderate" },
  { id: "C", name: "Zone C", desc: "Inner Premises", current: 1024, capacity: 2500, status: "Normal" },
  { id: "D", name: "Zone D", desc: "Exit Area", current: 628, capacity: 2000, status: "Normal" },
];

export const alerts = [
  { id: "AL-1042", title: "High crowd density detected", location: "Zone A - Main Entrance", time: "2 min ago", severity: "Critical" },
  { id: "AL-1041", title: "Unusual crowd movement", location: "Zone B - Queue Area", time: "8 min ago", severity: "Warning" },
  { id: "AL-1039", title: "Threshold exceeded", location: "Zone C - Inner Premises", time: "15 min ago", severity: "High" },
  { id: "AL-1036", title: "Camera offline", location: "CAM-07 - East Gate", time: "22 min ago", severity: "System" },
];

export const cameraStats = {
  total: 20,
  online: 18,
  offline: 1,
  degraded: 1,
  connecting: 0,
  uptimePct: 90,
  live: {
    id: "CAM-01",
    name: "Main Entrance",
    date: "12 Sep 2025",
    time: "10:24:36",
    people: 428,
    density: "High",
    zone: "A",
  },
};

export const resources = [
  { id: "officers", label: "Field Officers", total: 12, available: 8 },
  { id: "medical", label: "Medical Teams", total: 4, available: 3 },
  { id: "security", label: "Security Teams", total: 6, available: 4 },
  { id: "vehicles", label: "Vehicles", total: 5, available: 3 },
];

export const trendData = [
  { t: "6AM", crowd: 3200 },
  { t: "7AM", crowd: 4800 },
  { t: "8AM", crowd: 7100 },
  { t: "9AM", crowd: 9400 },
  { t: "10AM", crowd: 12486 },
  { t: "12PM", crowd: 11200 },
  { t: "3PM", crowd: 9800 },
  { t: "6PM", crowd: 8300 },
  { t: "9PM", crowd: 5400 },
];

export const spark = {
  total: [8, 9, 10, 11, 12, 14, 15],
  entering: [5, 7, 6, 8, 9, 10, 11],
  exiting: [11, 10, 9, 9, 8, 7, 6],
  alerts: [1, 1, 2, 2, 3, 3, 3],
  cameras: [16, 17, 17, 18, 18, 18, 18],
};

export const navItems = [
  "Dashboard",
  "Live Monitoring",
  "Zones",
  "Alerts",
  "Analytics",
  "Resources",
  "Cameras",
  "Reports",
  "Settings",
];

// Live Monitoring — structured mock cameras.
// Later: peopleCount/density/boxes/status/alerts arrive via
// Spring Boot REST + WebSocket from the Python AI service.
export const cameras = [
  { id: "CAM-01", name: "Main Entrance", location: "Main Entrance Gate", zone: "A", zoneName: "Zone A — Main Entrance", status: "Live", peopleCount: 428, tracked: 421, confidence: 96, density: "High", movement: "Moderate", direction: "→ East", flow: "428 people/min", fps: 24, resolution: "1920 × 1080", lastUpdate: "10:24:36", lastSeen: null, signalQuality: "Excellent", zoneCurrent: 3248, zoneCapacity: 4000, alerts: [
    { title: "High crowd density detected", time: "2 min ago", severity: "Critical" },
    { title: "Threshold exceeded", time: "8 min ago", severity: "High" },
    { title: "Unusual crowd movement", time: "14 min ago", severity: "Warning" },
  ]},
  { id: "CAM-02", name: "Queue Area", location: "Pilgrim Queue Complex", zone: "B", zoneName: "Zone B — Queue Area", status: "Live", peopleCount: 312, tracked: 305, confidence: 95, density: "Moderate", movement: "Slow", direction: "→ North", flow: "286 people/min", fps: 24, resolution: "1920 × 1080", lastUpdate: "10:24:31", lastSeen: null, signalQuality: "Good", zoneCurrent: 2186, zoneCapacity: 3000, alerts: [
    { title: "Unusual crowd movement", time: "8 min ago", severity: "Warning" },
  ]},
  { id: "CAM-03", name: "Inner Premises", location: "Sanctum Corridor", zone: "C", zoneName: "Zone C — Inner Premises", status: "Live", peopleCount: 182, tracked: 179, confidence: 97, density: "Normal", movement: "Steady", direction: "→ West", flow: "164 people/min", fps: 25, resolution: "1920 × 1080", lastUpdate: "10:24:28", lastSeen: null, signalQuality: "Excellent", zoneCurrent: 1024, zoneCapacity: 2500, alerts: [
    { title: "Threshold exceeded", time: "15 min ago", severity: "High" },
  ]},
  { id: "CAM-04", name: "Exit Area", location: "South Exit Gate", zone: "D", zoneName: "Zone D — Exit Area", status: "Live", peopleCount: 96, tracked: 94, confidence: 98, density: "Normal", movement: "Steady", direction: "→ South", flow: "120 people/min", fps: 24, resolution: "1920 × 1080", lastUpdate: "10:24:22", lastSeen: null, signalQuality: "Excellent", zoneCurrent: 628, zoneCapacity: 2000, alerts: [] },
  { id: "CAM-05", name: "North Gate", location: "North Entry Gate", zone: "A", zoneName: "Zone A — Main Entrance", status: "Live", peopleCount: 284, tracked: 278, confidence: 94, density: "Moderate", movement: "Moderate", direction: "→ East", flow: "252 people/min", fps: 23, resolution: "1920 × 1080", lastUpdate: "10:24:19", lastSeen: null, signalQuality: "Good", zoneCurrent: 3248, zoneCapacity: 4000, alerts: [] },
  { id: "CAM-06", name: "Temple Courtyard", location: "Central Courtyard", zone: "C", zoneName: "Zone C — Inner Premises", status: "Live", peopleCount: 520, tracked: 508, confidence: 93, density: "High", movement: "Slow", direction: "↻ Circulating", flow: "310 people/min", fps: 22, resolution: "1920 × 1080", lastUpdate: "10:24:15", lastSeen: null, signalQuality: "Good", zoneCurrent: 1024, zoneCapacity: 2500, alerts: [
    { title: "High crowd density detected", time: "5 min ago", severity: "Critical" },
    { title: "Bottleneck indication", time: "11 min ago", severity: "High" },
  ]},
  { id: "CAM-07", name: "East Gate", location: "East Entry Gate", zone: "B", zoneName: "Zone B — Queue Area", status: "Offline", peopleCount: 0, tracked: 0, confidence: 0, density: "Unknown", movement: "—", direction: "—", flow: "—", fps: 0, resolution: "1920 × 1080", lastUpdate: "10:02:14", lastSeen: "10:02:14 AM", signalQuality: "No signal", zoneCurrent: 2186, zoneCapacity: 3000, alerts: [
    { title: "Camera offline", time: "22 min ago", severity: "System" },
  ]},
  { id: "CAM-08", name: "Parking Entry", location: "Parking Approach Road", zone: "D", zoneName: "Zone D — Exit Area", status: "Degraded", peopleCount: 64, tracked: 58, confidence: 81, density: "Normal", movement: "Steady", direction: "→ North", flow: "72 people/min", fps: 12, resolution: "1280 × 720", lastUpdate: "10:23:58", lastSeen: null, signalQuality: "Poor", zoneCurrent: 628, zoneCapacity: 2000, alerts: [
    { title: "Camera signal degraded", time: "18 min ago", severity: "Warning" },
  ]},
  { id: "CAM-09", name: "West Corridor", location: "Western Corridor", zone: "C", zoneName: "Zone C — Inner Premises", status: "Live", peopleCount: 148, tracked: 145, confidence: 95, density: "Normal", movement: "Steady", direction: "→ West", flow: "132 people/min", fps: 24, resolution: "1920 × 1080", lastUpdate: "10:24:09", lastSeen: null, signalQuality: "Good", zoneCurrent: 1024, zoneCapacity: 2500, alerts: [] },
];

// Zones page — venue-area mock data (occupancy, capacity, flow, cameras, alerts).
// Later: occupancy/density/flow/status arrive via Spring Boot REST + WebSocket
// from the Python AI service. Percentages map to UI demo thresholds:
// 0–50% Normal · 50–70% Moderate · 70–90% High · 90%+ Critical.
export const venueZones = [
  { id: "A", name: "Zone A", location: "Main Entrance", type: "Entrance", capacity: 4000, occupancy: 3248, density: "High", status: "High", entering: 428, exiting: 312, direction: "→ East", restricted: false,
    cameras: [{ id: "CAM-01", name: "Main Entrance", people: 428, status: "Live" }, { id: "CAM-05", name: "North Gate", people: 284, status: "Live" }],
    alerts: [
      { title: "High crowd density detected", time: "2 min ago", severity: "Critical" },
      { title: "Threshold approaching", time: "6 min ago", severity: "Warning" },
      { title: "Unusual crowd movement", time: "12 min ago", severity: "High" },
    ]},
  { id: "B", name: "Zone B", location: "Queue Area", type: "Queue", capacity: 3000, occupancy: 1864, density: "Moderate", status: "Moderate", entering: 286, exiting: 202, direction: "→ North", restricted: false,
    cameras: [{ id: "CAM-02", name: "Queue Area", people: 312, status: "Live" }, { id: "CAM-07", name: "East Gate", people: 0, status: "Offline" }],
    alerts: [{ title: "Unusual crowd movement", time: "8 min ago", severity: "Warning" }]},
  { id: "C", name: "Zone C", location: "Inner Premises", type: "Main Premises", capacity: 2500, occupancy: 1024, density: "Normal", status: "Normal", entering: 164, exiting: 148, direction: "→ West", restricted: false,
    cameras: [{ id: "CAM-03", name: "Inner Premises", people: 182, status: "Live" }, { id: "CAM-09", name: "West Corridor", people: 148, status: "Live" }],
    alerts: [{ title: "Threshold exceeded", time: "15 min ago", severity: "High" }]},
  { id: "D", name: "Zone D", location: "Exit Area", type: "Exit", capacity: 2000, occupancy: 628, density: "Normal", status: "Normal", entering: 120, exiting: 210, direction: "→ South", restricted: false,
    cameras: [{ id: "CAM-04", name: "Exit Area", people: 96, status: "Live" }, { id: "CAM-08", name: "Parking Entry", people: 64, status: "Degraded" }],
    alerts: []},
  { id: "E", name: "Zone E", location: "Courtyard", type: "Courtyard", capacity: 1000, occupancy: 920, density: "Critical", status: "Critical", entering: 310, exiting: 194, direction: "↻ Circulating", restricted: false,
    cameras: [{ id: "CAM-06", name: "Temple Courtyard", people: 520, status: "Live" }],
    alerts: [
      { title: "Critical capacity reached", time: "3 min ago", severity: "Critical" },
      { title: "Bottleneck indication", time: "11 min ago", severity: "High" },
    ]},
  { id: "F", name: "Zone F", location: "North Gate", type: "Entrance", capacity: 900, occupancy: 420, density: "Normal", status: "Normal", entering: 140, exiting: 118, direction: "→ East", restricted: false,
    cameras: [{ id: "CAM-05", name: "North Gate", people: 284, status: "Live" }],
    alerts: []},
  { id: "G", name: "Zone G", location: "Parking", type: "Parking", capacity: 1200, occupancy: 310, density: "Normal", status: "Normal", entering: 72, exiting: 58, direction: "→ North", restricted: false,
    cameras: [{ id: "CAM-08", name: "Parking Entry", people: 64, status: "Degraded" }],
    alerts: []},
  { id: "H", name: "Zone H", location: "Service Area", type: "Service", capacity: 600, occupancy: 180, density: "Normal", status: "Normal", entering: 24, exiting: 22, direction: "→ West", restricted: true,
    cameras: [{ id: "CAM-07", name: "East Gate", people: 0, status: "Offline" }],
    alerts: [{ title: "Restricted-zone camera offline", time: "22 min ago", severity: "System" }]},
];

// Aggregate inter-zone flow (people/min). Demo values only —
// no cross-camera person re-identification is implied.
export const zoneFlows = [
  { from: "A", to: "B", rate: 84 },
  { from: "B", to: "C", rate: 42 },
  { from: "C", to: "E", rate: 36 },
  { from: "F", to: "A", rate: 58 },
  { from: "G", to: "D", rate: 44 },
  { from: "E", to: "D", rate: 28 },
];

// Alerts & Incidents — operational mock data.
// Later: alert created/updated/acknowledged, officer assigned and resolved
// events arrive via Spring Boot REST + WebSocket from the Python AI service.
// Language is factual (observable indicators only — no stampede prediction).
export const opsAlerts = [
  { id: "ALT-00124", type: "High Density", severity: "Critical", title: "High crowd density detected",
    description: "Crowd density in Zone A has exceeded the configured high-density threshold. Occupancy is at 81% of capacity with a rising entry rate.",
    zone: "A", zoneName: "Zone A — Main Entrance", camera: "CAM-01", time: "2 min ago", created: "12 Sep 2025 · 10:22 AM",
    status: "New", occupancy: 3248, capacity: 4000, density: "High", entering: 428, exiting: 312,
    assignedOfficer: null, evidenceTime: "10:22:14", evidencePeople: 428,
    timeline: [{ time: "10:22 AM", text: "Alert generated by crowd analytics" }]},
  { id: "ALT-00123", type: "Unusual Movement", severity: "Warning", title: "Unusual crowd movement observed",
    description: "Lateral movement detected in the queue complex that deviates from the normal northbound flow pattern.",
    zone: "B", zoneName: "Zone B — Queue Area", camera: "CAM-02", time: "8 min ago", created: "12 Sep 2025 · 10:16 AM",
    status: "Acknowledged", occupancy: 1864, capacity: 3000, density: "Moderate", entering: 286, exiting: 202,
    assignedOfficer: null, evidenceTime: "10:16:41", evidencePeople: 312,
    timeline: [
      { time: "10:16 AM", text: "Alert generated by crowd analytics" },
      { time: "10:18 AM", text: "Operator acknowledged alert" },
    ]},
  { id: "ALT-00122", type: "Capacity Threshold", severity: "High", title: "Capacity threshold exceeded",
    description: "Zone C occupancy crossed the 70% high-occupancy mark. Entry gating may be required if the trend continues.",
    zone: "C", zoneName: "Zone C — Inner Premises", camera: "CAM-03", time: "15 min ago", created: "12 Sep 2025 · 10:09 AM",
    status: "In Progress", occupancy: 1820, capacity: 2500, density: "High", entering: 164, exiting: 148,
    assignedOfficer: "Officer Rahul", evidenceTime: "10:09:52", evidencePeople: 182,
    timeline: [
      { time: "10:09 AM", text: "Alert generated by crowd analytics" },
      { time: "10:11 AM", text: "Operator acknowledged alert" },
      { time: "10:13 AM", text: "Officer Rahul assigned" },
      { time: "10:15 AM", text: "Response in progress" },
    ]},
  { id: "ALT-00121", type: "Camera Offline", severity: "Info", title: "Camera offline",
    description: "CAM-07 stopped sending frames. Last heartbeat received at 10:02 AM. Zone B coverage is reduced until the feed is restored.",
    zone: "B", zoneName: "Zone B — Queue Area", camera: "CAM-07", time: "22 min ago", created: "12 Sep 2025 · 10:02 AM",
    status: "New", occupancy: 1864, capacity: 3000, density: "Moderate", entering: 286, exiting: 202,
    assignedOfficer: null, evidenceTime: "10:02:14", evidencePeople: 0,
    timeline: [{ time: "10:02 AM", text: "Camera heartbeat lost" }]},
  { id: "ALT-00120", type: "Restricted Zone", severity: "High", title: "Restricted-zone activity detected",
    description: "Movement observed near the service-area boundary. Verify whether the entry is authorised personnel.",
    zone: "H", zoneName: "Zone H — Service Area", camera: "CAM-09", time: "32 min ago", created: "12 Sep 2025 · 09:52 AM",
    status: "Assigned", occupancy: 180, capacity: 600, density: "Normal", entering: 24, exiting: 22,
    assignedOfficer: "Officer Priya", evidenceTime: "09:52:07", evidencePeople: 148,
    timeline: [
      { time: "09:52 AM", text: "Alert generated by crowd analytics" },
      { time: "09:55 AM", text: "Operator acknowledged alert" },
      { time: "09:57 AM", text: "Officer Priya assigned" },
    ]},
  { id: "ALT-00119", type: "Camera Degraded", severity: "Warning", title: "Camera signal degraded",
    description: "CAM-08 frame rate dropped to 12 FPS with poor signal quality. Detection confidence is reduced on this feed.",
    zone: "D", zoneName: "Zone D — Exit Area", camera: "CAM-08", time: "48 min ago", created: "12 Sep 2025 · 09:36 AM",
    status: "Resolved", occupancy: 628, capacity: 2000, density: "Normal", entering: 120, exiting: 210,
    assignedOfficer: "Officer Arjun", evidenceTime: "09:36:29", evidencePeople: 64,
    timeline: [
      { time: "09:36 AM", text: "Alert generated by system health monitor" },
      { time: "09:40 AM", text: "Officer Arjun assigned" },
      { time: "10:05 AM", text: "Alert resolved — signal stabilised" },
    ]},
  { id: "ALT-00118", type: "Sudden Increase", severity: "Warning", title: "Sudden occupancy increase",
    description: "Zone D occupancy rose 18% within 10 minutes following a scheduled exit-gate opening.",
    zone: "D", zoneName: "Zone D — Exit Area", camera: "CAM-04", time: "1 hr ago", created: "12 Sep 2025 · 09:20 AM",
    status: "Closed", occupancy: 628, capacity: 2000, density: "Normal", entering: 120, exiting: 210,
    assignedOfficer: null, evidenceTime: "09:20:11", evidencePeople: 96,
    timeline: [
      { time: "09:20 AM", text: "Alert generated by crowd analytics" },
      { time: "09:45 AM", text: "Alert closed — levels returned to normal" },
    ]},
];

export const opsIncidents = [
  { id: "INC-00121", title: "Crowd congestion", zone: "Zone B", status: "Resolved", time: "12 min ago" },
  { id: "INC-00120", title: "Restricted zone entry", zone: "Zone C", status: "Closed", time: "35 min ago" },
  { id: "INC-00119", title: "Camera failure", zone: "East Gate", status: "Resolved", time: "1 hr ago" },
];

export const responseOfficers = ["Officer Rahul", "Officer Priya", "Officer Arjun", "Officer Neha"];

// Resources — operational roster mock data.
// Later: resources, assignments and status arrive from Spring Boot + PostgreSQL.
// Contacts are masked mock values. Status semantics:
// Available (green) · Assigned (blue) · Deployed (purple) · Responding (orange) · Unavailable (gray).
export const opsResources = [
  { id: "FO-0012", name: "Officer Rahul", type: "Field Officer", status: "Responding", zone: "A", zoneName: "Zone A — Main Entrance",
    assignment: { task: "Main Entrance Monitoring", priority: "High", since: "10:22 AM", incident: "INC-00124" },
    contact: "+91 98XXX XX212", shift: "08:00 AM – 04:00 PM", lastUpdate: "10:24 AM" },
  { id: "FO-0007", name: "Officer Priya", type: "Field Officer", status: "Deployed", zone: "B", zoneName: "Zone B — Queue Area",
    assignment: { task: "Queue Management", priority: "High", since: "09:57 AM", incident: null },
    contact: "+91 98XXX XX207", shift: "08:00 AM – 04:00 PM", lastUpdate: "10:21 AM" },
  { id: "FO-0009", name: "Officer Arjun", type: "Field Officer", status: "Deployed", zone: "C", zoneName: "Zone C — Inner Premises",
    assignment: { task: "Inner Premises Patrol", priority: "Normal", since: "09:40 AM", incident: null },
    contact: "+91 98XXX XX209", shift: "08:00 AM – 04:00 PM", lastUpdate: "10:18 AM" },
  { id: "FO-0004", name: "Officer Neha", type: "Field Officer", status: "Deployed", zone: "A", zoneName: "Zone A — Main Entrance",
    assignment: { task: "Entrance Control", priority: "High", since: "09:15 AM", incident: null },
    contact: "+91 98XXX XX204", shift: "06:00 AM – 02:00 PM", lastUpdate: "10:20 AM" },
  { id: "FO-0001", name: "Officer Vikram", type: "Field Officer", status: "Available", zone: "F", zoneName: "Zone F — North Gate",
    assignment: null, contact: "+91 98XXX XX201", shift: "08:00 AM – 04:00 PM", lastUpdate: "10:10 AM" },
  { id: "FO-0002", name: "Officer Sneha", type: "Field Officer", status: "Available", zone: "D", zoneName: "Zone D — Exit Area",
    assignment: null, contact: "+91 98XXX XX202", shift: "08:00 AM – 04:00 PM", lastUpdate: "10:12 AM" },
  { id: "FO-0003", name: "Officer Kabir", type: "Field Officer", status: "Available", zone: "G", zoneName: "Zone G — Parking",
    assignment: null, contact: "+91 98XXX XX203", shift: "08:00 AM – 04:00 PM", lastUpdate: "10:05 AM" },
  { id: "FO-0005", name: "Officer Divya", type: "Field Officer", status: "Available", zone: "C", zoneName: "Zone C — Inner Premises",
    assignment: null, contact: "+91 98XXX XX205", shift: "08:00 AM – 04:00 PM", lastUpdate: "10:08 AM" },
  { id: "FO-0006", name: "Officer Manoj", type: "Field Officer", status: "Available", zone: "B", zoneName: "Zone B — Queue Area",
    assignment: null, contact: "+91 98XXX XX206", shift: "08:00 AM – 04:00 PM", lastUpdate: "10:11 AM" },
  { id: "FO-0008", name: "Officer Ishita", type: "Field Officer", status: "Available", zone: "D", zoneName: "Zone D — Exit Area",
    assignment: null, contact: "+91 98XXX XX208", shift: "02:00 PM – 10:00 PM", lastUpdate: "10:09 AM" },
  { id: "FO-0010", name: "Officer Rohan", type: "Field Officer", status: "Available", zone: "G", zoneName: "Zone G — Parking",
    assignment: null, contact: "+91 98XXX XX210", shift: "08:00 AM – 04:00 PM", lastUpdate: "10:06 AM" },
  { id: "FO-0011", name: "Officer Ananya", type: "Field Officer", status: "Available", zone: "H", zoneName: "Zone H — Service Area",
    assignment: null, contact: "+91 98XXX XX211", shift: "08:00 AM – 04:00 PM", lastUpdate: "10:07 AM" },
  { id: "MT-01", name: "Medical Team Alpha", type: "Medical Team", status: "Available", zone: "C", zoneName: "Zone C — Inner Premises",
    assignment: null, members: 4, equipment: ["First Aid", "AED"], base: "Zone C Medical Point",
    contact: "+91 98XXX XX301", shift: "24-hr rotation", lastUpdate: "10:15 AM" },
  { id: "MT-02", name: "Medical Team Bravo", type: "Medical Team", status: "Deployed", zone: "E", zoneName: "Zone E — Courtyard",
    assignment: { task: "Event Medical Post", priority: "High", since: "09:30 AM", incident: null },
    members: 4, equipment: ["First Aid", "AED", "Stretcher"], base: "Zone C Medical Point",
    contact: "+91 98XXX XX302", shift: "24-hr rotation", lastUpdate: "10:19 AM" },
  { id: "MT-03", name: "Medical Team Charlie", type: "Medical Team", status: "Available", zone: "D", zoneName: "Zone D — Exit Area",
    assignment: null, members: 3, equipment: ["First Aid", "AED"], base: "Zone D Medical Point",
    contact: "+91 98XXX XX303", shift: "24-hr rotation", lastUpdate: "10:13 AM" },
  { id: "MT-04", name: "Medical Team Delta", type: "Medical Team", status: "Available", zone: "A", zoneName: "Zone A — Main Entrance",
    assignment: null, members: 3, equipment: ["First Aid"], base: "Zone A Medical Point",
    contact: "+91 98XXX XX304", shift: "24-hr rotation", lastUpdate: "10:14 AM" },
  { id: "ST-01", name: "Security Team Alpha", type: "Security Team", status: "Responding", zone: "B", zoneName: "Zone B — Queue Area",
    assignment: { task: "Queue Congestion Response", priority: "Critical", since: "10:18 AM", incident: "INC-00121" },
    members: 5, contact: "+91 98XXX XX401", shift: "08:00 AM – 08:00 PM", lastUpdate: "10:23 AM" },
  { id: "ST-02", name: "Security Team Bravo", type: "Security Team", status: "Deployed", zone: "A", zoneName: "Zone A — Main Entrance",
    assignment: { task: "Entrance Control", priority: "High", since: "09:00 AM", incident: null },
    members: 6, contact: "+91 98XXX XX402", shift: "08:00 AM – 08:00 PM", lastUpdate: "10:17 AM" },
  { id: "ST-03", name: "Security Team Charlie", type: "Security Team", status: "Available", zone: "D", zoneName: "Zone D — Exit Area",
    assignment: null, members: 4, contact: "+91 98XXX XX403", shift: "08:00 AM – 08:00 PM", lastUpdate: "10:04 AM" },
  { id: "ST-04", name: "Security Team Delta", type: "Security Team", status: "Available", zone: "C", zoneName: "Zone C — Inner Premises",
    assignment: null, members: 5, contact: "+91 98XXX XX404", shift: "08:00 AM – 08:00 PM", lastUpdate: "10:03 AM" },
  { id: "ST-05", name: "Security Team Echo", type: "Security Team", status: "Available", zone: "F", zoneName: "Zone F — North Gate",
    assignment: null, members: 4, contact: "+91 98XXX XX405", shift: "08:00 AM – 08:00 PM", lastUpdate: "10:02 AM" },
  { id: "ST-06", name: "Security Team Foxtrot", type: "Security Team", status: "Available", zone: "G", zoneName: "Zone G — Parking",
    assignment: null, members: 4, contact: "+91 98XXX XX406", shift: "08:00 AM – 08:00 PM", lastUpdate: "10:01 AM" },
  { id: "VH-01", name: "AMB-01 Ambulance", type: "Vehicle", status: "Deployed", zone: "C", zoneName: "Zone C — Inner Premises",
    assignment: { task: "Medical Standby", priority: "Normal", since: "08:30 AM", incident: null },
    equipment: ["First Aid", "AED", "Stretcher"], base: "Medical Station C",
    contact: "+91 98XXX XX501", shift: "24-hr rotation", lastUpdate: "10:16 AM" },
  { id: "VH-02", name: "MED-02 Response Van", type: "Vehicle", status: "Available", zone: "A", zoneName: "Zone A — Main Entrance",
    assignment: null, equipment: ["First Aid", "AED", "Emergency Kit"], base: "Medical Station A",
    contact: "+91 98XXX XX502", shift: "24-hr rotation", lastUpdate: "10:12 AM" },
  { id: "VH-03", name: "SEC-03 Patrol Vehicle", type: "Vehicle", status: "Deployed", zone: "B", zoneName: "Zone B — Queue Area",
    assignment: { task: "Perimeter Patrol", priority: "Normal", since: "09:05 AM", incident: null },
    equipment: ["Radio Set", "Barrier Kit"], base: "Security Depot",
    contact: "+91 98XXX XX503", shift: "24-hr rotation", lastUpdate: "10:15 AM" },
  { id: "VH-04", name: "PAT-04 Patrol SUV", type: "Vehicle", status: "Available", zone: "D", zoneName: "Zone D — Exit Area",
    assignment: null, equipment: ["Radio Set", "Barrier Kit"], base: "Security Depot",
    contact: "+91 98XXX XX504", shift: "24-hr rotation", lastUpdate: "10:09 AM" },
  { id: "VH-05", name: "UTL-05 Utility Van", type: "Vehicle", status: "Available", zone: "G", zoneName: "Zone G — Parking",
    assignment: null, equipment: ["Barrier Kit", "Toolkit"], base: "Service Yard",
    contact: "+91 98XXX XX505", shift: "06:00 AM – 06:00 PM", lastUpdate: "10:07 AM" },
];

export const zoneResourceNeeds = [
  { zone: "Zone A", reason: "High crowd density", need: "2 Field Officers", level: "High" },
  { zone: "Zone E", reason: "Critical occupancy", need: "1 Medical Team", level: "Critical" },
  { zone: "Zone B", reason: "Queue congestion", need: "1 Security Team", level: "Moderate" },
  { zone: "Zone D", reason: "Normal operations", need: "1 Medical Team on standby", level: "Normal" },
  { zone: "Zone C", reason: "Steady conditions", need: "No additional support", level: "Normal" },
];

export const resourceActivity = [
  { text: "Officer Rahul assigned to Zone A", time: "2 min ago" },
  { text: "Medical Team Alpha deployed to Zone C", time: "8 min ago" },
  { text: "Security Team Bravo reassigned to Zone B", time: "14 min ago" },
  { text: "Vehicle MED-02 marked available", time: "20 min ago" },
  { text: "Security Team Alpha responding to INC-00121", time: "26 min ago" },
];

// Analytics — historical mock datasets.
// Later: occupancy/entry/exit/density/flow/alert series arrive from
// PostgreSQL via Spring Boot APIs. Values describe observed history only.
const dayTrendBase = [
  { t: "6AM", occupancy: 3200, entering: 120, exiting: 60 },
  { t: "8AM", occupancy: 5100, entering: 210, exiting: 140 },
  { t: "10AM", occupancy: 8900, entering: 340, exiting: 250 },
  { t: "12PM", occupancy: 12100, entering: 428, exiting: 312 },
  { t: "2PM", occupancy: 12486, entering: 390, exiting: 340 },
  { t: "4PM", occupancy: 10800, entering: 300, exiting: 320 },
  { t: "6PM", occupancy: 8300, entering: 220, exiting: 260 },
  { t: "8PM", occupancy: 5400, entering: 140, exiting: 180 },
  { t: "10PM", occupancy: 2900, entering: 80, exiting: 120 },
];

const densityFor = (occ, peak) => {
  const r = occ / peak;
  return r >= 0.9 ? "Critical" : r >= 0.7 ? "High" : r >= 0.4 ? "Moderate" : "Normal";
};

const scaleDay = (f) => {
  const peak = Math.round(12486 * f);
  return dayTrendBase.map((p) => ({
    t: p.t,
    occupancy: Math.round(p.occupancy * f),
    entering: Math.round(p.entering * f),
    exiting: Math.round(p.exiting * f),
    density: densityFor(p.occupancy * f, peak),
  }));
};

export const occupancyTrendData = {
  Today: scaleDay(1),
  Yesterday: scaleDay(0.86),
  "Last 7 Days": scaleDay(0.78),
  "Last 30 Days": scaleDay(0.72),
};

export const analyticsSummary = {
  visitors: 48620, peakOccupancy: 12486, avgOccupancy: 7842, peakHour: "12:00 PM",
  entries: 52430, exits: 48120, highDensityEvents: 18, alerts: 42,
};

export const rangeFactors = { Today: 1, Yesterday: 0.86, "Last 7 Days": 0.78, "Last 30 Days": 0.72 };

export const zoneComparisonData = [
  { t: "6AM", A: 900, B: 600, C: 300, D: 200, E: 200 },
  { t: "8AM", A: 1400, B: 1000, C: 500, D: 320, E: 380 },
  { t: "10AM", A: 2400, B: 1600, C: 800, D: 480, E: 640 },
  { t: "12PM", A: 3100, B: 1900, C: 1000, D: 620, E: 880 },
  { t: "2PM", A: 3248, B: 1864, C: 1024, D: 628, E: 920 },
  { t: "4PM", A: 2800, B: 1700, C: 950, D: 600, E: 860 },
  { t: "6PM", A: 2100, B: 1300, C: 700, D: 480, E: 620 },
  { t: "8PM", A: 1300, B: 800, C: 450, D: 300, E: 380 },
  { t: "10PM", A: 700, B: 400, C: 220, D: 150, E: 180 },
];

export const densityDistributionData = [
  { name: "Normal", value: 58 }, { name: "Moderate", value: 24 },
  { name: "High", value: 14 }, { name: "Critical", value: 4 },
];

export const peakHourData = [
  { t: "6AM", level: 18 }, { t: "8AM", level: 35 }, { t: "10AM", level: 62 },
  { t: "12PM", level: 95 }, { t: "2PM", level: 100 }, { t: "4PM", level: 78 },
  { t: "6PM", level: 55 }, { t: "8PM", level: 32 }, { t: "10PM", level: 15 },
];

export const alertTrendData = [
  { t: "6AM", alerts: 2 }, { t: "8AM", alerts: 3 }, { t: "10AM", alerts: 4 },
  { t: "12PM", alerts: 7 }, { t: "2PM", alerts: 9 }, { t: "4PM", alerts: 7 },
  { t: "6PM", alerts: 5 }, { t: "8PM", alerts: 3 }, { t: "10PM", alerts: 2 },
];

export const alertByTypeData = [
  { type: "High Density", count: 11 }, { type: "Capacity Threshold", count: 8 },
  { type: "Unusual Movement", count: 9 }, { type: "Restricted Zone", count: 5 },
  { type: "Camera Health", count: 9 },
];

export const insightData = [
  "Zone E reached 92% occupancy during the selected period.",
  "Entry flow peaked around 12:10 PM at 428 people per minute.",
  "Zone A experienced sustained high occupancy for approximately 35 minutes.",
  "Critical-density observations represented 4% of recorded density states.",
];

export const comparisonData = {
  "Today vs Yesterday": [
    { metric: "Average Occupancy", current: "7,842", previous: "6,744", delta: "+16%", dir: "up" },
    { metric: "Peak Occupancy", current: "12,486", previous: "10,738", delta: "+16%", dir: "up" },
    { metric: "Entries", current: "52,430", previous: "47,710", delta: "+10%", dir: "up" },
    { metric: "Exits", current: "48,120", previous: "46,680", delta: "+3%", dir: "up" },
    { metric: "Alerts", current: "42", previous: "38", delta: "+11%", dir: "up" },
  ],
  "This Week vs Last Week": [
    { metric: "Average Occupancy", current: "6,116", previous: "6,450", delta: "−5%", dir: "down" },
    { metric: "Peak Occupancy", current: "12,486", previous: "13,120", delta: "−5%", dir: "down" },
    { metric: "Entries", current: "342,180", previous: "361,400", delta: "−5%", dir: "down" },
    { metric: "Exits", current: "318,540", previous: "330,900", delta: "−4%", dir: "down" },
    { metric: "Alerts", current: "264", previous: "289", delta: "−9%", dir: "down" },
  ],
};

// Cameras page — infrastructure inventory mock data (separate from the
// 9-camera Live Monitoring feed sample). Later: replaced by Spring Boot APIs
// fronting the Python AI service. Stream sources are masked mock values.
export const cameraInventory = [
  { id: "CAM-01", name: "Main Entrance", location: "Main Entrance Gate", zone: "A", status: "Online", aiStatus: "Processing", fps: 24, fpsTarget: 24, resolution: "1920 × 1080", health: 98, streamQuality: 98, fpsStability: 96, heartbeat: 100, aiPipeline: 97, latency: 82, lastHeartbeat: "10:24:36 AM", streamSource: "rtsp://camera-source/cam-01", enabled: true, people: 428, density: "High" },
  { id: "CAM-02", name: "Queue Area", location: "Pilgrim Queue Complex", zone: "B", status: "Online", aiStatus: "Processing", fps: 24, fpsTarget: 24, resolution: "1920 × 1080", health: 96, streamQuality: 97, fpsStability: 95, heartbeat: 100, aiPipeline: 95, latency: 88, lastHeartbeat: "10:24:31 AM", streamSource: "rtsp://camera-source/cam-02", enabled: true, people: 312, density: "Moderate" },
  { id: "CAM-03", name: "Inner Premises", location: "Sanctum Corridor", zone: "C", status: "Online", aiStatus: "Processing", fps: 25, fpsTarget: 25, resolution: "1920 × 1080", health: 99, streamQuality: 99, fpsStability: 98, heartbeat: 100, aiPipeline: 97, latency: 74, lastHeartbeat: "10:24:28 AM", streamSource: "rtsp://camera-source/cam-03", enabled: true, people: 182, density: "Normal" },
  { id: "CAM-04", name: "Exit Area", location: "South Exit Gate", zone: "D", status: "Online", aiStatus: "Processing", fps: 24, fpsTarget: 24, resolution: "1920 × 1080", health: 97, streamQuality: 98, fpsStability: 97, heartbeat: 100, aiPipeline: 96, latency: 79, lastHeartbeat: "10:24:22 AM", streamSource: "rtsp://camera-source/cam-04", enabled: true, people: 96, density: "Normal" },
  { id: "CAM-05", name: "North Gate", location: "North Entry Gate", zone: "A", status: "Online", aiStatus: "Processing", fps: 23, fpsTarget: 24, resolution: "1920 × 1080", health: 93, streamQuality: 94, fpsStability: 92, heartbeat: 100, aiPipeline: 94, latency: 96, lastHeartbeat: "10:24:19 AM", streamSource: "rtsp://camera-source/cam-05", enabled: true, people: 284, density: "Moderate" },
  { id: "CAM-06", name: "Temple Courtyard", location: "Central Courtyard", zone: "C", status: "Online", aiStatus: "Processing", fps: 22, fpsTarget: 24, resolution: "1920 × 1080", health: 91, streamQuality: 92, fpsStability: 90, heartbeat: 99, aiPipeline: 93, latency: 104, lastHeartbeat: "10:24:15 AM", streamSource: "rtsp://camera-source/cam-06", enabled: true, people: 520, density: "High" },
  { id: "CAM-07", name: "East Gate", location: "East Entry Gate", zone: "B", status: "Offline", aiStatus: "Error", fps: 0, fpsTarget: 24, resolution: "1920 × 1080", health: 0, streamQuality: 0, fpsStability: 0, heartbeat: 0, aiPipeline: 0, latency: 0, lastHeartbeat: "10:02:14 AM", streamSource: "rtsp://camera-source/cam-07", enabled: true, people: 0, density: "Unknown", issue: "No stream heartbeat detected" },
  { id: "CAM-08", name: "Parking Entry", location: "Parking Approach Road", zone: "D", status: "Degraded", aiStatus: "Paused", fps: 12, fpsTarget: 24, resolution: "1280 × 720", health: 62, streamQuality: 58, fpsStability: 55, heartbeat: 92, aiPipeline: 70, latency: 210, lastHeartbeat: "10:23:58 AM", streamSource: "rtsp://camera-source/cam-08", enabled: true, people: 64, density: "Normal", issue: "Low FPS detected — current 12 FPS, expected 24 FPS" },
  { id: "CAM-09", name: "West Corridor", location: "Western Corridor", zone: "C", status: "Online", aiStatus: "Processing", fps: 24, fpsTarget: 24, resolution: "1920 × 1080", health: 95, streamQuality: 96, fpsStability: 95, heartbeat: 100, aiPipeline: 95, latency: 86, lastHeartbeat: "10:24:09 AM", streamSource: "rtsp://camera-source/cam-09", enabled: true, people: 148, density: "Normal" },
  { id: "CAM-10", name: "South Corridor", location: "Southern Corridor", zone: "C", status: "Online", aiStatus: "Processing", fps: 24, fpsTarget: 24, resolution: "1920 × 1080", health: 94, streamQuality: 95, fpsStability: 94, heartbeat: 100, aiPipeline: 94, latency: 90, lastHeartbeat: "10:24:05 AM", streamSource: "rtsp://camera-source/cam-10", enabled: true, people: 122, density: "Normal" },
  { id: "CAM-11", name: "West Gate", location: "West Entry Gate", zone: "F", status: "Online", aiStatus: "Processing", fps: 24, fpsTarget: 24, resolution: "1920 × 1080", health: 96, streamQuality: 96, fpsStability: 96, heartbeat: 100, aiPipeline: 95, latency: 84, lastHeartbeat: "10:24:02 AM", streamSource: "rtsp://camera-source/cam-11", enabled: true, people: 138, density: "Normal" },
  { id: "CAM-12", name: "Food Court", location: "Courtyard Food Court", zone: "E", status: "Online", aiStatus: "Processing", fps: 24, fpsTarget: 24, resolution: "1920 × 1080", health: 92, streamQuality: 93, fpsStability: 91, heartbeat: 100, aiPipeline: 92, latency: 98, lastHeartbeat: "10:23:59 AM", streamSource: "rtsp://camera-source/cam-12", enabled: true, people: 264, density: "Moderate" },
  { id: "CAM-13", name: "Parking West", location: "West Parking Block", zone: "G", status: "Online", aiStatus: "Processing", fps: 24, fpsTarget: 24, resolution: "1920 × 1080", health: 95, streamQuality: 95, fpsStability: 94, heartbeat: 100, aiPipeline: 94, latency: 92, lastHeartbeat: "10:23:55 AM", streamSource: "rtsp://camera-source/cam-13", enabled: true, people: 58, density: "Normal" },
  { id: "CAM-14", name: "Service Yard", location: "Service Yard", zone: "H", status: "Online", aiStatus: "Processing", fps: 20, fpsTarget: 24, resolution: "1920 × 1080", health: 84, streamQuality: 86, fpsStability: 82, heartbeat: 98, aiPipeline: 88, latency: 132, lastHeartbeat: "10:23:51 AM", streamSource: "rtsp://camera-source/cam-14", enabled: true, people: 34, density: "Normal" },
  { id: "CAM-15", name: "North Corridor", location: "Northern Corridor", zone: "F", status: "Online", aiStatus: "Processing", fps: 24, fpsTarget: 24, resolution: "1920 × 1080", health: 97, streamQuality: 97, fpsStability: 96, heartbeat: 100, aiPipeline: 96, latency: 80, lastHeartbeat: "10:23:48 AM", streamSource: "rtsp://camera-source/cam-15", enabled: true, people: 112, density: "Normal" },
  { id: "CAM-16", name: "VIP Entry", location: "VIP Entrance Lane", zone: "A", status: "Online", aiStatus: "Processing", fps: 25, fpsTarget: 25, resolution: "1920 × 1080", health: 98, streamQuality: 98, fpsStability: 98, heartbeat: 100, aiPipeline: 97, latency: 76, lastHeartbeat: "10:23:44 AM", streamSource: "rtsp://camera-source/cam-16", enabled: true, people: 96, density: "Normal" },
  { id: "CAM-17", name: "Queue Exit", location: "Queue Exit Channel", zone: "B", status: "Online", aiStatus: "Processing", fps: 24, fpsTarget: 24, resolution: "1920 × 1080", health: 94, streamQuality: 95, fpsStability: 93, heartbeat: 100, aiPipeline: 93, latency: 89, lastHeartbeat: "10:23:40 AM", streamSource: "rtsp://camera-source/cam-17", enabled: true, people: 174, density: "Moderate" },
  { id: "CAM-18", name: "East Corridor", location: "Eastern Corridor", zone: "C", status: "Online", aiStatus: "Processing", fps: 24, fpsTarget: 24, resolution: "1920 × 1080", health: 96, streamQuality: 96, fpsStability: 95, heartbeat: 100, aiPipeline: 95, latency: 83, lastHeartbeat: "10:23:36 AM", streamSource: "rtsp://camera-source/cam-18", enabled: true, people: 158, density: "Normal" },
  { id: "CAM-19", name: "Parking South", location: "South Parking Block", zone: "G", status: "Online", aiStatus: "Processing", fps: 24, fpsTarget: 24, resolution: "1920 × 1080", health: 93, streamQuality: 94, fpsStability: 92, heartbeat: 100, aiPipeline: 92, latency: 94, lastHeartbeat: "10:23:32 AM", streamSource: "rtsp://camera-source/cam-19", enabled: true, people: 72, density: "Normal" },
  { id: "CAM-20", name: "Emergency Exit", location: "Emergency Exit Route", zone: "D", status: "Online", aiStatus: "Processing", fps: 24, fpsTarget: 24, resolution: "1920 × 1080", health: 97, streamQuality: 97, fpsStability: 96, heartbeat: 100, aiPipeline: 96, latency: 81, lastHeartbeat: "10:23:28 AM", streamSource: "rtsp://camera-source/cam-20", enabled: true, people: 44, density: "Normal" },
];

// Reports — document workflow mock data (separate from Analytics exploration data).
// Later: generated/scheduled by PostgreSQL + Spring Boot reporting service.
// Preview sections reuse the same operational datasets as other pages.
export const quickReportTypes = [
  { key: "crowd", type: "Crowd Summary", title: "Daily Crowd Summary", desc: "Occupancy, entry, exit and peak crowd activity for the selected period." },
  { key: "zone", type: "Zone Analysis", title: "Zone Occupancy Report", desc: "Per-zone occupancy, capacity utilization and density status." },
  { key: "alert", type: "Alert & Incident", title: "Alert & Incident Report", desc: "Alert volumes, severity mix, incidents and response activity." },
  { key: "camera", type: "Camera Health", title: "Camera Health Report", desc: "Stream health, AI pipeline status and attention items per camera." },
  { key: "resource", type: "Resource Deployment", title: "Resource Deployment Report", desc: "Team availability, assignments and zone coverage." },
  { key: "event", type: "Event Summary", title: "Event Summary Report", desc: "End-to-end operational summary across crowd, safety and systems." },
];

export const reportHistorySeed = [
  { id: "RP-1024", name: "Daily Crowd Safety Report", type: "Crowd Summary", date: "12 Sep 2025", createdBy: "Operator", format: "PDF", status: "Generated" },
  { id: "RP-1023", name: "Zone Occupancy Report", type: "Zone Analysis", date: "12 Sep 2025", createdBy: "Operator", format: "PDF", status: "Generated" },
  { id: "RP-1022", name: "Alert Incident Summary", type: "Alert & Incident", date: "11 Sep 2025", createdBy: "Operator", format: "CSV", status: "Generated" },
  { id: "RP-1021", name: "Camera Health Check", type: "Camera Health", date: "11 Sep 2025", createdBy: "Supervisor", format: "PDF", status: "Generated" },
  { id: "RP-1020", name: "Resource Deployment Sheet", type: "Resource Deployment", date: "10 Sep 2025", createdBy: "Operator", format: "CSV", status: "Generated" },
  { id: "RP-1019", name: "Weekly Safety Digest", type: "Event Summary", date: "08 Sep 2025", createdBy: "Supervisor", format: "PDF", status: "Generated" },
  { id: "RP-1018", name: "Zone Occupancy Report", type: "Zone Analysis", date: "08 Sep 2025", createdBy: "System", format: "PDF", status: "Failed" },
  { id: "RP-1017", name: "Morning Crowd Brief", type: "Crowd Summary", date: "07 Sep 2025", createdBy: "Operator", format: "PDF", status: "Generated" },
];

export const scheduledReportsSeed = [
  { id: "SCH-01", name: "Daily Crowd Summary", schedule: "Every day", time: "08:00 PM", active: true },
  { id: "SCH-02", name: "Weekly Safety Report", schedule: "Every Monday", time: "09:00 AM", active: true },
  { id: "SCH-03", name: "Monthly Operations Report", schedule: "1st of every month", time: "10:00 AM", active: true },
];

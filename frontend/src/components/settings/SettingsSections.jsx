import { Edit, KeyRound, LogOut } from "lucide-react";
import { SettingSection, SettingRow, Switch, NumField, SelectField, TextField, SliderRow } from "./SettingControls";
import { systemStatus } from "../../data/settingsDefaults";

export function GeneralSettings({ s, set }) {
  const g = s.general;
  const put = (k) => (v) => set({ ...s, general: { ...g, [k]: v } });
  return (
    <>
      <SettingSection title="Venue Information">
        <SettingRow label="Venue Name" id="venue-name" control={<TextField id="venue-name" value={g.venueName} onChange={put("venueName")} />} />
        <SettingRow label="Venue Type" id="venue-type" control={<SelectField id="venue-type" value={g.venueType} options={["Large Gathering", "Temple Complex", "Stadium", "Festival Ground", "Transit Hub"]} onChange={put("venueType")} />} />
        <SettingRow label="Location" id="venue-loc" control={<TextField id="venue-loc" value={g.location} onChange={put("location")} />} />
        <SettingRow label="Timezone" id="venue-tz" control={<SelectField id="venue-tz" value={g.timezone} options={["Asia/Kolkata", "Asia/Dubai", "UTC"]} onChange={put("timezone")} />} />
        <SettingRow label="Operating Mode" id="venue-mode" control={<SelectField id="venue-mode" value={g.operatingMode} options={["Live Monitoring", "Event Mode", "Maintenance"]} onChange={put("operatingMode")} />} />
      </SettingSection>
      <SettingSection title="System Configuration" desc="Read-only operational snapshot.">
        <div className="sys-grid">
          <div><small>System Status</small><strong className="ok">● Online</strong></div>
          <div><small>Connected Cameras</small><strong>20</strong></div>
          <div><small>AI Processing</small><strong>18</strong></div>
          <div><small>Active Alerts</small><strong>5</strong></div>
          <div><small>Last System Check</small><strong>10:24 AM</strong></div>
        </div>
      </SettingSection>
    </>
  );
}

export function CrowdMonitoringSettings({ s, set }) {
  const c = s.crowdMonitoring;
  const put = (k) => (v) => set({ ...s, crowdMonitoring: { ...c, [k]: v } });
  const toggles = [
    ["enabled", "Enable Crowd Monitoring"], ["occupancyTracking", "Occupancy Tracking"],
    ["densityMonitoring", "Density Monitoring"], ["flowMonitoring", "Flow Monitoring"],
    ["entryExitTracking", "Entry/Exit Tracking"],
  ];
  return (
    <SettingSection title="Crowd Monitoring Settings" desc="Defaults for new zones — per-zone capacity is configured on the Zones page.">
      {toggles.map(([k, label]) => (
        <SettingRow key={k} label={label} id={`cm-${k}`}
          control={<Switch id={`cm-${k}`} label={label} checked={c[k]} onChange={put(k)} />} />
      ))}
      <SettingRow label="Moderate from" hint="Normal: 0 to moderate threshold" id="cm-mod"
        control={<NumField id="cm-mod" value={c.moderateFrom} min={0} max={100} onChange={put("moderateFrom")} suffix="%" />} />
      <SettingRow label="High from" id="cm-high"
        control={<NumField id="cm-high" value={c.highFrom} min={0} max={100} onChange={put("highFrom")} suffix="%" />} />
      <SettingRow label="Critical from" id="cm-crit"
        control={<NumField id="cm-crit" value={c.criticalFrom} min={0} max={100} onChange={put("criticalFrom")} suffix="%" />} />
      <SettingRow label="Default Zone Capacity" hint="Applies to newly created zones only" id="cm-cap"
        control={<NumField id="cm-cap" value={c.defaultZoneCapacity} min={100} max={50000} step={100} onChange={put("defaultZoneCapacity")} suffix="people" />} />
    </SettingSection>
  );
}

export function AlertSettings({ s, set }) {
  const a = s.alerts;
  const put = (k) => (v) => set({ ...s, alerts: { ...a, [k]: v } });
  const putSev = (k) => (v) => set({ ...s, alerts: { ...a, severity: { ...a.severity, [k]: v } } });
  const toggles = [
    ["highDensity", "High Density Alert"], ["capacityThreshold", "Capacity Threshold Alert"],
    ["unusualMovement", "Unusual Movement Alert"], ["restrictedZone", "Restricted Zone Alert"],
    ["cameraOffline", "Camera Offline Alert"], ["cameraDegraded", "Camera Degraded Alert"],
  ];
  return (
    <>
      <SettingSection title="Alert Configuration">
        {toggles.map(([k, label]) => (
          <SettingRow key={k} label={label} id={`al-${k}`}
            control={<Switch id={`al-${k}`} label={label} checked={a[k]} onChange={put(k)} />} />
        ))}
        <SettingRow label="High Density at" id="al-hi" control={<NumField id="al-hi" value={a.highDensityAt} min={0} max={100} onChange={put("highDensityAt")} suffix="%" />} />
        <SettingRow label="Critical Density at" id="al-crit" control={<NumField id="al-crit" value={a.criticalDensityAt} min={0} max={100} onChange={put("criticalDensityAt")} suffix="%" />} />
        <SettingRow label="Camera Offline Delay" id="al-delay" control={<NumField id="al-delay" value={a.offlineDelaySec} min={5} max={300} onChange={put("offlineDelaySec")} suffix="sec" />} />
        <SettingRow label="Alert Cooldown" hint="Cooldown prevents repeated alerts from the same condition." id="al-cool"
          control={<NumField id="al-cool" value={a.cooldownSec} min={10} max={600} onChange={put("cooldownSec")} suffix="sec" />} />
      </SettingSection>
      <SettingSection title="Alert Severity Mapping" desc="Which condition maps to which severity.">
        {[["highDensity", "High Density"], ["criticalDensity", "Critical Density"], ["cameraOffline", "Camera Offline"], ["restrictedZone", "Restricted Zone"]].map(([k, label]) => (
          <SettingRow key={k} label={label} id={`sev-${k}`}
            control={<SelectField id={`sev-${k}`} value={a.severity[k]} options={["Info", "Warning", "High", "Critical"]} onChange={putSev(k)} />} />
        ))}
      </SettingSection>
    </>
  );
}

export function AISettings({ s, set }) {
  const v = s.ai;
  const put = (k) => (val) => set({ ...s, ai: { ...v, [k]: val } });
  const toggles = [
    ["personDetection", "Person Detection"], ["objectTracking", "Object Tracking"],
    ["densityAnalysis", "Crowd Density Analysis"], ["movementAnalysis", "Movement Analysis"], ["zoneAnalysis", "Zone Analysis"],
  ];
  return (
    <SettingSection title="AI & Detection" desc="Declared pipeline configuration — display only, no live tuning.">
      {toggles.map(([k, label]) => (
        <SettingRow key={k} label={label} id={`ai-${k}`}
          control={<Switch id={`ai-${k}`} label={label} checked={v[k]} onChange={put(k)} />} />
      ))}
      <SettingRow label="AI Engine" id="ai-engine" control={<TextField id="ai-engine" value={v.engine} disabled onChange={() => {}} />} />
      <SettingRow label="Tracker" id="ai-tracker" control={<TextField id="ai-tracker" value={v.tracker} disabled onChange={() => {}} />} />
      <SliderRow id="ai-det" label="Detection Confidence" value={v.detectionConfidence} min={0.1} max={0.95} step={0.05} onChange={put("detectionConfidence")} />
      <SliderRow id="ai-trk" label="Tracking Confidence" value={v.trackingConfidence} min={0.1} max={0.95} step={0.05} onChange={put("trackingConfidence")} />
      <SettingRow label="Processing Mode" id="ai-mode" control={<SelectField id="ai-mode" value={v.processingMode} options={["Real-time", "Balanced", "Accuracy"]} onChange={put("processingMode")} />} />
    </SettingSection>
  );
}

export function CameraDefaults({ s, set }) {
  const c = s.cameras;
  const put = (k) => (v) => set({ ...s, cameras: { ...c, [k]: v } });
  return (
    <SettingSection title="Camera Defaults" desc="These values are defaults for newly configured cameras.">
      <SettingRow label="Default Resolution" id="cam-res" control={<SelectField id="cam-res" value={c.defaultResolution} options={["1920 × 1080", "1280 × 720", "2560 × 1440"]} onChange={put("defaultResolution")} />} />
      <SettingRow label="Target FPS" id="cam-fps" control={<NumField id="cam-fps" value={c.targetFps} min={5} max={60} onChange={put("targetFps")} suffix="fps" />} />
      <SettingRow label="Stream Health Check" hint="Every 10 seconds" id="cam-hc" control={<NumField id="cam-hc" value={c.healthCheckSec} min={5} max={120} onChange={put("healthCheckSec")} suffix="sec" />} />
      <SettingRow label="Heartbeat Timeout" id="cam-hb" control={<NumField id="cam-hb" value={c.heartbeatTimeoutSec} min={10} max={300} onChange={put("heartbeatTimeoutSec")} suffix="sec" />} />
      <SettingRow label="Default AI Processing" id="cam-ai" control={<SelectField id="cam-ai" value={c.defaultAi} options={["Enabled", "Disabled"]} onChange={put("defaultAi")} />} />
    </SettingSection>
  );
}

export function NotificationSettings({ s, set }) {
  const n = s.notifications;
  const put = (k) => (v) => set({ ...s, notifications: { ...n, [k]: v } });
  const chan = [["inApp", "In-App Notifications"], ["email", "Email Notifications"], ["push", "Push Notifications"]];
  const levels = [["onCritical", "Critical Alerts"], ["onHigh", "High Alerts"], ["onWarning", "Warning Alerts"], ["onInfo", "Info Alerts"]];
  const sounds = [["soundCritical", "Critical"], ["soundHigh", "High"], ["soundWarning", "Warning"], ["soundInfo", "Info"]];
  return (
    <>
      <SettingSection title="Notification Channels">
        {chan.map(([k, label]) => (
          <SettingRow key={k} label={label} id={`nt-${k}`} control={<Switch id={`nt-${k}`} label={label} checked={n[k]} onChange={put(k)} />} />
        ))}
      </SettingSection>
      <SettingSection title="Alert Notifications">
        {levels.map(([k, label]) => (
          <SettingRow key={k} label={label} id={`nt-${k}`} control={<Switch id={`nt-${k}`} label={label} checked={n[k]} onChange={put(k)} />} />
        ))}
      </SettingSection>
      <SettingSection title="Notification Sounds">
        {sounds.map(([k, label]) => (
          <SettingRow key={k} label={label} id={`nt-${k}`} control={<Switch id={`nt-${k}`} label={label} checked={n[k]} onChange={put(k)} />} />
        ))}
      </SettingSection>
    </>
  );
}

export function AppearanceSettings({ s, set }) {
  const v = s.appearance;
  const put = (k) => (val) => set({ ...s, appearance: { ...v, [k]: val } });
  return (
    <SettingSection title="Appearance" desc="Light theme is the supported default for the control room.">
      <SettingRow label="Theme" id="ap-theme" control={<SelectField id="ap-theme" value={v.theme} options={["Light", "Dark", "System"]} onChange={put("theme")} />} />
      <SettingRow label="Accent" id="ap-accent" control={<SelectField id="ap-accent" value={v.accent} options={["Indigo", "Blue", "Violet"]} onChange={put("accent")} />} />
      <SettingRow label="Density" id="ap-density" control={<SelectField id="ap-density" value={v.density} options={["Compact", "Comfortable", "Spacious"]} onChange={put("density")} />} />
      <SettingRow label="Reduce Motion" id="ap-motion" control={<Switch id="ap-motion" label="Reduce Motion" checked={v.reduceMotion} onChange={put("reduceMotion")} />} />
    </SettingSection>
  );
}

export function ProfileSettings({ s, set, onEdit, onPassword }) {
  const p = s.profile;
  return (
    <SettingSection title="Operator Profile">
      <div className="profile-card">
        <span className="avatar big" aria-hidden="true">OP</span>
        <div><strong>{p.name}</strong><small>{p.role} · {p.department}</small><small>{p.email} · {p.phone}</small></div>
      </div>
      <div className="dialog-btns">
        <button className="qa-btn" onClick={onEdit}><Edit size={15} aria-hidden="true" /> Edit Profile</button>
        <button className="qa-btn" onClick={onPassword}><KeyRound size={15} aria-hidden="true" /> Change Password</button>
      </div>
    </SettingSection>
  );
}

export function SecuritySettings({ s, set, onSignOut }) {
  const v = s.security;
  const put = (k) => (val) => set({ ...s, security: { ...v, [k]: val } });
  return (
    <>
      <SettingSection title="Security & Session">
        <SettingRow label="Session Timeout" id="sec-timeout" control={<SelectField id="sec-timeout" value={v.sessionTimeout} options={["15 minutes", "30 minutes", "1 hour", "4 hours"]} onChange={put("sessionTimeout")} />} />
        <SettingRow label="Require re-authentication for sensitive actions" id="sec-reauth" control={<Switch id="sec-reauth" label="Require re-authentication" checked={v.requireReauth} onChange={put("requireReauth")} />} />
        <SettingRow label="Login notifications" id="sec-login" control={<Switch id="sec-login" label="Login notifications" checked={v.loginNotifications} onChange={put("loginNotifications")} />} />
      </SettingSection>
      <SettingSection title="Active Session">
        <div className="session-card"><strong>Control Room — Current Device</strong><small className="ok">● Active Now</small></div>
        <div className="dialog-btns">
          <button className="qa-btn" onClick={onSignOut}><LogOut size={15} aria-hidden="true" /> Sign Out</button>
        </div>
      </SettingSection>
    </>
  );
}

export function SystemSettings() {
  return (
    <>
      <SettingSection title="System Information">
        <dl className="sys-list">
          <div><dt>Application</dt><dd>{systemStatus.app}</dd></div>
          <div><dt>Version</dt><dd>{systemStatus.version}</dd></div>
          <div><dt>Frontend</dt><dd>{systemStatus.frontend}</dd></div>
          <div><dt>Design System</dt><dd>{systemStatus.designSystem}</dd></div>
          <div><dt>AI</dt><dd>{systemStatus.ai}</dd></div>
          <div><dt>Backend</dt><dd>{systemStatus.backend}</dd></div>
          <div><dt>Database</dt><dd>{systemStatus.database}</dd></div>
          <div><dt>AI Service</dt><dd>{systemStatus.aiService}</dd></div>
        </dl>
      </SettingSection>
      <SettingSection title="Integration Status" desc="Informational mock values — services are not connected yet.">
        <ul className="integ-list">
          {systemStatus.integrations.map((i) => (
            <li key={i.name}><strong>{i.name}</strong>
              <span className={`chip ${i.state === "Operational" ? "st-normal" : "st-moderate"}`}>● {i.state}</span></li>
          ))}
        </ul>
      </SettingSection>
    </>
  );
}

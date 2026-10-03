import { useState } from "react";
import { RotateCcw, Check } from "lucide-react";
import SettingsNavigation from "./SettingsNavigation";
import {
  GeneralSettings, CrowdMonitoringSettings, AlertSettings, AISettings, CameraDefaults,
  NotificationSettings, AppearanceSettings, ProfileSettings, SecuritySettings, SystemSettings,
} from "./SettingsSections";
import { ConfirmationDialog, ChangePasswordDialog, EditProfileDialog } from "./SettingsDialogs";
import { settingsSections, defaultSettings } from "../../data/settingsDefaults";

const clone = (o) => JSON.parse(JSON.stringify(o));

export default function SettingsPage() {
  const [section, setSection] = useState("General");
  const [settings, setSettings] = useState(() => clone(defaultSettings));
  const [saved, setSaved] = useState(() => clone(defaultSettings));
  const [dialog, setDialog] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(null), 2400); };
  const dirty = JSON.stringify(settings) !== JSON.stringify(saved);

  const save = () => { setSaved(clone(settings)); showToast("Settings saved successfully"); };

  return (
    <div className="live-page settings-page">
      <section className="page-head" aria-labelledby="settings-title">
        <div>
          <h1 id="settings-title">Settings</h1>
          <p>Configure crowd monitoring, alerts, system preferences and operator settings</p>
        </div>
        <div className="page-head-right">
          <span className="live-pill"><span className="dot" /> System Live</span>
          {dirty ? <span className="unsaved-chip">Unsaved changes</span> : <span className="saved-chip"><Check size={13} aria-hidden="true" /> Saved</span>}
          <button className="mt-refresh" onClick={save} aria-label="Save changes">Save Changes</button>
        </div>
      </section>

      <section className="settings-main" aria-label="Settings workspace">
        <SettingsNavigation sections={settingsSections} active={section} onSelect={setSection} />
        <div className="settings-content">
          {section === "General" && <GeneralSettings s={settings} set={setSettings} />}
          {section === "Crowd Monitoring" && <CrowdMonitoringSettings s={settings} set={setSettings} />}
          {section === "Alerts" && <AlertSettings s={settings} set={setSettings} />}
          {section === "AI & Detection" && <AISettings s={settings} set={setSettings} />}
          {section === "Cameras" && <CameraDefaults s={settings} set={setSettings} />}
          {section === "Notifications" && <NotificationSettings s={settings} set={setSettings} />}
          {section === "Appearance" && <AppearanceSettings s={settings} set={setSettings} />}
          {section === "Profile" && (
            <ProfileSettings s={settings} set={setSettings}
              onEdit={() => setDialog({ kind: "profile" })}
              onPassword={() => setDialog({ kind: "password" })} />
          )}
          {section === "Security" && (
            <SecuritySettings s={settings} set={setSettings} onSignOut={() => setDialog({ kind: "signout" })} />
          )}
          {section === "System" && <SystemSettings />}
          {section !== "System" && (
            <button className="reset-link" onClick={() => setDialog({ kind: "reset" })}>
              <RotateCcw size={14} aria-hidden="true" /> Reset to Defaults
            </button>
          )}
        </div>
      </section>

      {dialog?.kind === "reset" && (
        <ConfirmationDialog title="Reset Settings?"
          message="This will restore the default monitoring and notification preferences."
          confirmLabel="Reset" onClose={() => setDialog(null)}
          onConfirm={() => {
            const fresh = clone(defaultSettings);
            setSettings(fresh); setSaved(fresh); setDialog(null);
            showToast("Settings restored to defaults");
          }} />
      )}
      {dialog?.kind === "signout" && (
        <ConfirmationDialog title="Sign Out?"
          message="This prototype does not end a real session. The dialog is for UI demonstration only."
          confirmLabel="Sign Out" onClose={() => setDialog(null)}
          onConfirm={() => { setDialog(null); showToast("Sign-out dismissed (demo)"); }} />
      )}
      {dialog?.kind === "password" && (
        <ChangePasswordDialog onClose={() => setDialog(null)}
          onConfirm={() => { setDialog(null); showToast("Password updated (demo)"); }} />
      )}
      {dialog?.kind === "profile" && (
        <EditProfileDialog profile={settings.profile} onClose={() => setDialog(null)}
          onConfirm={(p) => { setSettings({ ...settings, profile: p }); setDialog(null); showToast("Profile updated"); }} />
      )}

      {toast && <div className="toast" role="status" aria-live="polite">{toast}</div>}
    </div>
  );
}

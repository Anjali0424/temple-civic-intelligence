export function SettingSection({ title, desc, children }) {
  return (
    <section className="card glass setting-section" aria-label={title}>
      <h3>{title}</h3>
      {desc && <p className="setting-desc">{desc}</p>}
      <div className="setting-rows">{children}</div>
    </section>
  );
}

export function SettingRow({ label, hint, control, id }) {
  return (
    <div className="setting-row">
      <div className="setting-label">
        <label htmlFor={id}>{label}</label>
        {hint && <small>{hint}</small>}
      </div>
      <div className="setting-control">{control}</div>
    </div>
  );
}

export function Switch({ id, checked, onChange, label }) {
  return (
    <button id={id} role="switch" aria-checked={checked} aria-label={label}
      className={`switch ${checked ? "on" : ""}`} onClick={() => onChange(!checked)}>
      <span className="knob" aria-hidden="true" />
    </button>
  );
}

export function NumField({ id, value, min, max, step, onChange, suffix }) {
  return (
    <span className="num-wrap">
      <input id={id} type="number" value={value} min={min} max={max} step={step}
        onChange={(e) => onChange(Number(e.target.value))} aria-label={id} />
      {suffix && <small>{suffix}</small>}
    </span>
  );
}

export function SelectField({ id, value, options, onChange }) {
  return (
    <select id={id} value={value} onChange={(e) => onChange(e.target.value)} className="setting-select">
      {options.map((o) => <option key={o} value={o}>{o}</option>)}
    </select>
  );
}

export function TextField({ id, value, onChange, disabled, placeholder }) {
  return (
    <input id={id} type="text" value={value} disabled={disabled} placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)} className="setting-input" />
  );
}

export function SliderRow({ id, label, hint, value, min, max, step, onChange }) {
  return (
    <SettingRow label={label} hint={hint} id={id}
      control={
        <span className="slider-wrap">
          <input id={id} type="range" min={min} max={max} step={step} value={value}
            onChange={(e) => onChange(Number(e.target.value))} aria-label={label} />
          <strong>{Number(value).toFixed(2)}</strong>
        </span>
      } />
  );
}

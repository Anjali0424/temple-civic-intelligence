import { useState } from "react";
import { Search, Eye, Download, MoreHorizontal } from "lucide-react";

const statusCls = { Generated: "st-normal", Processing: "st-moderate", Scheduled: "st-low", Failed: "st-critical" };

export default function ReportHistory({ reports, onPreview, onDownload, onRename, onDuplicate, onDelete }) {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("Newest");
  const [menu, setMenu] = useState(null);

  const q = search.trim().toLowerCase();
  let list = reports.filter((r) =>
    !q || `${r.name} ${r.type} ${r.date} ${r.createdBy}`.toLowerCase().includes(q));
  list = [...list].sort((a, b) =>
    sort === "Name" ? a.name.localeCompare(b.name)
    : sort === "Oldest" ? a.id.localeCompare(b.id) : b.id.localeCompare(a.id));

  return (
    <section className="card glass" aria-labelledby="report-history-title">
      <div className="card-head">
        <h2 id="report-history-title">Report History</h2>
        <div className="history-tools">
          <label className="mt-search small">
            <Search size={15} aria-hidden="true" />
            <input type="search" value={search} onChange={(e) => setSearch(e.target.value)}
              placeholder="Search reports..." aria-label="Search report history" />
          </label>
          <label className="mt-select">Sort:
            <select value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Sort reports">
              {["Newest", "Oldest", "Name"].map((o) => <option key={o}>{o}</option>)}
            </select>
          </label>
        </div>
      </div>
      {list.length === 0 ? (
        <p className="muted" role="status">No reports match the current search and filters.</p>
      ) : (
        <ul className="history-list">
          {list.map((r) => (
            <li key={r.id} className="history-row">
              <div className="history-main">
                <strong>{r.name}</strong>
                <small>{r.id} · {r.type} · {r.date} · {r.createdBy} · {r.format}</small>
              </div>
              <span className={`chip ${statusCls[r.status] || "st-low"}`}>{r.status}</span>
              <span className="history-actions">
                <button className="cbtn" onClick={() => onPreview(r)} aria-label={`Preview ${r.name}`}><Eye size={14} /> Preview</button>
                <button className="cbtn" onClick={() => onDownload(r)} aria-label={`Download ${r.name}`}><Download size={14} /> Download</button>
                <span className="menu-wrap">
                  <button className="cbtn icon-only" onClick={() => setMenu(menu === r.id ? null : r.id)}
                    aria-haspopup="menu" aria-expanded={menu === r.id} aria-label={`More actions for ${r.name}`}>
                    <MoreHorizontal size={15} />
                  </button>
                  {menu === r.id && (
                    <span className="export-menu glass cam-menu" role="menu">
                      <button role="menuitem" onClick={() => { setMenu(null); onRename(r); }}>Rename</button>
                      <button role="menuitem" onClick={() => { setMenu(null); onDuplicate(r); }}>Duplicate</button>
                      <button role="menuitem" onClick={() => { setMenu(null); onDelete(r); }}>Delete</button>
                    </span>
                  )}
                </span>
              </span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

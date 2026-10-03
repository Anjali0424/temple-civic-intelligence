import { Maximize2, Camera as SnapIcon, Pause } from "lucide-react";
import { cameraStats } from "../data/mockData";

// Simulated YOLO+ByteTrack boxes (mock overlay, UI only)
const boxes = [
  { l: "8%", t: "30%", w: "9%", h: "34%", id: "ID 0142" },
  { l: "22%", t: "42%", w: "8%", h: "30%", id: "ID 0143" },
  { l: "36%", t: "28%", w: "9%", h: "36%", id: "ID 0144" },
  { l: "52%", t: "44%", w: "8%", h: "28%", id: "ID 0145" },
  { l: "64%", t: "32%", w: "9%", h: "33%", id: "ID 0146" },
  { l: "78%", t: "46%", w: "8%", h: "26%", id: "ID 0147" },
];

export default function LiveCrowdOverview() {
  const live = cameraStats.live;
  return (
    <section className="card glass span-7" aria-labelledby="live-title">
      <div className="card-head">
        <h2 id="live-title">Live Crowd Overview</h2>
        <button className="link-btn">View All Cameras <span aria-hidden="true">→</span></button>
      </div>
      <div className="video" role="img" aria-label={`Live mock feed ${live.id} ${live.name}, 428 people, high density, zone A`}>
        <div className="video-bg" aria-hidden="true" />
        <div className="video-top">
          <span className="live-badge"><span className="dot" /> LIVE</span>
          <span className="cam-id">{live.id} · {live.name}<br /><small>{live.date} · {live.time}</small></span>
        </div>
        {boxes.map((b) => (
          <div key={b.id} className="bbox" style={{ left: b.l, top: b.t, width: b.w, height: b.h }}>
            <span className="bbox-id">{b.id}</span>
          </div>
        ))}
        <div className="video-bottom">
          <span>People: <strong>428</strong></span>
          <span>Density: <strong className="high">High</strong></span>
          <span>Zone: <strong>A</strong></span>
        </div>
      </div>
      <div className="video-controls">
        <button className="chip-btn" aria-label="Fullscreen"><Maximize2 size={15} /> Fullscreen</button>
        <button className="chip-btn" aria-label="Take snapshot"><SnapIcon size={15} /> Snapshot</button>
        <button className="chip-btn" aria-label="Pause feed"><Pause size={15} /> Pause</button>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useState } from "react";
import { CASE_FILTERS, CASE_STUDIES } from "../_data/cases";

export default function CaseWork() {
  const [filter, setFilter] = useState("all");
  const [openId, setOpenId] = useState<string | null>(null);

  const visible = CASE_STUDIES.filter((c) => filter === "all" || c.category === filter);
  const open = CASE_STUDIES.find((c) => c.id === openId) ?? null;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenId(null);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  function tilt(e: React.PointerEvent<HTMLAnchorElement>) {
    if (!window.matchMedia("(pointer:fine)").matches) return;
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateX(${(-y * 1.8).toFixed(2)}deg) rotateY(${(x * 2.2).toFixed(2)}deg)`;
  }

  return (
    <>
      <div className="filters" id="filters">
        <div className="wrap filter-inner">
          <span className="filter-label">Explore by discipline</span>
          <div className="filter-buttons">
            {CASE_FILTERS.map((f) => (
              <button
                key={f.value}
                type="button"
                className={`filter${filter === f.value ? " active" : ""}`}
                onClick={() => setFilter(f.value)}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <section className="work" id="work">
        <div className="wrap">
          <div className="case-grid">
            {visible.map((c) => (
              <article className="case-card" key={c.id}>
                <a
                  className="case-media"
                  href={`#${c.id}`}
                  aria-label={`Open ${c.name} case study`}
                  onClick={(e) => { e.preventDefault(); setOpenId(c.id); }}
                  onPointerMove={tilt}
                  onPointerLeave={(e) => { e.currentTarget.style.transform = ""; }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={c.image} alt={`${c.name} case study visual`} loading="lazy" />
                  <div className="media-shade" />
                  <span className="case-number">{String(CASE_STUDIES.indexOf(c) + 1).padStart(3, "0")}</span>
                  <span className="open-case">OPEN CASE <b>↗</b></span>
                  <span className="media-tag">{c.tag}</span>
                </a>
                <div className="case-meta">
                  <div>
                    <span className="case-category">{c.category}</span>
                    <h3>{c.name}</h3>
                  </div>
                  <span className="case-scope">{c.scope}</span>
                </div>
                <p>{c.blurb}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <div
        className={`modal${open ? " open" : ""}`}
        aria-hidden={!open}
        onClick={(e) => e.target === e.currentTarget && setOpenId(null)}
      >
        <div className="modal-shell">
          {open && (
            <article className="modal-case active" key={open.id}>
              <div className="modal-top">
                <span>{open.category}</span>
                <button className="close-modal" type="button" aria-label="Close case study" onClick={() => setOpenId(null)}>×</button>
              </div>
              <div className="modal-grid">
                <div>
                  <div className="modal-label">{open.tag}</div>
                  <h2>{open.headline}</h2>
                  <p className="modal-desc">{open.blurb}</p>
                  <div className="modal-scope">
                    <span>CAPABILITIES</span>
                    <strong>{open.scope}</strong>
                  </div>
                </div>
                <div className="modal-image">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={open.image} alt={open.name} />
                </div>
              </div>
            </article>
          )}
        </div>
      </div>
    </>
  );
}

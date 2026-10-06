"use client";

import { useEffect, useRef, useState } from "react";
import { PROJECTS, PROJECT_FILTERS } from "../_data/projects";

export default function PortfolioWork() {
  const [filter, setFilter] = useState("all");
  const [openId, setOpenId] = useState<string | null>(null);
  const ioRef = useRef<IntersectionObserver | null>(null);

  const visible = PROJECTS.filter((p) => filter === "all" || p.cats.includes(filter));
  const open = PROJECTS.find((p) => p.id === openId) ?? null;

  // Cards are re-created when the filter changes, so each one registers itself for the reveal.
  function revealRef(el: HTMLElement | null) {
    if (!el) return;
    ioRef.current ??= new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("on");
            ioRef.current?.unobserve(e.target);
          }
        }),
      { threshold: 0.1 }
    );
    ioRef.current.observe(el);
  }

  useEffect(() => () => ioRef.current?.disconnect(), []);

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

  return (
    <>
      <section className="work" id="work">
        <div className="container">
          <div className="work-head">
            <div>
              <div className="eyebrow">FEATURED WORK</div>
              <div className="section-title">SELECTED PROJECTS</div>
            </div>
            <div className="filters">
              {PROJECT_FILTERS.map((f) => (
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

          <div className="projects">
            {visible.map((p) => (
              <article
                key={p.id}
                ref={revealRef}
                className="project reveal"
                role="button"
                tabIndex={0}
                aria-label={`Open ${p.name} project`}
                onClick={() => setOpenId(p.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setOpenId(p.id); }
                }}
              >
                <div className="project-media">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.image} alt={p.alt} loading="lazy" />
                  <div className="project-overlay" />
                  <span className="project-arrow">↗</span>
                </div>
                <div className="project-meta">
                  <span>{p.kind}</span>
                  <span>{String(PROJECTS.indexOf(p) + 1).padStart(2, "0")}</span>
                </div>
                <h3>{p.name}</h3>
                <p>{p.blurb}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <div
        className={`modal${open ? " open" : ""}`}
        onClick={(e) => e.target === e.currentTarget && setOpenId(null)}
      >
        {open && (
          <div className="modal-box" role="dialog" aria-modal="true" aria-label={open.name}>
            <button className="close" type="button" aria-label="Close project" onClick={() => setOpenId(null)}>×</button>
            <div className="modal-img">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={open.modalImage} alt={open.alt} />
            </div>
            <div className="modal-body">
              <small>{open.modalKind}</small>
              <h3>{open.name}</h3>
              <p>{open.blurb}</p>
              <div className="tags">
                {open.tags.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

"use client";

import { useState } from "react";

const TYPES = [
  { id: "short", label: "Short-form", days: 1, variants: 4 },
  { id: "ad", label: "Ad creative", days: 2, variants: 6 },
  { id: "brand", label: "Brand film", days: 5, variants: 3 },
] as const;

export default function ContentCalculator() {
  const [count, setCount] = useState(8);
  const [typeId, setTypeId] = useState<(typeof TYPES)[number]["id"]>("short");
  const type = TYPES.find((t) => t.id === typeId)!;

  const turnaround = type.days + Math.ceil(count / 12);
  const deliverables = count * type.variants;
  const editors = Math.max(1, Math.ceil(count / 10));
  const pct = ((count - 1) / 39) * 100;

  return (
    <div className="cvx-calc" data-spotlight>
      <div className="cvx-calc-head">
        <span className="cvx-tag">Interactive</span>
        <h4>Plan your monthly output</h4>
      </div>

      <div className="cvx-chips" role="tablist" aria-label="Content type">
        {TYPES.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={t.id === typeId}
            className={`cvx-chip${t.id === typeId ? " on" : ""}`}
            onClick={() => setTypeId(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>

      <label className="cvx-range">
        <span className="cvx-range-top">
          <span>Videos per month</span>
          <b>{count}</b>
        </span>
        <input
          type="range"
          min={1}
          max={40}
          value={count}
          onChange={(e) => setCount(Number(e.target.value))}
          style={{ ["--pct" as string]: `${pct}%` }}
        />
      </label>

      <div className="cvx-stats">
        <div><strong key={turnaround}>{turnaround}d</strong><span>Avg. turnaround</span></div>
        <div><strong key={deliverables}>{deliverables}</strong><span>Platform cuts</span></div>
        <div><strong key={editors}>{editors}</strong><span>Editors assigned</span></div>
      </div>

      <a className="cvx-calc-cta" href="/contact">
        <span>Get a quote for {count} videos</span>
        <i aria-hidden="true">↗</i>
      </a>
    </div>
  );
}

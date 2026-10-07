"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import BudgetSimulator from "./BudgetSimulator";
import QualityScoreGauge from "./QualityScoreGauge";
import CapabilityShowcase from "./CapabilityShowcase";
import ProcessStepper from "./ProcessStepper";

/* The Google Ads page's ported markup (content.ts) leaves four empty mount
   points — plain <div id="..."> placeholders with no content of their own.
   This component finds them once the page has mounted and portals a real,
   independent React component into each: an interactive budget simulator, a
   Quality Score dial, a click-through capability showcase and a step wizard.
   Everything here is genuine React state (sliders, toggles, click handlers),
   not the imperative scroll-driven effects used elsewhere on the ported
   pages, and the visuals are built specifically for Google Ads rather than
   reusing the SEO page's search-results climb or growth curve. */

const MOUNTS = [
  { id: "gads-budget-sim", Component: BudgetSimulator },
  { id: "gads-quality-gauge", Component: QualityScoreGauge },
  { id: "gads-capabilities", Component: CapabilityShowcase },
  { id: "gads-process-stepper", Component: ProcessStepper },
] as const;

export default function GoogleAdsEnhancements() {
  const [containers, setContainers] = useState<Record<string, HTMLElement>>({});

  useEffect(() => {
    // deferred one tick so this isn't a synchronous setState-in-effect
    const raf = requestAnimationFrame(() => {
      const found: Record<string, HTMLElement> = {};
      for (const { id } of MOUNTS) {
        const el = document.getElementById(id);
        if (el) found[id] = el;
      }
      setContainers(found);
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <>
      {MOUNTS.map(({ id, Component }) => {
        const container = containers[id];
        return container ? createPortal(<Component key={id} />, container) : null;
      })}
    </>
  );
}

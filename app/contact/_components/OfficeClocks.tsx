"use client";

import { useEffect, useState } from "react";

const OFFICES = [
  { city: "Pakistan", tz: "Asia/Karachi" },
  { city: "Saudi Arabia", tz: "Asia/Riyadh" },
  { city: "USA", tz: "America/Chicago" },
];

function fmt(now: Date, tz: string) {
  return new Intl.DateTimeFormat("en-US", { hour: "2-digit", minute: "2-digit", hour12: false, timeZone: tz }).format(now);
}

export default function OfficeClocks() {
  // Rendered only after mount so server and client markup agree.
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    const tick = () => setNow(new Date());
    tick();
    const id = setInterval(tick, 15000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="ct-clocks" aria-label="Local time at our offices">
      {OFFICES.map((o) => (
        <div className="ct-clock" key={o.tz}>
          <span className="ct-clock-dot" aria-hidden="true" />
          <span className="ct-clock-city">{o.city}</span>
          <span className="ct-clock-time" suppressHydrationWarning>{now ? fmt(now, o.tz) : "--:--"}</span>
        </div>
      ))}
    </div>
  );
}

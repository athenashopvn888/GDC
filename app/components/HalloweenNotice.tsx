"use client";

import { useEffect, useState } from "react";

/** Slim date-gated holiday line. Shows through Oct 31 23:59 America/Toronto, then hides. */
function isHalloweenNoticeActive(date: Date) {
  const parts = new Intl.DateTimeFormat("en-CA", { timeZone: "America/Toronto", year: "numeric", month: "2-digit", day: "2-digit" }).formatToParts(date);
  const value = Object.fromEntries(parts.map(({ type, value }) => [type, value]));
  const dateKey = Number(`${value.year}${value.month}${value.day}`);
  return dateKey >= 20261014 && dateKey <= 20261031;
}

export default function HalloweenNotice({ storeName }: { storeName: string }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const update = () => setShow(isHalloweenNoticeActive(new Date()));
    update();
    const timer = window.setInterval(update, 60_000);
    return () => window.clearInterval(timer);
  }, []);
  if (!show) return null;
  return <p data-halloween-hours-notice="" style={{ margin: 0, padding: "6px 12px", background: "#111827", color: "#ffffff", textAlign: "center", fontWeight: 700, fontSize: "0.9rem", lineHeight: 1.3 }}>Happy Halloween! {storeName} is open regular hours on Saturday, October 31.</p>;
}

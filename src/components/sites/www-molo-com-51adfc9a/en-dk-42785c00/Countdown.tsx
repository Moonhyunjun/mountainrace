"use client";

import { useSyncExternalStore } from "react";

/**
 * 2027 대회 예정일 (KST). Update this one constant when the date is fixed —
 * the hero label and nothing else depends on it.
 */
export const RACE_DATE_2027 = new Date("2027-06-20T08:00:00+09:00");

/**
 * A one-second clock exposed as an external store, so the countdown
 * subscribes to time rather than looping state through an effect.
 * The snapshot is cached at second granularity so React sees a stable
 * value within a render pass.
 */
let snapshot = 0;

function subscribe(onChange: () => void) {
  const id = setInterval(() => {
    snapshot = Math.floor(Date.now() / 1000);
    onChange();
  }, 1000);
  snapshot = Math.floor(Date.now() / 1000);
  onChange();
  return () => clearInterval(id);
}

const getSnapshot = () => snapshot;
/** 0 on the server, so SSR and the first client render agree. */
const getServerSnapshot = () => 0;

function remaining(target: Date, nowSeconds: number) {
  const diff = Math.max(0, target.getTime() - nowSeconds * 1000);
  const pad = (n: number) => String(n).padStart(2, "0");
  return {
    days: Math.floor(diff / 86_400_000),
    hours: pad(Math.floor(diff / 3_600_000) % 24),
    minutes: pad(Math.floor(diff / 60_000) % 60),
    seconds: pad(Math.floor(diff / 1000) % 60),
  };
}

/**
 * Rendered inside the hero's overlay label, so it inherits the page's one
 * label style (mono 11px / 15.4px / -0.11px, uppercase) rather than
 * introducing a second type treatment.
 */
export function Countdown() {
  const nowSeconds = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  if (nowSeconds === 0) return <span>D-— · —:—:—</span>;

  const { days, hours, minutes, seconds } = remaining(
    RACE_DATE_2027,
    nowSeconds,
  );
  return (
    <span>
      D-{days} · {hours}:{minutes}:{seconds}
    </span>
  );
}

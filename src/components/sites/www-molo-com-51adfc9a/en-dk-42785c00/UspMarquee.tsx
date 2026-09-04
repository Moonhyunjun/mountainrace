"use client";

import { useState } from "react";
import { CloseIcon } from "../shared/icons";

const MESSAGE =
  "2027 WONJU MOUNTAIN RACE · 사전알림 접수 중 · 일정 확정 시 가장 먼저 알려드립니다";

/** Repeated so the doubled track fills more than one viewport width. */
const COPIES = 4;

/**
 * Fixed announcement bar — `height: 32px`, `rgb(24,24,24)` on
 * `rgb(251,251,251)`, mono 10px/15px with `-0.2px` tracking.
 *
 * The original runs `react-fast-marquee` at `152.644s linear infinite`
 * over a 1526px track; this is the same motion expressed as a doubled
 * track translated -50%.
 */
export function UspMarquee({ onDismiss }: { onDismiss?: () => void }) {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  const train = (
    <div className="flex shrink-0 items-center">
      {Array.from({ length: COPIES }, (_, i) => (
        <span key={i} className="whitespace-nowrap px-[40px]">
          {MESSAGE}
        </span>
      ))}
    </div>
  );

  return (
    <div
      className="fixed inset-x-0 top-0 z-50 flex h-[var(--mr-usp-height)] items-center overflow-hidden bg-[var(--mr-black)] font-[family-name:var(--mr-font-mono)] text-[10px] leading-[15px] tracking-[-0.2px] text-[var(--mr-white)]"
      style={{ "--mr-marquee-duration": "60s" } as React.CSSProperties}
    >
      <div className="mr-marquee flex w-max">
        {train}
        {train}
      </div>
      <button
        type="button"
        aria-label="공지 닫기"
        onClick={() => {
          setVisible(false);
          onDismiss?.();
        }}
        className="absolute right-0 z-[1001] flex h-[32px] w-[33px] items-center bg-[var(--mr-black)] px-[12px] text-[var(--mr-white)]"
      >
        <CloseIcon />
      </button>
    </div>
  );
}

"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowIcon } from "../shared/icons";
import { Countdown } from "./Countdown";
import { MediaFrame } from "./MediaFrame";
import type { HeroSlide } from "@/types/mountain-race";

const AUTOPLAY_MS = 6000;

/**
 * Hero cloned from molo.com: full-bleed media at `100svh - 32px`
 * (measured 868px at 1440 × 900), overlay label at the foot, `1 / 5`
 * counter at `right: 112px; bottom: 60px` and 4 × 18px arrows at
 * `right: 60px`. Counter and controls invert via `mix-blend-mode:
 * difference`; on mobile they are replaced by five 12 × 1px bars.
 */
export function HeroCarousel({ slides }: { slides: HeroSlide[] }) {
  const [index, setIndex] = useState(0);

  const go = useCallback(
    (delta: number) =>
      setIndex((i) => (i + delta + slides.length) % slides.length),
    [slides.length],
  );

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const id = setInterval(() => go(1), AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [go]);

  const active = slides[index];

  return (
    <section
      id="hero"
      className="relative mb-[var(--mr-module-gap)] h-[calc(100svh-var(--mr-usp-height))] w-full overflow-hidden"
    >
      <div
        className="flex h-full w-full transition-transform duration-700"
        style={{
          transform: `translateX(-${index * 100}%)`,
          transitionTimingFunction: "var(--mr-ease-out-quart)",
        }}
      >
        {slides.map((slide, i) => (
          <MediaFrame
            key={i}
            media={slide.media}
            className="h-full w-full shrink-0"
          />
        ))}
      </div>

      <div className="mr-label mr-invert absolute bottom-[60px] left-[var(--mr-site-padding)] z-[1] leading-[16.5px] max-md:bottom-[42px]">
        <p className="whitespace-pre-line">{active.label.left}</p>
        {active.showCountdown ? (
          <p>
            <Countdown />
          </p>
        ) : active.label.right ? (
          <Link href={active.label.href ?? "#notify"} className="mr-link">
            {active.label.right}
          </Link>
        ) : null}
      </div>

      {/* Desktop: `1 / 5` counter, three spans with a 3px gap */}
      <div className="mr-label mr-invert absolute bottom-[60px] right-[112px] z-[1] flex items-center gap-[3px] max-md:hidden">
        <span>{index + 1}</span>
        <span>/</span>
        <span>{slides.length}</span>
      </div>

      <div className="mr-invert absolute bottom-[60px] right-[var(--mr-site-padding)] z-[1] flex h-[18px] w-[29px] items-center justify-between max-md:hidden">
        <button type="button" aria-label="이전 슬라이드" onClick={() => go(-1)}>
          <ArrowIcon direction="left" />
        </button>
        <button type="button" aria-label="다음 슬라이드" onClick={() => go(1)}>
          <ArrowIcon direction="right" />
        </button>
      </div>

      {/* Mobile: five 12 × 1px progress bars */}
      <div className="mr-invert absolute bottom-[42px] right-[var(--mr-site-padding)] z-[1] hidden items-center justify-center gap-[4px] max-md:flex">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`슬라이드 ${i + 1}`}
            onClick={() => setIndex(i)}
            className="h-px w-[12px] bg-white"
            style={{ opacity: i === index ? 1 : 0.4 }}
          />
        ))}
      </div>
    </section>
  );
}

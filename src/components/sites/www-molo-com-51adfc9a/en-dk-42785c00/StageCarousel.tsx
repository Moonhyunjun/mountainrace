"use client";

import { useRef } from "react";
import { cn } from "@/lib/utils";
import { MediaFrame } from "./MediaFrame";
import type { StageCardData } from "@/types/mountain-race";

/** One card plus one 80px gap — matches the live site's step distance. */
const STEP = 350;

/**
 * Molo's product carousel. Verified click-driven, **not** scroll-driven:
 * scrolling past the section changes nothing; only `PREVIOUS` / `NEXT`
 * move the row. Cards reuse the 7/10 product geometry.
 */
export function StageCarousel({
  id,
  heading,
  cards,
  last = false,
}: {
  id?: string;
  heading: string;
  cards: StageCardData[];
  last?: boolean;
}) {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollBy = (delta: number) =>
    trackRef.current?.scrollBy({ left: delta, behavior: "smooth" });

  return (
    <section
      id={id}
      className={cn(
        "w-full px-[var(--mr-site-padding)]",
        !last && "mb-[var(--mr-module-gap)]",
      )}
    >
      <div className="mr-label mb-[24px] flex items-center justify-between text-[var(--mr-black)]">
        <span>{heading}</span>
        <span className="flex gap-[24px]">
          <button type="button" className="mr-link" onClick={() => scrollBy(-STEP)}>
            previous
          </button>
          <button type="button" className="mr-link" onClick={() => scrollBy(STEP)}>
            next
          </button>
        </span>
      </div>

      <div
        ref={trackRef}
        className="mr-noscrollbar flex gap-[var(--mr-grid-gap)] overflow-x-auto scroll-smooth"
      >
        {cards.map((card) => (
          <article
            key={card.name}
            className="flex w-[270px] shrink-0 flex-col max-lg:w-[240px] max-md:w-[62vw]"
          >
            <MediaFrame media={card.media} className="aspect-[7/10] w-full" />
            <p className="mr-label mt-[12px] text-[var(--mr-black)]">
              {card.name}
            </p>
            <p
              className={cn(
                "mr-label",
                card.current
                  ? "text-[var(--mr-main)]"
                  : "text-[var(--mr-black)]",
              )}
            >
              {card.value}
            </p>
            {card.chips.length > 0 && (
              <div className="mr-label mt-[6px] flex flex-wrap gap-[8px] text-[var(--mr-dark-gray)]">
                {card.chips.map((chip) => (
                  <span key={chip}>{chip}</span>
                ))}
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}

import { MediaFrame } from "./MediaFrame";
import type { SpecCardData } from "@/types/mountain-race";

/**
 * Molo's product card, re-pointed at race data.
 * Media is `--ratio-product` (7 / 10, measured 270 × 386); name, value
 * and chips are all mono 11px / 15.4px / -0.11px uppercase, with the
 * chips at `rgb(69, 69, 69)`.
 */
export function SpecCard({ card }: { card: SpecCardData }) {
  return (
    <article className="flex flex-col">
      <MediaFrame media={card.media} className="aspect-[7/10] w-full" />
      <p className="mr-label mt-[12px] text-[var(--mr-black)]">{card.name}</p>
      <p className="mr-label text-[var(--mr-black)]">{card.value}</p>
      {card.chips.length > 0 && (
        <div className="mr-label mt-[6px] flex flex-wrap gap-[8px] text-[var(--mr-dark-gray)]">
          {card.chips.map((chip) => (
            <span key={chip}>{chip}</span>
          ))}
        </div>
      )}
    </article>
  );
}

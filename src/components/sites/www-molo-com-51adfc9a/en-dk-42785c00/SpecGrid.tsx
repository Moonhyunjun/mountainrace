import { cn } from "@/lib/utils";
import { SpecCard } from "./SpecCard";
import type { SpecCardData } from "@/types/mountain-race";

/**
 * Molo's 4-up product grid: `repeat(4, 270px)` with an 80px column gap
 * inside the 60px gutter, collapsing to 2 columns below 1024px.
 */
export function SpecGrid({
  id,
  cards,
  last = false,
}: {
  id?: string;
  cards: SpecCardData[];
  last?: boolean;
}) {
  return (
    <section
      id={id}
      className={cn(
        "w-full px-[var(--mr-site-padding)]",
        !last && "mb-[var(--mr-module-gap)]",
      )}
    >
      <div className="grid grid-cols-4 gap-x-[var(--mr-grid-gap)] max-lg:grid-cols-2 max-lg:gap-y-[40px]">
        {cards.map((card) => (
          <SpecCard key={card.name} card={card} />
        ))}
      </div>
    </section>
  );
}

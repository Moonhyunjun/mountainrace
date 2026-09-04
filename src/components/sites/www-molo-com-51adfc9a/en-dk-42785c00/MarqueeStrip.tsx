import { cn } from "@/lib/utils";
import { MediaFrame } from "./MediaFrame";
import type { MediaSlot } from "@/types/mountain-race";

/**
 * Headline plus an infinite horizontal train — molo.com section 12,
 * measured at 20 items of 160 × 396 running continuously. Same doubled
 * track as the announcement bar, so `prefers-reduced-motion` stops both.
 */
export function MarqueeStrip({
  id,
  headline,
  items,
  last = false,
}: {
  id?: string;
  headline: string;
  items: MediaSlot[];
  last?: boolean;
}) {
  const train = (
    <div className="flex shrink-0">
      {items.map((item, i) => (
        <div key={i} className="flex shrink-0 flex-col px-[8px]">
          <MediaFrame
            media={item}
            className="h-[396px] w-[160px] max-lg:h-[322px] max-lg:w-[130px] max-md:h-[268px] max-md:w-[108px]"
          />
          <span className="mr-label mt-[12px] text-[var(--mr-dark-gray)]">
            {item.caption}
          </span>
        </div>
      ))}
    </div>
  );

  return (
    <section
      id={id}
      className={cn("w-full", !last && "mb-[var(--mr-module-gap)]")}
    >
      <h2
        className={cn(
          "mb-[96px] max-w-[44%] break-keep px-[var(--mr-site-padding)] font-[family-name:var(--mr-font-display)] text-[40px] font-medium leading-[40px] tracking-[-0.8px] text-[var(--mr-black)]",
          "max-lg:max-w-[72%] max-lg:text-[32px] max-lg:leading-[32px]",
          "max-md:mb-[48px] max-md:max-w-full max-md:text-[24px] max-md:leading-[26px]",
        )}
      >
        {headline}
      </h2>
      <div className="flex w-full overflow-hidden">
        <div
          className="mr-marquee flex w-max"
          style={{ "--mr-marquee-duration": "80s" } as React.CSSProperties}
        >
          {train}
          {train}
        </div>
      </div>
    </section>
  );
}

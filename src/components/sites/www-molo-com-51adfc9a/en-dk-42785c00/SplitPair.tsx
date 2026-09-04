import { cn } from "@/lib/utils";
import Link from "next/link";
import { MediaFrame } from "./MediaFrame";
import type { SplitPanel } from "@/types/mountain-race";

interface SplitPairProps {
  id?: string;
  panels: [SplitPanel, SplitPanel];
  last?: boolean;
}

/**
 * Two 720 × 900 panels edge to edge with **zero gutter** — measured on
 * molo.com sections 4, 10 and 13. Each panel carries its own mono label
 * at `bottom: 60px`, the left one at the left gutter and the right one
 * flush to the right gutter, both on `mix-blend-mode: difference`.
 */
export function SplitPair({ id, panels, last = false }: SplitPairProps) {
  return (
    <section
      id={id}
      className={cn(
        "grid h-[900px] w-full grid-cols-2 gap-0 max-lg:h-[620px] max-md:h-auto max-md:grid-cols-1",
        !last && "mb-[var(--mr-module-gap)]",
      )}
    >
      {panels.map((panel, i) => (
        <div key={i} className="relative h-full max-md:h-[480px]">
          <MediaFrame media={panel.media} className="h-full w-full" />
          <div
            className={cn(
              "mr-label mr-invert absolute bottom-[60px] z-[1] leading-[16.5px] max-md:bottom-[24px]",
              i === 0
                ? "left-[var(--mr-site-padding)]"
                : "right-[var(--mr-site-padding)] text-right",
            )}
          >
            {panel.href ? (
              <Link href={panel.href} className="mr-link">
                {panel.label}
              </Link>
            ) : (
              panel.label
            )}
          </div>
        </div>
      ))}
    </section>
  );
}

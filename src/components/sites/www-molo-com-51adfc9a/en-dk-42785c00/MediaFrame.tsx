import { cn } from "@/lib/utils";
import type { MediaSlot } from "@/types/mountain-race";

interface MediaFrameProps {
  media: MediaSlot;
  className?: string;
}

/**
 * Every media slot on the page goes through this component, so a real
 * photograph replaces a placeholder by setting `media.src` — the geometry
 * never changes.
 *
 * The empty state is deliberately **unpainted**: molo.com's header and
 * overlay labels ride on `mix-blend-mode: difference`, which blends against
 * whatever is painted inside the root stacking context. The page's own
 * background propagates to the canvas and is therefore excluded, which is
 * why those labels read black over the bare page and invert to white over
 * photography. A filled placeholder plate would enter that backdrop and
 * wash every label to mid-grey, so the empty slot is drawn as a hairline
 * outline instead. Once `src` is set the image paints normally and the
 * inversion behaves exactly as it does on the original.
 */
export function MediaFrame({ media, className }: MediaFrameProps) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      {media.src ? (
        // eslint-disable-next-line @next/next/no-img-element -- plain <img> keeps the cloned object-fit geometry exact
        <img
          src={media.src}
          alt={media.alt}
          className="block h-full w-full object-cover"
        />
      ) : (
        <>
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 border border-[var(--mr-light-gray)]"
          />
          <span className="mr-label absolute inset-0 flex items-center justify-center px-4 text-center text-[var(--mr-placeholder)]">
            {media.caption}
          </span>
        </>
      )}
    </div>
  );
}

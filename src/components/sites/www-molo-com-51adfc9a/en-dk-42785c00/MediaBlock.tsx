import { cn } from "@/lib/utils";
import { LabelRow } from "./LabelRow";
import { MediaFrame } from "./MediaFrame";
import type { MediaSlot, OverlayLabel } from "@/types/mountain-race";

type Variant = "portrait" | "landscape" | "bleed";

interface MediaBlockProps {
  id?: string;
  media: MediaSlot;
  label: OverlayLabel;
  variant?: Variant;
  last?: boolean;
}

/**
 * The single-media module. Measured on molo.com at 1440 × 900:
 * the section is a 900px band on `rgb(251,251,251)` with the media
 * optically centred and the mono label row pinned to its top edge.
 *
 * portrait 430 × 614 · landscape 780 × 546 · bleed 1440 × 900.
 */
const MEDIA_SIZE: Record<Variant, string> = {
  portrait: "h-[614px] w-[430px] max-lg:h-[486px] max-lg:w-[340px] max-md:h-[calc(78vw*1.43)] max-md:w-[78vw]",
  landscape: "h-[546px] w-[780px] max-lg:h-[454px] max-lg:w-[648px] max-md:h-[calc(100vw*0.7)] max-md:w-full",
  bleed: "h-full w-full",
};

export function MediaBlock({
  id,
  media,
  label,
  variant = "portrait",
  last = false,
}: MediaBlockProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative flex h-[900px] w-full flex-col items-center justify-center bg-[var(--mr-white)]",
        "max-lg:h-[720px] max-md:h-[70svh]",
        !last && "mb-[var(--mr-module-gap)]",
      )}
    >
      <MediaFrame media={media} className={MEDIA_SIZE[variant]} />
      <LabelRow label={label} variant="top" />
    </section>
  );
}

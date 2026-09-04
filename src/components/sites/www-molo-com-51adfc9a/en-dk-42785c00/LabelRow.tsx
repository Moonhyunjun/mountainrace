import Link from "next/link";
import { cn } from "@/lib/utils";
import type { OverlayLabel } from "@/types/mountain-race";

interface LabelRowProps {
  label: OverlayLabel;
  /** `top` pins the row to the section's top edge, `bottom` sits 60px above its foot. */
  variant?: "top" | "bottom";
  className?: string;
}

/**
 * The mono label row that overlays every media module.
 *
 * Measured on `.stickyText`: absolute, left/right at `--site-padding`,
 * `justify-content: space-between`, 16.5px tall, white text on
 * `mix-blend-mode: difference` so it inverts over dark media by itself.
 */
export function LabelRow({ label, variant = "top", className }: LabelRowProps) {
  const right = label.right ? (
    label.href ? (
      <Link href={label.href} className="mr-link whitespace-pre-line text-right">
        {label.right}
      </Link>
    ) : (
      <p className="whitespace-pre-line text-right">{label.right}</p>
    )
  ) : (
    <span />
  );

  return (
    <div
      className={cn(
        "mr-label mr-invert absolute z-[1] flex items-center justify-between",
        "left-[var(--mr-site-padding)] right-[var(--mr-site-padding)]",
        variant === "top" ? "top-0" : "bottom-[60px] max-md:bottom-[32px]",
        "leading-[16.5px]",
        className,
      )}
    >
      <p className="whitespace-pre-line">{label.left}</p>
      {right}
    </div>
  );
}

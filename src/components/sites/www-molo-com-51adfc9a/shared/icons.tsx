/**
 * SVG icons extracted verbatim from molo.com/en-DK.
 * Paths, viewBoxes and stroke widths are the originals; `currentColor`
 * replaces the hard-coded `#181818` so the icons ride the same
 * mix-blend-mode inversion as the labels around them.
 */

type IconProps = React.SVGProps<SVGSVGElement>;

/** 9 × 9 close cross — USP banner dismiss button. */
export function CloseIcon(props: IconProps) {
  return (
    <svg
      width="9"
      height="9"
      viewBox="0 0 9 9"
      fill="none"
      aria-hidden="true"
      {...props}
    >
      <path d="M8.2832 0.28125L0.283203 8.28125" stroke="currentColor" strokeWidth="0.8" />
      <path d="M0.283203 0.28125L8.2832 8.28125" stroke="currentColor" strokeWidth="0.8" />
    </svg>
  );
}

/** 9 × 8 arrow — carousel controls and inline links. Points right by default. */
export function ArrowIcon({ direction = "right", ...props }: IconProps & { direction?: "left" | "right" }) {
  return (
    <svg
      width="9"
      height="8"
      viewBox="0 0 9 8"
      fill="none"
      aria-hidden="true"
      style={direction === "left" ? { transform: "rotate(180deg)" } : undefined}
      {...props}
    >
      <path
        d="M4.61816 0.105469L8.13672 3.60547L8.17285 3.64062L8.13672 3.67578L4.61816 7.17578L4.58301 7.21094L4.54785 7.17578L4.09473 6.72461L4.05859 6.68945L4.09473 6.6543L6.74414 4.01855H0.0517578V3.2627H6.74414L4.09473 0.626953L4.05859 0.591797L4.09473 0.556641L4.54785 0.105469L4.58301 0.0703125L4.61816 0.105469Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="0.1"
      />
    </svg>
  );
}

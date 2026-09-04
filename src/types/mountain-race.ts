/** Content contracts for the WONJU MOUNTAIN RACE page. */

/** A slot that will hold a photograph once real race imagery exists. */
export interface MediaSlot {
  /** Path under `public/sites/…`; when absent a placeholder plate renders. */
  src?: string;
  alt: string;
  /** Mono caption shown while the slot is empty. */
  caption: string;
}

/** The two-part mono label that overlays every media module. */
export interface OverlayLabel {
  /** Left-hand text. Newlines render as line breaks. */
  left: string;
  /** Right-hand text, right-aligned. */
  right?: string;
  href?: string;
}

export interface HeroSlide {
  media: MediaSlot;
  label: OverlayLabel;
  /** Slide 1 shows the live 2027 countdown in place of the label's second line. */
  showCountdown?: boolean;
}

/** One cell of the 4-up grid (Molo's product card). */
export interface SpecCardData {
  name: string;
  value: string;
  chips: string[];
  media: MediaSlot;
}

export interface StageCardData extends SpecCardData {
  /** Marks the stage the race is currently in. */
  current?: boolean;
}

export interface SplitPanel {
  media: MediaSlot;
  label: string;
  href?: string;
}

export interface FooterColumn {
  heading: string;
  links: { label: string; href: string }[];
}

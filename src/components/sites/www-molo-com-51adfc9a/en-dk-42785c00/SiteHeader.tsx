"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const LEFT_NAV = [
  { label: "2027 대회", href: "#hero" },
  { label: "2026 기록", href: "#recap" },
  { label: "코스", href: "#courses" },
  { label: "장소", href: "#venue" },
];

const RIGHT_NAV = [
  { label: "일정", href: "#roadmap" },
  {
    label: "Instagram",
    href: "https://www.instagram.com/mountainrace.official/",
  },
  { label: "사전알림", href: "#notify" },
];

/** Scroll past the hero before the header shrinks (measured: 88 → 56 by scrollY 600). */
const SHRINK_AT = 600;

interface SiteHeaderProps {
  /** Sits below the announcement bar while it is on screen. */
  offset: number;
}

/**
 * Fixed header cloned from molo.com: a three-column grid
 * (`1fr auto 1fr`, 24px column gap) inside a 60px gutter, shrinking
 * 88px → 56px on `transition: height 0.3s` and nothing else.
 *
 * The nav items are painted white and the whole header runs
 * `mix-blend-mode: difference` — measured on the live site's nav buttons,
 * `color: rgb(255,255,255)`. Against the pale page that resolves to near
 * black; over dark photography it inverts to white. It is not a JS colour
 * swap, and the text must stay white for the maths to work.
 */
export function SiteHeader({ offset }: SiteHeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SHRINK_AT);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        style={{
          top: offset,
          height: scrolled
            ? "var(--mr-header-height-scrolled)"
            : "var(--mr-header-height)",
        }}
        className={cn(
          "fixed inset-x-0 z-50 grid grid-cols-[1fr_auto_1fr] items-center gap-x-[24px]",
          "px-[var(--mr-site-padding)] text-white mix-blend-difference",
          "transition-[height] duration-300",
        )}
      >
        <nav className="mr-label flex h-full items-center gap-[24px] max-md:hidden">
          {LEFT_NAV.map((item) => (
            <Link key={item.href} href={item.href} className="mr-link">
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          aria-expanded={menuOpen}
          aria-label="메뉴 열기"
          onClick={() => setMenuOpen((v) => !v)}
          className="mr-label hidden h-full items-center max-md:flex"
        >
          {menuOpen ? "close" : "menu"}
        </button>

        <div className="flex h-full items-center justify-center">
          <Link
            href="#hero"
            className="font-[family-name:var(--mr-font-display)] text-[22px] font-semibold leading-none tracking-[-0.9px] max-md:text-[16px]"
          >
            MOUNTAIN RACE
          </Link>
        </div>

        <nav className="mr-label flex h-full items-center justify-end gap-[24px] max-md:hidden">
          {RIGHT_NAV.map((item) => (
            <Link key={item.href} href={item.href} className="mr-link">
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href="#notify"
          className="mr-label hidden h-full items-center justify-end max-md:flex"
        >
          사전알림
        </Link>
      </header>

      {menuOpen && (
        <div
          style={{ top: offset + 56 }}
          className="fixed inset-x-0 bottom-0 z-40 hidden flex-col gap-[18px] bg-[var(--mr-white)] px-[var(--mr-site-padding)] pt-[32px] max-md:flex"
        >
          {[...LEFT_NAV, ...RIGHT_NAV].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="font-[family-name:var(--mr-font-text)] text-[18px] uppercase tracking-[-0.36px]"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </>
  );
}

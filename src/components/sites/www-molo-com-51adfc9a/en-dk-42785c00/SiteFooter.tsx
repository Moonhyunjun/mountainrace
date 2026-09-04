import Link from "next/link";
import { NotifyForm } from "./NotifyForm";
import type { FooterColumn } from "@/types/mountain-race";

const COLUMNS: FooterColumn[] = [
  {
    heading: "대회 안내",
    links: [
      { label: "2027 대회", href: "#hero" },
      { label: "2026 기록", href: "#recap" },
      { label: "코스", href: "#courses" },
      { label: "장소", href: "#venue" },
      { label: "일정", href: "#roadmap" },
    ],
  },
  {
    heading: "참가 안내",
    links: [
      { label: "참가 자격", href: "#courses" },
      { label: "사전알림 신청", href: "#notify" },
      { label: "자주 묻는 질문", href: "#notify" },
      { label: "문의하기", href: "#notify" },
    ],
  },
  {
    heading: "Follow us",
    links: [
      {
        label: "Instagram",
        href: "https://www.instagram.com/mountainrace.official/",
      },
    ],
  },
];

/**
 * Footer cloned from molo.com: `rgb(72,163,220)` ground,
 * `padding: 37px 60px 56px`, a `270px × 4` grid on an 80px column gap,
 * every link mono 11px uppercase, and the oversized wordmark bottom-right.
 */
export function SiteFooter() {
  return (
    <footer
      id="notify"
      className="mr-label bg-[var(--mr-blue)] px-[var(--mr-site-padding)] pb-[56px] pt-[37px] text-[var(--mr-black)] max-md:pb-[40px] max-md:pt-[32px]"
    >
      <div className="grid grid-cols-4 gap-x-[var(--mr-grid-gap)] max-lg:grid-cols-2 max-lg:gap-y-[40px] max-md:grid-cols-1 max-md:gap-y-[32px]">
        {COLUMNS.map((column) => (
          <div key={column.heading} className="flex flex-col gap-[6px]">
            <p className="mb-[6px] underline underline-offset-[3px]">
              {column.heading}
            </p>
            {column.links.map((link) => (
              <Link key={link.label} href={link.href} className="mr-link">
                {link.label}
              </Link>
            ))}
          </div>
        ))}

        <div className="flex flex-col gap-[24px]">
          <p className="break-keep uppercase">
            2027 대회 일정과 얼리버드 접수 오픈 소식을 이메일로 가장 먼저
            보내드립니다.
          </p>
          <NotifyForm />
        </div>
      </div>

      <div className="mt-[88px] grid grid-cols-4 items-end gap-x-[var(--mr-grid-gap)] max-lg:grid-cols-2 max-lg:gap-y-[32px] max-md:mt-[48px] max-md:grid-cols-1">
        <div className="flex flex-col gap-[6px]">
          <span>KO / KRW</span>
          <span className="text-[var(--mr-inactive)]">
            © 2026 MOUNTAIN RACE
          </span>
        </div>
        <div className="flex flex-col gap-[6px]">
          <span>강원특별자치도 원주시 · 피노키오숲 일원</span>
          <Link
            href="https://www.instagram.com/mountainrace.official/"
            className="mr-link"
          >
            @mountainrace.official
          </Link>
        </div>
        <div className="col-span-2 flex justify-end max-lg:col-span-2 max-md:col-span-1 max-md:justify-start">
          <span className="font-[family-name:var(--mr-font-display)] text-[100px] font-semibold leading-[0.82] tracking-[-4px] max-lg:text-[64px] max-lg:tracking-[-2.5px] max-md:text-[40px] max-md:tracking-[-1.5px]">
            MOUNTAIN
            <br />
            RACE
          </span>
        </div>
      </div>
    </footer>
  );
}

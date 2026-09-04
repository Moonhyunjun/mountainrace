/**
 * WONJU MOUNTAIN RACE content, taken verbatim from the repository's
 * existing static site (`index.html`, `README.md`).
 *
 * 2026 figures (6/21 개최, 800여 명 참가, 35K 35.92km / +1,962m /
 * 제한 8시간 / 보급소 3개소 / ITRA 2포인트) come from the published race
 * results and ITRA registration. Everything dated 2027 is marked 예정 and
 * changes when the date is fixed — see `Countdown.tsx` for the date constant.
 */
import type {
  HeroSlide,
  MediaSlot,
  SpecCardData,
  SplitPanel,
  StageCardData,
} from "@/types/mountain-race";

/** Media slots are empty until real race photography lands in `public/sites/…`. */
const slot = (caption: string, alt: string): MediaSlot => ({ caption, alt });

export const HERO_SLIDES: HeroSlide[] = [
  {
    media: slot("2027 티저", "2027 원주 마운틴 레이스 티저"),
    label: { left: "2027 WONJU MOUNTAIN RACE" },
    showCountdown: true,
  },
  {
    media: slot("2026 리캡", "2026 대회 현장"),
    label: { left: "2026 RECAP\n800여 명의 러너", right: "기록 보기", href: "#recap" },
  },
  {
    media: slot("35K 코스", "35K 능선 구간"),
    label: { left: "35K · ITRA 2 POINTS\n+1,962M", right: "코스 보기", href: "#courses" },
  },
  {
    media: slot("15K 코스", "15K 트레일 구간"),
    label: { left: "15K · TRAIL START\n첫 트레일 도전", right: "코스 보기", href: "#courses" },
  },
  {
    media: slot("ROAD TO 2027", "2027 로드맵"),
    label: { left: "ROAD TO 2027\n일정 확정 시 공지", right: "사전알림 신청", href: "#notify" },
  },
];

export const RECAP_STATS: SpecCardData[] = [
  {
    name: "참가 러너",
    value: "800+",
    chips: ["2026.06.21"],
    media: slot("START LINE", "출발선의 러너들"),
  },
  {
    name: "코스",
    value: "2",
    chips: ["15K", "35K"],
    media: slot("COURSE MAP", "코스 지도"),
  },
  {
    name: "35K 누적 상승",
    value: "+1,962 M",
    chips: ["ITRA 2 POINTS"],
    media: slot("RIDGE", "능선 구간"),
  },
  {
    name: "제한 시간",
    value: "8 시간",
    chips: ["보급소 3개소"],
    media: slot("CHECKPOINT", "보급소"),
  },
];

export const COURSE_SPECS: SpecCardData[] = [
  {
    name: "거리",
    value: "35.92 KM",
    chips: ["ITRA 인증"],
    media: slot("35K", "35K 코스"),
  },
  {
    name: "누적 상승",
    value: "+1,962 M",
    chips: ["능선 구간"],
    media: slot("ELEVATION", "누적 상승 구간"),
  },
  {
    name: "제한 시간",
    value: "8 시간",
    chips: ["컷오프 운영"],
    media: slot("CUT-OFF", "컷오프 지점"),
  },
  {
    name: "보급소",
    value: "3 개소",
    chips: ["급수 · 급식"],
    media: slot("AID STATION", "보급소"),
  },
];

export const ROADMAP: StageCardData[] = [
  {
    name: "사전알림 접수 중",
    value: "NOW",
    chips: ["일정·접수 오픈 소식을 먼저"],
    media: slot("NOW", "사전알림 접수"),
    current: true,
  },
  {
    name: "대회 일정 · 코스 공개",
    value: "일정 확정 시",
    chips: ["2027 개최일 · 코스 상세"],
    media: slot("ANNOUNCE", "일정 공개"),
  },
  {
    name: "얼리버드 → 일반 접수",
    value: "접수 오픈",
    chips: ["사전알림 신청자 우선 안내"],
    media: slot("ENTRY", "접수 오픈"),
  },
  {
    name: "RACE DAY",
    value: "2027년 6월 (예정)",
    chips: ["원주의 숲에서, 다시 출발선에"],
    media: slot("RACE DAY", "레이스 데이"),
  },
];

export const GALLERY_ONE: [SplitPanel, SplitPanel] = [
  { media: slot("START LINE", "출발선"), label: "START LINE" },
  { media: slot("RIDGE TRAIL", "능선 트레일"), label: "RIDGE TRAIL" },
];

export const GALLERY_TWO: [SplitPanel, SplitPanel] = [
  { media: slot("FINISH", "피니시 라인"), label: "FINISH" },
  { media: slot("COMMUNITY", "러너 커뮤니티"), label: "COMMUNITY" },
];

export const COURSE_PAIR: [SplitPanel, SplitPanel] = [
  {
    media: slot("15K", "15K 코스"),
    label: "15K · TRAIL START",
    href: "#courses",
  },
  {
    media: slot("35K", "35K 코스"),
    label: "35K · ITRA 2 POINTS",
    href: "#courses",
  },
];

export const CHECKPOINTS: MediaSlot[] = [
  "START",
  "산악자전거파크",
  "CP1",
  "싱글트랙",
  "능선 구간",
  "CP2",
  "피노키오숲",
  "임도",
  "CP3",
  "FINISH",
].map((name) => slot(name, `${name} 구간`));

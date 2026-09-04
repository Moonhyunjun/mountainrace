import {
  CHECKPOINTS,
  COURSE_PAIR,
  COURSE_SPECS,
  GALLERY_ONE,
  GALLERY_TWO,
  HERO_SLIDES,
  RECAP_STATS,
  ROADMAP,
} from "@/components/sites/www-molo-com-51adfc9a/en-dk-42785c00/content";
import { HeroCarousel } from "@/components/sites/www-molo-com-51adfc9a/en-dk-42785c00/HeroCarousel";
import { MarqueeStrip } from "@/components/sites/www-molo-com-51adfc9a/en-dk-42785c00/MarqueeStrip";
import { MediaBlock } from "@/components/sites/www-molo-com-51adfc9a/en-dk-42785c00/MediaBlock";
import { SiteChrome } from "@/components/sites/www-molo-com-51adfc9a/en-dk-42785c00/SiteChrome";
import { SiteFooter } from "@/components/sites/www-molo-com-51adfc9a/en-dk-42785c00/SiteFooter";
import { SpecGrid } from "@/components/sites/www-molo-com-51adfc9a/en-dk-42785c00/SpecGrid";
import { SplitPair } from "@/components/sites/www-molo-com-51adfc9a/en-dk-42785c00/SplitPair";
import { StageCarousel } from "@/components/sites/www-molo-com-51adfc9a/en-dk-42785c00/StageCarousel";
import { Statement } from "@/components/sites/www-molo-com-51adfc9a/en-dk-42785c00/Statement";

/**
 * WONJU MOUNTAIN RACE, built on the module vocabulary reverse-engineered
 * from molo.com/en-DK. Section order, heights and the 156px module gap
 * follow `docs/research/www-molo-com-51adfc9a/en-dk-42785c00/PAGE_TOPOLOGY.md`.
 */
export default function Home() {
  return (
    <>
      <SiteChrome />
      <main className="pt-[var(--mr-usp-height)]">
        <HeroCarousel slides={HERO_SLIDES} />

        <MediaBlock
          id="recap"
          variant="portrait"
          media={{ caption: "2026 RECAP", alt: "2026 대회 현장" }}
          label={{ left: "2026 RECAP", right: "기록 보기", href: "#recap" }}
        />

        <SpecGrid cards={RECAP_STATS} />

        <Statement>
          원주의 능선 위에서 다시 만납니다. 2026년, 800여 명의 러너가 완성한
          레이스 — 그 다음 이야기가 시작됩니다.
        </Statement>

        <SplitPair panels={GALLERY_ONE} />

        <SpecGrid id="courses" cards={COURSE_SPECS} />

        <Statement>
          숲길과 능선, 싱글 트랙이 어우러진 트레일러닝 최적의 무대. 강원특별자치도
          원주시 피노키오숲과 원주산악자전거파크 일원에서 열립니다.
        </Statement>

        <MediaBlock
          id="venue"
          variant="bleed"
          media={{ caption: "VENUE · 피노키오숲", alt: "피노키오숲 트레일" }}
          label={{ left: "VENUE\n피노키오숲", right: "장소 안내", href: "#venue" }}
        />

        <StageCarousel id="roadmap" heading="Road to 2027" cards={ROADMAP} />

        <MediaBlock
          variant="landscape"
          media={{ caption: "원주산악자전거파크", alt: "원주산악자전거파크" }}
          label={{ left: "원주산악자전거파크", right: "코스 보기", href: "#courses" }}
        />

        <SplitPair panels={GALLERY_TWO} />

        <MediaBlock
          variant="portrait"
          media={{ caption: "ROAD TO 2027", alt: "2027 대회 사전알림" }}
          label={{ left: "ROAD TO 2027", right: "사전알림 신청", href: "#notify" }}
        />

        <MarqueeStrip
          headline="원주의 숲과 능선을 잇는 35.92km. 구간마다 다른 얼굴을 만납니다."
          items={CHECKPOINTS}
        />

        <SplitPair panels={COURSE_PAIR} last />
      </main>
      <SiteFooter />
    </>
  );
}

"use client";

import { useState } from "react";
import { SiteHeader } from "./SiteHeader";
import { UspMarquee } from "./UspMarquee";

/**
 * Holds the one piece of shared state between the two fixed overlays:
 * dismissing the announcement bar drops the header from `top: 32px`
 * to `top: 0`, exactly as on molo.com.
 */
export function SiteChrome() {
  const [uspVisible, setUspVisible] = useState(true);

  return (
    <>
      <UspMarquee onDismiss={() => setUspVisible(false)} />
      <SiteHeader offset={uspVisible ? 32 : 0} />
    </>
  );
}

import { cn } from "@/lib/utils";

/**
 * The oversized `display` paragraph. Measured on molo.com:
 * 40px set solid on a 40px line, `-0.8px` tracking, wrapping at ~44% of
 * the content width. No reveal animation — the original has none.
 */
export function Statement({
  children,
  last = false,
}: {
  children: React.ReactNode;
  last?: boolean;
}) {
  return (
    <section
      className={cn(
        "w-full px-[var(--mr-site-padding)]",
        !last && "mb-[var(--mr-module-gap)]",
      )}
    >
      <p
        className={cn(
          "max-w-[44%] break-keep font-[family-name:var(--mr-font-display)] text-[40px] font-medium leading-[40px] tracking-[-0.8px] text-[var(--mr-black)]",
          "max-lg:max-w-[72%] max-lg:text-[32px] max-lg:leading-[32px] max-lg:tracking-[-0.64px]",
          "max-md:max-w-full max-md:text-[24px] max-md:leading-[26px] max-md:tracking-[-0.48px]",
        )}
      >
        {children}
      </p>
    </section>
  );
}

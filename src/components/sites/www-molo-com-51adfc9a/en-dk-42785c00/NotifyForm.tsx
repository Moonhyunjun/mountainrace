"use client";

import { useState } from "react";
import Link from "next/link";

/**
 * The footer newsletter row from molo.com, re-pointed at 사전알림 신청:
 * a transparent input on a 1px `rgb(24,24,24)` underline with the submit
 * label sitting inside the same row, then a checkbox line beneath.
 *
 * Demo behaviour only — no network call, matching the current static
 * site. Point `action` at Stibee / Mailchimp / Google Forms when a
 * service is chosen.
 */
export function NotifyForm() {
  const [email, setEmail] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [done, setDone] = useState(false);

  if (done) {
    return (
      <p className="mr-label text-[var(--mr-black)]">
        신청이 접수되었습니다. 2027 소식으로 다시 인사드릴게요.
      </p>
    );
  }

  return (
    <form
      className="flex flex-col gap-[20px]"
      onSubmit={(e) => {
        e.preventDefault();
        if (!email || !agreed) return;
        setDone(true);
      }}
    >
      <div className="flex items-center justify-between border-b border-[var(--mr-black)] pb-[8px]">
        <label htmlFor="notify-email" className="sr-only">
          이메일 주소
        </label>
        <input
          id="notify-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="이메일 주소"
          className="mr-label w-full bg-transparent text-[var(--mr-black)] outline-none placeholder:text-[var(--mr-placeholder)]"
        />
        <button type="submit" className="mr-label mr-link shrink-0 pl-[16px]">
          사전알림 신청
        </button>
      </div>

      <label className="mr-label flex items-start gap-[10px] text-[var(--mr-black)]">
        <input
          type="checkbox"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
          className="mt-[1px] h-[13px] w-[13px] shrink-0 accent-[var(--mr-black)]"
        />
        <span>
          <Link href="#notify" className="underline underline-offset-[3px]">
            개인정보 수집·이용
          </Link>
          에 동의합니다
        </span>
      </label>
    </form>
  );
}

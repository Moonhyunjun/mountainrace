import type { Metadata } from "next";
import { IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

/**
 * molo.com sets every label in Simon Mono and declares IBM Plex Mono as
 * its own first fallback; the clone uses that fallback directly.
 */
const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "WONJU MOUNTAIN RACE — 2027 원주 마운틴 레이스",
  description:
    "대한민국 트레일러닝의 새로운 기준, 원주 마운틴 레이스. 2027 대회가 여러분을 기다립니다.",
  openGraph: {
    title: "WONJU MOUNTAIN RACE 2027",
    description:
      "원주의 능선을 달리는 프리미엄 트레일러닝 대회. 2027 시즌 COMING SOON.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${ibmPlexMono.variable} h-full antialiased`}>
      <body className="mr-page min-h-full">{children}</body>
    </html>
  );
}

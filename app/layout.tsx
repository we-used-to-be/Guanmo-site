import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://we-used-to-be.github.io/Guanmo-page/"),
  title: "观墨 Guanmo · Markdown 阅读体验",
  description: "一个让 Markdown 更易阅读、更易理解、更易创作的开源桌面应用。",
  alternates: { canonical: "./" },
  openGraph: {
    title: "观墨 Guanmo · Markdown 阅读体验",
    description: "一个让 Markdown 更易阅读、更易理解、更易创作的开源桌面应用。",
    url: "./",
    siteName: "观墨 Guanmo",
    locale: "zh_CN",
    type: "website",
    images: [{ url: "/assets/guanmo-main-warm.png", width: 2878, height: 1697, alt: "观墨暖色主题主界面" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "观墨 Guanmo · Markdown 阅读体验",
    description: "一个让 Markdown 更易阅读、更易理解、更易创作的开源桌面应用。",
    images: ["/assets/guanmo-main-warm.png"],
  },
  icons: { icon: "assets/guanmo-icon.png" },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ??
      "https://daito-manabe-research.vercel.app",
  ),
  title: "真锅大度研究档案｜Daito Manabe Research Archive",
  description:
    "从身体反馈到生命—机器社会：基于公开来源的真锅大度双语研究档案与作品索引。",
  openGraph: {
    title: "真锅大度｜Daito Manabe Research Archive",
    description:
      "从身体反馈到生命—机器社会：21 件代表作品、34 条公开来源与可追溯图片信用。",
    type: "website",
    locale: "zh_CN",
    alternateLocale: "en",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "真锅大度 Daito Manabe Research Archive",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "真锅大度｜Daito Manabe Research Archive",
    description: "从身体反馈到生命—机器社会。",
    images: ["/og.png"],
  },
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}

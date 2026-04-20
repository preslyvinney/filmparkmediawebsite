import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  metadataBase: new URL("https://filmparkmedia.com"),
  title: "Film Park Media",
  description:
    "Cinematic video production for brands, weddings, sports, and story-driven content.",
  openGraph: {
    title: "Film Park Media",
    description:
      "Cinematic video production for brands, weddings, sports, and story-driven content.",
    url: "https://filmparkmedia.com",
    siteName: "Film Park Media",
    images: [
      {
        url: "/filmpark-social-preview.jpg",
        width: 1200,
        height: 630,
        alt: "Film Park Media logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Film Park Media",
    description:
      "Cinematic video production for brands, weddings, sports, and story-driven content.",
    images: ["/filmpark-social-preview.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
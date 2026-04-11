import type { Metadata } from "next";
import { Inter, Poppins, Noto_Nastaliq_Urdu } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"],
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700", "800"],
});

const notoNastaliq = Noto_Nastaliq_Urdu({
  subsets: ["arabic"],
  variable: "--font-urdu",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://hiddenpak.com"),
  title: {
    default: "HiddenPak — Discover Pakistan's Hidden Gems",
    template: "%s | HiddenPak",
  },
  description:
    "Explore Pakistan's untouched valleys, forgotten villages, and breathtaking landscapes. Your ultimate guide to hidden places across Pakistan.",
  keywords: [
    "Pakistan travel",
    "hidden places Pakistan",
    "travel blog",
    "Pakistan tourism",
    "Hunza Valley",
    "Gilgit-Baltistan",
    "KPK travel",
    "پاکستان سیاحت",
    "پوشیدہ مقامات",
  ],
  authors: [{ name: "HiddenPak Team" }],
  creator: "HiddenPak",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://hiddenpak.com",
    siteName: "HiddenPak",
    title: "HiddenPak — Discover Pakistan's Hidden Gems",
    description:
      "Explore Pakistan's untouched valleys, forgotten villages, and breathtaking landscapes.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "HiddenPak — Discover Pakistan's Hidden Gems",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HiddenPak — Discover Pakistan's Hidden Gems",
    description:
      "Explore Pakistan's untouched valleys, forgotten villages, and breathtaking landscapes.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" dir="ltr" className="dark scroll-smooth">
      <body
        className={`${inter.variable} ${poppins.variable} ${notoNastaliq.variable} font-sans bg-dark text-beige antialiased`}
      >
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}

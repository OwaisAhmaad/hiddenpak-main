import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "HiddenPak - Discover Pakistan's Hidden Gems",
    template: "%s | HiddenPak",
  },
  description:
    "Travel deeper. Discover hidden beauty. Your gateway to Pakistan's most beautiful and hidden places — from majestic peaks to serene valleys, rich cultures, and timeless heritage.",
  keywords: [
    "Pakistan",
    "Travel Pakistan",
    "Hidden Gems Pakistan",
    "Pakistan Tourism",
    "Hunza Valley",
    "Fairy Meadows",
    "Skardu",
    "Gilgit-Baltistan",
    "Swat Valley",
    "Naran Kaghan",
    "Pakistan Travel Guide",
    "Tour Pakistan",
    "Explore Pakistan",
    "HiddenPak",
  ],
  authors: [{ name: "HiddenPak", url: "https://hiddenpak.com" }],
  creator: "HiddenPak",
  publisher: "HiddenPak",
  metadataBase: new URL("https://hiddenpak.com"),
  alternates: {
    canonical: "https://hiddenpak.com",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://hiddenpak.com",
    siteName: "HiddenPak",
    title: "HiddenPak - Discover Pakistan's Hidden Gems",
    description:
      "Travel deeper. Discover hidden beauty. Your gateway to Pakistan's most beautiful and hidden places.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1569383746724-6f1b882b8f46?w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "HiddenPak - Pakistan's Hidden Gems",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HiddenPak - Discover Pakistan's Hidden Gems",
    description:
      "Travel deeper. Discover hidden beauty. Your gateway to Pakistan's most beautiful and hidden places.",
    images: [
      "https://images.unsplash.com/photo-1569383746724-6f1b882b8f46?w=1200&q=80",
    ],
    creator: "@hiddenpak",
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
  icons: {
    icon: [
      { url: "/hiddenpak-logo.svg", type: "image/svg+xml" },
    ],
    shortcut: "/hiddenpak-logo.svg",
    apple: "/hiddenpak-logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="canonical" href="https://hiddenpak.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "TravelAgency",
              name: "HiddenPak",
              description:
                "Your gateway to Pakistan's most beautiful and hidden places — from majestic peaks to serene valleys.",
              url: "https://hiddenpak.com",
              logo: "https://hiddenpak.com/logo.png",
              sameAs: [
                "https://www.facebook.com/hiddenpak",
                "https://www.instagram.com/hiddenpak",
                "https://x.com/hiddenpak",
                "https://www.pinterest.com/hiddenpak",
                "https://www.youtube.com/@hiddenpak",
                "https://www.tiktok.com/@hiddenpak",
              ],
              address: {
                "@type": "PostalAddress",
                addressCountry: "PK",
              },
            }),
          }}
        />
      </head>
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}

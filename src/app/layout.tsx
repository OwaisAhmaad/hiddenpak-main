import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#14532D",
};

export const metadata: Metadata = {
  title: {
    default: "HiddenPak — Discover Pakistan's Hidden Gems",
    template: "%s | HiddenPak",
  },
  description:
    "Travel deeper. Discover hidden beauty. Your gateway to Pakistan's most beautiful hidden places — from majestic peaks and serene valleys to rich cultures and timeless heritage.",
  keywords: [
    "Pakistan travel",
    "hidden gems Pakistan",
    "Pakistan tourism",
    "Hunza Valley",
    "Fairy Meadows",
    "Skardu",
    "Gilgit-Baltistan",
    "Swat Valley",
    "Naran Kaghan",
    "Pakistan travel guide",
    "tour Pakistan",
    "northern Pakistan",
    "explore Pakistan",
    "HiddenPak",
    "Abbottabad tourism",
    "Karakoram Highway",
    "K2 base camp",
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
    title: "HiddenPak — Discover Pakistan's Hidden Gems",
    description:
      "Travel deeper. Discover hidden beauty. Your gateway to Pakistan's most beautiful hidden places — majestic peaks, serene valleys, rich cultures.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1569383746724-6f1b882b8f46?w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "HiddenPak — Pakistan's Hidden Gems",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@hiddenpak",
    creator: "@hiddenpak",
    title: "HiddenPak — Discover Pakistan's Hidden Gems",
    description:
      "Travel deeper. Your gateway to Pakistan's most beautiful hidden places.",
    images: [
      "https://images.unsplash.com/photo-1569383746724-6f1b882b8f46?w=1200&q=80",
    ],
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
    icon: [{ url: "/hiddenpak-logo.svg", type: "image/svg+xml" }],
    shortcut: "/hiddenpak-logo.svg",
    apple: "/hiddenpak-logo.svg",
  },
  category: "travel",
};

const schemaOrg = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "TravelAgency",
      "@id": "https://hiddenpak.com/#organization",
      name: "HiddenPak",
      description:
        "Your gateway to Pakistan's most beautiful and hidden places — from majestic peaks to serene valleys.",
      url: "https://hiddenpak.com",
      logo: {
        "@type": "ImageObject",
        url: "https://hiddenpak.com/hiddenpak-logo.svg",
      },
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+92-311-9142765",
        contactType: "customer service",
        availableLanguage: ["English", "Urdu"],
      },
      areaServed: {
        "@type": "Country",
        name: "Pakistan",
      },
      sameAs: [
        "https://www.facebook.com/hiddenpak",
        "https://www.instagram.com/hiddenpak",
        "https://x.com/hiddenpak",
        "https://www.pinterest.com/hiddenpak",
        "https://www.youtube.com/@hiddenpak",
        "https://www.tiktok.com/@hiddenpak",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://hiddenpak.com/#website",
      url: "https://hiddenpak.com",
      name: "HiddenPak",
      description: "Discover Pakistan's Hidden Gems",
      publisher: { "@id": "https://hiddenpak.com/#organization" },
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: "https://hiddenpak.com/?q={search_term_string}",
        },
        "query-input": "required name=search_term_string",
      },
    },
  ],
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
        {/* Preload hero background image for LCP */}
        <link
          rel="preload"
          as="image"
          href="/images/rectangle-39389.png"
          fetchPriority="high"
        />
        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="//images.unsplash.com" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
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

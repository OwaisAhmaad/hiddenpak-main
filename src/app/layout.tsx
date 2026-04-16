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
  title: "HiddenPak - Discover Pakistan's Hidden Gems",
  description: "Travel deeper. Discover hidden beauty. Your gateway to Pakistan's most beautiful and hidden places — from majestic peaks to serene valleys.",
  keywords: ["Pakistan", "Travel", "Hidden Gems", "Tourism", "Hunza", "Fairy Meadows", "Skardu", "Gilgit-Baltistan"],
  icons: {
    icon: "https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=32&q=80",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
        suppressHydrationWarning
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}

/**
 * HiddenPak — Centralized Site Configuration
 * Edit this file to update social links, contact info, and image specs.
 */

export const siteConfig = {
  name: "HiddenPak",
  tagline: "Discover Pakistan's Hidden Gems",
  url: "https://hiddenpak.com",
  description:
    "Explore Pakistan's untouched valleys, forgotten villages, and breathtaking landscapes.",

  /** ── Contact Info ────────────────────────────────── */
  contact: {
    email: "hello@hiddenpak.com",
    phone: "+92-300-0000000",
    address: "Islamabad, Pakistan",
    officeHours: "Mon–Fri, 9am–6pm PKT",
  },

  /** ── Social Media Links ──────────────────────────── *
   *  Replace "#" with your real profile URLs.
   */
  social: {
    facebook: "https://facebook.com/HiddenPak",
    instagram: "https://instagram.com/hiddenpak",
    twitter: "https://twitter.com/HiddenPak",
    youtube: "https://youtube.com/@HiddenPak",
    whatsapp: "https://wa.me/923000000000",
    tiktok: "https://tiktok.com/@hiddenpak",
  },

  /** ── Image Upload Specifications ────────────────── *
   *  Follow these when uploading via the admin panel.
   */
  imageSpecs: {
    coverImage: {
      width: 1200,
      height: 630,
      aspectRatio: "1.9:1",
      maxSizeMB: 2,
      formats: ["JPG", "PNG", "WEBP"],
      note: "Used as blog/place hero and Open Graph social preview",
    },
    galleryImage: {
      width: 800,
      height: 600,
      aspectRatio: "4:3",
      maxSizeMB: 3,
      formats: ["JPG", "PNG", "WEBP"],
      note: "Gallery grid images — portrait or landscape both work",
    },
    placeImage: {
      width: 1200,
      height: 800,
      aspectRatio: "3:2",
      maxSizeMB: 2,
      formats: ["JPG", "PNG", "WEBP"],
      note: "Place listing card and detail hero image",
    },
    logo: {
      width: 200,
      height: 200,
      aspectRatio: "1:1",
      maxSizeMB: 0.5,
      formats: ["PNG", "SVG"],
      note: "Square logo — PNG with transparent background preferred",
    },
  },
};

export type SiteConfig = typeof siteConfig;

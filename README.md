# 🏔️ HiddenPak Frontend — Discover Pakistan's Hidden Beauty

Frontend for the HiddenPak travel discovery platform showcasing Pakistan's most breathtaking hidden destinations. Built with Next.js 16, TypeScript, Tailwind CSS, and shadcn/ui.

> **Backend API**: [hiddenpak_main-api](https://github.com/OwaisAhmaad/hiddenpak_main-api)

---

## ✨ Features

### 🌍 Public Website
- **Home Page** — Hero section, featured destinations, recent blogs, gallery preview, testimonials
- **Places** — Browse destinations with category filtering
- **Blogs** — Travel stories & guides with category filters
- **Gallery** — Masonry-style photo gallery
- **About** — About HiddenPak mission
- **Contact** — Contact form with validation
- **Responsive Design** — Mobile-first, works on all screen sizes
- **SEO Optimized** — Metadata, Open Graph, sitemap, robots.txt, structured data

### 🔐 Admin Dashboard
- **Secure Login** — Email/password authentication
- **Dashboard Overview** — Stats, quick actions, recent activity
- **Blog Management** — Create, edit, delete blog posts
- **Places Management** — Add, edit, delete travel destinations
- **Gallery Management** — Upload, edit, delete gallery photos
- **Contact Messages** — View, mark as read, delete messages
- **Analytics** — Platform statistics
- **Settings** — Site name, tagline, contact info, social media links

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **Next.js 16** | React framework with App Router |
| **TypeScript** | Type-safe development |
| **Tailwind CSS 4** | Utility-first styling |
| **shadcn/ui** | UI component library |
| **Framer Motion** | Smooth animations |
| **Lucide Icons** | Beautiful icon set |

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** 18+
- Backend API running (see [hiddenpak_main-api](https://github.com/OwaisAhmaad/hiddenpak_main-api))

### Installation

```bash
# Clone the repository
git clone https://github.com/OwaisAhmaad/hiddenpak-main.git
cd hiddenpak-main

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
```

### Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

---

## 📁 Project Structure

```
src/
├── app/
│   ├── page.tsx              # Main application (public + admin)
│   ├── layout.tsx            # Root layout with SEO metadata
│   ├── globals.css           # Global styles
│   └── api/                  # API Routes (proxies to backend)
├── components/ui/            # shadcn/ui components
├── hooks/                    # Custom React hooks
└── lib/
    ├── utils.ts              # Utility functions
    └── ...
public/
├── images/                   # Static images
├── logo.svg                  # HiddenPak logo
└── robots.txt                # SEO robots.txt
```

---

## 🔗 Social Media

- **Facebook**: https://www.facebook.com/share/14ct5BjsmAk/
- **Instagram**: https://www.instagram.com/hiddenpak.official/
- **X (Twitter)**: https://x.com/HiddenPak
- **YouTube**: https://www.youtube.com/@HiddenPakOfficial
- **Pinterest**: https://www.pinterest.com/hiddenpakofficial/
- **TikTok**: @hiddenpak

---

## 🎨 Brand Identity

| Element | Value |
|---------|-------|
| **Primary Green** | `#14532D` / `#2E8B57` |
| **Accent Orange** | `#F97316` |
| **Background** | White / Light |

---

## 🔒 Admin Access

- **Email:** `admin@hiddenpak.com`
- **Password:** `admin123`

> ⚠️ Change the default password after first login in production!

---

## 🌐 Live Site

Visit [hiddenpak.com](http://hiddenpak.com/) for the live deployment.

---

## 📄 License

This project is proprietary. All rights reserved.

---

<p align="center">
  <strong>Travel deeper. Discover hidden beauty.</strong>
</p>

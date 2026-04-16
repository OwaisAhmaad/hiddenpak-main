# 🏔️ HiddenPak — Discover Pakistan's Hidden Beauty

A modern, full-stack travel discovery platform showcasing Pakistan's most breathtaking hidden destinations. Built with Next.js, MongoDB, and a beautiful green & orange brand identity.

![HiddenPak](https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=1200&q=80)

---

## ✨ Features

### 🌍 Public Website
- **Home Page** — Hero section, featured destinations, recent blogs, gallery preview, testimonials
- **Places** — Browse destinations with category filtering (Mountain, Valley, Lake, City, etc.)
- **Blogs** — Travel stories & guides with category filters and full blog detail view
- **Gallery** — Masonry-style photo gallery with hover effects
- **About** — About HiddenPak mission
- **Contact** — Contact information & social links
- **Responsive Design** — Mobile-first, works on all screen sizes

### 🔐 Admin Dashboard
- **Secure Login** — Email/password authentication
- **Dashboard Overview** — Stats, quick actions, recent activity
- **Blog Management** — Create, edit, delete blog posts with rich form fields
- **Places Management** — Add, edit, delete travel destinations with image URLs
- **Gallery Management** — Upload, edit, delete gallery photos with preview
- **Analytics** — Platform statistics, featured places, recent blogs
- **Settings** — Site name, tagline, contact info, social media links

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **Next.js 16** | React framework with App Router |
| **TypeScript** | Type-safe development |
| **MongoDB + Mongoose** | Database & ODM |
| **Tailwind CSS 4** | Utility-first styling |
| **shadcn/ui** | UI component library |
| **Framer Motion** | Smooth animations |
| **Lucide Icons** | Beautiful icon set |

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** 18+
- **MongoDB** 6.0+ running locally or a MongoDB Atlas connection string

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

### Environment Variables

Create a `.env` file in the root directory:

```env
MONGODB_URI=mongodb://localhost:27017/hiddenpak
```

### Seed the Database

```bash
npm run db:seed
```

This will populate the database with:
- 8 featured places across Pakistan
- 6 travel blog posts
- 12 gallery images
- 4 traveller testimonials
- Site settings
- Admin account: `admin@hiddenpak.com` / `admin123`

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
│   ├── layout.tsx            # Root layout
│   ├── globals.css           # Global styles
│   └── api/                  # API Routes
│       ├── auth/login/       # Admin authentication
│       ├── places/           # Places CRUD
│       ├── blogs/            # Blogs CRUD
│       ├── gallery/          # Gallery CRUD
│       ├── analytics/        # Dashboard analytics
│       ├── settings/         # Site settings
│       └── testimonials/     # Testimonials
├── components/ui/            # shadcn/ui components
├── hooks/                    # Custom React hooks
├── lib/
│   ├── mongodb.ts            # MongoDB connection utility
│   ├── serialize.ts          # Document serialization helper
│   └── utils.ts              # Utility functions
└── models/                   # Mongoose models
    ├── Admin.ts
    ├── Place.ts
    ├── Blog.ts
    ├── GalleryImage.ts
    ├── Testimonial.ts
    ├── SiteSetting.ts
    └── AnalyticsEvent.ts
```

---

## 🔌 API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/login` | Admin login |

### Places
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/places` | Get all places |
| POST | `/api/places` | Create a place |
| GET | `/api/places/[id]` | Get a place by ID |
| PUT | `/api/places/[id]` | Update a place |
| DELETE | `/api/places/[id]` | Delete a place |

### Blogs
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/blogs` | Get all blogs |
| POST | `/api/blogs` | Create a blog |
| GET | `/api/blogs/[id]` | Get a blog by ID |
| PUT | `/api/blogs/[id]` | Update a blog |
| DELETE | `/api/blogs/[id]` | Delete a blog |

### Gallery
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/gallery` | Get all images |
| POST | `/api/gallery` | Create an image |
| GET | `/api/gallery/[id]` | Get an image by ID |
| PUT | `/api/gallery/[id]` | Update an image |
| DELETE | `/api/gallery/[id]` | Delete an image |

### Other
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/analytics` | Dashboard analytics data |
| GET | `/api/testimonials` | Get all testimonials |
| GET | `/api/settings` | Get site settings |
| PUT | `/api/settings` | Update site settings |

---

## 🎨 Brand Identity

| Element | Value |
|---------|-------|
| **Primary Green** | `#14532D` |
| **Accent Orange** | `#F97316` |
| **Dark Background** | `#0B0F19` |
| **Card Background** | `#111827` |
| **Border Color** | `#1F2937` |

---

## 🔒 Admin Access

Navigate to the **Admin** button in the navbar or go to the login view:

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

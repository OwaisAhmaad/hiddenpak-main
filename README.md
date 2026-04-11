# HiddenPak — Pakistan Travel Discovery Platform

A full-stack travel platform for discovering hidden destinations across Pakistan. Features a public-facing website with blog posts, destination guides, and photo galleries, plus a complete admin CMS for content management.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 14 (App Router), React 18, Tailwind CSS, Framer Motion |
| Backend | NestJS 10, MongoDB (Mongoose), JWT Auth |
| Database | MongoDB Atlas |
| Image CDN | Cloudinary |
| Email | Nodemailer (SMTP) |

---

## Project Structure

```
HiddenPakv2/
├── app/                  # Next.js App Router (public + admin routes)
├── components/           # React components
├── lib/                  # API client, services, i18n, utilities
├── backend/              # NestJS API server
│   └── src/
│       ├── modules/      # Feature modules (blogs, places, gallery, etc.)
│       ├── database/     # Mongoose schemas
│       └── common/       # Shared utilities, interceptors, guards
└── public/               # Static assets
```

---

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB Atlas account (or local MongoDB)
- Cloudinary account (for image uploads)

### 1. Clone the repository
```bash
git clone https://github.com/OwaisAhmaad/HiddenPakv2.git
cd HiddenPakv2
```

### 2. Set up the Backend

```bash
cd backend
npm install
cp .env.example .env
# Fill in your values in .env
npm run dev
```

Backend runs on **http://localhost:4000**

### 3. Set up the Frontend

```bash
# From repo root
npm install
cp .env.local.example .env.local
# Set NEXT_PUBLIC_API_URL=http://localhost:4000/api/v1
npm run dev
```

Frontend runs on **http://localhost:3000**

---

## Environment Variables

### Backend (`/backend/.env`)

```env
PORT=4000
MONGODB_URI=your_mongodb_atlas_uri
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=15m
JWT_REFRESH_SECRET=your_refresh_secret
JWT_REFRESH_EXPIRES_IN=7d
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your@email.com
SMTP_PASS=your_app_password
MAIL_FROM=noreply@hiddenpak.com
FRONTEND_URL=http://localhost:3000
```

### Frontend (`.env.local`)

```env
NEXT_PUBLIC_API_URL=http://localhost:4000/api/v1
```

---

## Features

### Public Website
- **Home** — Hero, featured places, latest blogs, gallery preview
- **Places** — Searchable/filterable destination guides (by region & category)
- **Blogs** — Articles with search, category filters, and pagination
- **Gallery** — Masonry photo gallery
- **Bilingual** — Full English & Urdu support with RTL layout

### Admin Dashboard (`/admin`)
- **Authentication** — JWT login with refresh token rotation
- **Blogs** — Create, edit, delete blog posts with cover image upload
- **Places** — Manage destinations with image galleries, ratings, and metadata
- **Gallery** — Upload and manage standalone photos
- **Categories** — Manage place and blog categories
- **Analytics** — Platform statistics overview
- **Settings** — Site-wide configuration and admin profile

---

## API Overview

Base URL: `/api/v1`

| Resource | Public Endpoints | Admin Endpoints |
|---|---|---|
| Auth | `POST /auth/login`, `/auth/refresh`, `/auth/logout` | — |
| Blogs | `GET /blogs`, `GET /blogs/:slug` | `POST`, `PATCH`, `DELETE /blogs/:slug` |
| Places | `GET /places`, `GET /places/:slug` | `POST`, `PATCH`, `DELETE`, `POST /places/:id/gallery` |
| Gallery | `GET /gallery` | `POST`, `DELETE /gallery/:id` |
| Categories | `GET /categories` | `POST`, `PATCH`, `DELETE /categories/:id` |
| Analytics | — | `GET /admin/analytics` |
| Admin | — | `GET/PUT /admin/profile`, `GET/PATCH /admin/settings` |

---

## Scripts

### Backend
```bash
npm run dev        # Development with hot-reload
npm run build      # Compile TypeScript
npm start          # Run compiled build
npm run lint       # Lint source files
```

### Frontend
```bash
npm run dev        # Development server
npm run build      # Production build
npm start          # Start production server
npm run lint       # ESLint
```

---

## Deployment

**Backend**: Deploy the `/backend` directory to any Node.js host (Railway, Render, etc.). Set all environment variables and run `npm start` (uses `dist/main.js`).

**Frontend**: Deploy the repo root to Vercel (recommended for Next.js). Set `NEXT_PUBLIC_API_URL` to your deployed backend URL.

---

## License

MIT

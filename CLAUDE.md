# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

HiddenPak is a full-stack Pakistan travel discovery platform. It has two separate apps:
- **Frontend**: Next.js 14 (App Router) in the repo root
- **Backend**: NestJS 10 in `/backend`

Both have their own `package.json`. Run commands from their respective directories.

---

## Development Commands

### Frontend (run from repo root)
```bash
npm run dev      # Next.js dev server on :3000
npm run build    # Production build
npm run lint     # ESLint
```

### Backend (run from /backend)
```bash
npm run dev      # NestJS with watch mode on :4000
npm run build    # Compile TypeScript → dist/
npm run lint     # Lint src/**/*.ts
```

### API Base URL
`http://localhost:4000/api/v1`

---

## Environment Variables

**Frontend** (`.env.local`):
```
NEXT_PUBLIC_API_URL=http://localhost:4000/api/v1
```

**Backend** (`.env`):
```
PORT=4000
MONGODB_URI=...           # MongoDB Atlas connection string
JWT_SECRET=...
JWT_EXPIRES_IN=15m
JWT_REFRESH_SECRET=...
JWT_REFRESH_EXPIRES_IN=7d
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
SMTP_HOST=...
SMTP_PORT=587
SMTP_USER=...
SMTP_PASS=...
FRONTEND_URL=http://localhost:3000
```

---

## Architecture

### Backend (`/backend/src`)

**Module structure** — 8 feature modules registered in `app.module.ts`:

| Module | Routes | Notes |
|---|---|---|
| `auth` | `POST /auth/login`, `/auth/refresh`, `/auth/logout` | JWT + refresh token rotation |
| `users` | internal only | Used by auth module |
| `blogs` | `GET/POST /blogs`, `GET/PATCH/DELETE /blogs/:slug` | Admin writes require `JwtAuthGuard + RolesGuard('admin')` |
| `places` | `GET/POST /places`, `POST /places/:id/gallery` | Same auth pattern; region/category text search |
| `gallery` | `/gallery` CRUD | Standalone photos with height variants |
| `categories` | `/categories` CRUD | `type` enum: `village \| city \| other` |
| `admin` | `GET/PUT /admin/profile`, `GET/PATCH /admin/settings` | Admin-only |
| `analytics` | `GET /admin/analytics` | Admin-only summary |

**Key shared code** (`/backend/src/common`):
- `response.interceptor.ts` — wraps all responses: `{ success, message, data, meta }`
- `http-exception.filter.ts` — global error handling
- `cloudinary.service.ts` — all image uploads go through Cloudinary (no local storage)
- `base.repository.ts` — base MongoDB repository (extended by all feature repositories)
- `pagination.util.ts` — shared pagination logic

**Auth flow**: Access token (15m JWT) + Refresh token (7d, stored hashed in DB). Guards: `JwtAuthGuard` for protected routes, `RolesGuard` for role check (decorator: `@Roles('admin')`).

**Database** (MongoDB Atlas, db: `hiddenpak2`): Text search indexes on blogs (`title`, `content`, `excerpt`) and places (`name`, `description`). Slugs are unique indexed on blogs, places, and categories.

### Frontend (`/app`, `/components`, `/lib`)

**Route groups:**
- `(public)` — wraps with `Navbar + Footer`; includes `/`, `/blogs`, `/blogs/[slug]`, `/places`, `/places/[slug]`, `/gallery`, `/contact`
- `(admin)` — `/admin/login` and all `/admin/*` dashboard pages

**API client** (`/lib/api.ts`):
- Axios instance pointing at `NEXT_PUBLIC_API_URL`
- Request interceptor: attaches `Authorization: Bearer <accessToken>` from `localStorage`
- Response interceptor: auto-refreshes token on 401, retries original request; clears tokens on refresh failure

**Services** (`/lib/services/`): One service file per resource (`auth`, `blogs`, `places`, `gallery`, `categories`, `admin`, `analytics`). All hit the Axios instance from `lib/api.ts`.

**i18n** (`/lib/i18n/`): React context (`LanguageContext`) toggles between `en` and `ur`. Sets `document.dir = 'rtl'` for Urdu. Use the `t()` helper from the context. Translations live in `translations.ts`.

**Design system** (Tailwind custom tokens in `tailwind.config.ts`):
- Dark background: `#0B0F19`, card: `#111827`
- Accent: `green-primary: #14532D`, `orange: #F97316`, `beige: #F5F5DC`
- Fonts: Inter (body), Poppins (headings), Noto Nastaliq Urdu (Urdu text)

---

## Key Conventions

- **Backend responses** always go through `ResponseInterceptor` — never return raw objects from controllers; the interceptor wraps them automatically.
- **Image uploads** always go to Cloudinary via `CloudinaryService.uploadImage()`. Never save files locally.
- **Admin-only endpoints** require both `@UseGuards(JwtAuthGuard, RolesGuard)` and `@Roles('admin')` decorator.
- **Slugs** are auto-generated from titles using `slug.util.ts` on create; unique constraint in DB.
- **Frontend auth tokens** are stored in `localStorage` (keys: `accessToken`, `refreshToken`). The API interceptor manages them automatically — don't access localStorage directly in components.
- **Bilingual fields**: Place and blog content supports both English and Urdu — check schema field types (`{ en: String, ur: String }` pattern) when adding new content fields.

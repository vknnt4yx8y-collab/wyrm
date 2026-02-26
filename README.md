# Wynncraft Clone

A fully functional, production-grade clone of the [Wynncraft](https://wynncraft.com) website — the largest Minecraft MMORPG server.

## 🏗️ Architecture

```
wynncraft-clone/
├── apps/
│   ├── web/          # Next.js 14+ frontend (TypeScript, Tailwind CSS)
│   └── api/          # Express.js REST API + Socket.io
├── packages/
│   ├── database/     # Prisma ORM + PostgreSQL schema
│   └── shared/       # Shared TypeScript types and constants
├── docker-compose.yml
└── .github/workflows/ci.yml
```

## 🚀 Quick Start

### Prerequisites
- Node.js 20+
- Docker & Docker Compose
- npm 10+

### 1. Clone and Install

```bash
git clone <repo-url>
cd wynncraft-clone
npm install
```

### 2. Set Up Environment Variables

```bash
cp .env.example .env
# Edit .env with your configuration
```

### 3. Start Infrastructure

```bash
docker compose up postgres redis minio meilisearch -d
```

### 4. Set Up Database

```bash
cd packages/database
npx prisma migrate deploy
npx ts-node seed.ts
```

### 5. Start Development Servers

```bash
# In separate terminals:
cd apps/api && npm run dev       # API server on :3001
cd apps/web && npm run dev       # Next.js frontend on :3000
```

### Docker Compose (Full Stack)

```bash
docker compose up -d
```

Access:
- **Frontend**: http://localhost:3000
- **API**: http://localhost:3001
- **MinIO Console**: http://localhost:9001
- **Meilisearch**: http://localhost:7700

## 🎯 Features

- **10 fully implemented pages** with dark fantasy Wynncraft aesthetic
- **Public REST API** matching Wynncraft WAPI v3 format (`/api/v3/`)
- **Real-time server status** via Socket.io (15-second polling)
- **PostgreSQL database** with Prisma ORM and full schema
- **Redis caching** for leaderboards and API responses
- **Rate limiting** (120 req/min per IP)
- **JWT authentication** with bcrypt password hashing
- **Shopping cart** with Zustand persistence
- **Interactive world map** with Leaflet.js
- **Forum system** with categories, threads, and posts
- **Item database** with Minecraft-style tooltips
- **Player stats** with character details
- **Guild profiles** and territory system
- **Leaderboards** for all game categories

## 📦 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 14, TypeScript, Tailwind CSS |
| Backend | Express.js, TypeScript |
| Database | PostgreSQL 16, Prisma ORM |
| Cache | Redis 7 |
| File Storage | MinIO (S3-compatible) |
| Search | Meilisearch |
| Real-time | Socket.io |
| Auth | JWT + bcrypt |
| Payments | Stripe (configured) |
| Container | Docker + Docker Compose |

## 🔌 API Endpoints

Base URL: `http://localhost:3001/api/v3/`

| Method | Endpoint | Cache TTL |
|--------|----------|-----------|
| GET | `/player/{username}` | 5 min |
| GET | `/player/{username}/characters` | 5 min |
| GET | `/player/online` | 15 sec |
| GET | `/guild/{name}` | 5 min |
| GET | `/guild/territory` | 1 min |
| GET | `/guild` | 30 min |
| GET | `/leaderboard/{type}` | 10 min |
| GET | `/item` | 1 hour |
| GET | `/item/{name}` | 1 hour |
| GET | `/search/{query}` | 1 min |
| GET | `/map/locations/markers` | 1 hour |
| GET | `/news` | 5 min |
| GET | `/news/{slug}` | 5 min |
| GET | `/server/status` | 15 sec |
| GET | `/classes` | 1 hour |

Rate limit: **120 requests/minute** per IP.

## 🗄️ Database

Run Prisma commands from `packages/database/`:

```bash
npx prisma migrate dev      # Create and apply migrations
npx prisma migrate deploy   # Apply migrations (production)
npx prisma studio           # Open Prisma Studio GUI
npx ts-node seed.ts         # Seed with sample data
```

## 🚢 Deployment

### Recommended Stack
- **Frontend**: Vercel
- **API**: Railway or Fly.io
- **Database**: Supabase or Neon
- **Redis**: Upstash
- **Storage**: AWS S3 or Cloudflare R2

### Environment Variables

See `.env.example` for all required environment variables.

## 📄 License

This project is a fan-made clone for educational purposes. Wynncraft is owned by Wynncraft, LLC.

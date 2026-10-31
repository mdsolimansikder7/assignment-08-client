# Humanova — Community Event Platform

Humanova is a community platform for local social-service events: creating, discovering, joining, and managing events that help neighborhoods.

**Live site:** `https://your-live-site.example.com` (placeholder until deployed)

## Features

- Real email/password and Google authentication powered by Better Auth.
- Create, update, and delete community events through the backend API.
- Browse upcoming events and join the ones that matter to you.
- Manage the events you created and review your joined events.
- Responsive design for desktop and mobile.

## Getting Started

- Backend: run the separate `event-server` project (Better Auth + MongoDB).
- Frontend: copy `.env.example` to `.env.local` and fill in your values.

```bash
npm run dev
npm run build
npm run lint
```

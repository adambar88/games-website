# apps.barczynski.dev

Landing page for [apps.barczynski.dev](https://apps.barczynski.dev) — a hub that links to all web apps hosted on this subdomain.

## Architecture

```
apps.barczynski.dev/          → this hub (landing page listing all apps)
apps.barczynski.dev/2048/     → 2048 game (separate repo, built with base: '/2048/')
apps.barczynski.dev/snake/    → future app...
```

Each app lives in its own repository and builds with a subpath base (e.g., `base: '/2048/'` in Vite config). The apps are combined at deploy time via nginx.

## Development

```bash
npm install
npm run dev
```

## Deployment options

### Option A: Separate containers behind a reverse proxy (recommended)

Run the hub and each app as separate Docker containers, and use a reverse proxy (Traefik, Caddy, nginx) to route:

- `/` → hub container
- `/2048/` → 2048 container

This is the most flexible approach — each app deploys independently.

### Option B: Single container with all apps baked in

Use `Dockerfile.combined` and a CI pipeline that:

1. Clones each app repo
2. Builds them all
3. Copies the built assets into the right nginx directories

### Adding a new app

1. Build the app with a subpath base (e.g., `base: '/myapp/'` in Vite)
2. Add a `location /myapp/` block to `nginx.conf`
3. Add an entry to the `apps` array in `src/App.tsx`

# syntax=docker/dockerfile:1

# ── Build apps-website hub ─────────────────────────────
FROM node:20-alpine AS build-hub
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# ── Production stage ───────────────────────────────────
FROM nginx:stable-alpine

RUN rm -rf /usr/share/nginx/html/* /etc/nginx/conf.d/default.conf
RUN apk add --no-cache wget

COPY nginx.conf /etc/nginx/conf.d/default.conf

# Hub landing page only — games are proxied to their own containers
COPY --from=build-hub /app/dist/ /usr/share/nginx/html/

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
    CMD wget -qO- http://localhost/health || exit 1

CMD ["nginx", "-g", "daemon off;"]

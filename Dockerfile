# Build web
FROM node:22-slim@sha256:b2fa526a10dad3c5ab4b3779eca81607ed05a96160ef5497c36cd4ebed68803d AS base

RUN corepack enable && \
  corepack prepare pnpm@10.15.0 --activate

# Build web
FROM base AS builder

WORKDIR /app

COPY web/package.json web/pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY web/tsconfig.json web/vite.config.ts web/react-router.config.ts ./
COPY web/src ./src
COPY web/public ./public

RUN pnpm build

# Build final image -------------------------------------------
FROM base AS final

WORKDIR /app

COPY --from=builder /app/build ./build
COPY --from=builder /app/public ./public

COPY --from=builder /app/package.json /app/pnpm-lock.yaml ./
RUN pnpm install --prod --frozen-lockfile

EXPOSE 3000

CMD ["npm", "run", "start"]

# ------------------------------------------------------------
# Build, test, and run
# ------------------------------------------------------------
# docker build -t still-forest-dot-dev .
# docker run --rm -it still-forest-dot-dev sh
# docker run -p 8080:3000 still-forest-dot-dev

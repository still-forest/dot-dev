# Build web
FROM node:22-slim@sha256:048ed02c5fd52e86fda6fbd2f6a76cf0d4492fd6c6fee9e2c463ed5108da0e34 AS base

RUN corepack enable && \
  corepack prepare pnpm@10.11.0 --activate

# Build web
FROM base AS web-builder

WORKDIR /app/web

COPY web/package.json web/pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY web/tsconfig.json web/vite.config.ts web/index.html ./
COPY web/src ./src
COPY web/public ./public

RUN pnpm build

# Build api
FROM base AS api-builder

WORKDIR /app/api

COPY api/package.json api/pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY api/tsconfig.json api/tsup.config.ts ./
COPY api/src ./src

RUN pnpm build

# Build final, combined image --------------------------------
FROM base AS final

WORKDIR /app

# Copy built assets and server
COPY --from=web-builder /app/web/dist ./public

COPY --from=api-builder /app/api/dist ./dist
COPY --from=api-builder /app/api/package.json /app/api/pnpm-lock.yaml ./

RUN pnpm install --prod --frozen-lockfile

EXPOSE 8080

CMD ["node", "dist/index.js"]

# Build web
FROM node:22-slim@sha256:2f3571619daafc6b53232ebf2fcc0817c1e64795e92de317c1684a915d13f1a5 AS web-builder

WORKDIR /app

RUN corepack enable && \
  corepack prepare pnpm@10.11.0 --activate

COPY apps/web/package.json apps/web/pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY apps/web/tsconfig.json apps/web/vite.config.ts apps/web/index.html ./
COPY apps/web/src ./src
COPY apps/web/public ./public

RUN pnpm build

# Build api
FROM node:22-slim@sha256:157c7ea6f8c30b630d6f0d892c4f961eab9f878e88f43dd1c00514f95ceded8a AS api-builder

WORKDIR /app

RUN corepack enable && \
  corepack prepare pnpm@10.11.0 --activate

COPY apps/api/package.json apps/api/pnpm-lock.yaml
RUN pnpm install --frozen-lockfile

COPY apps/api/tsconfig.json apps/api/tsup.config.ts ./
COPY apps/api/src ./src

RUN pnpm build

# Build final, combined image --------------------------------
FROM node:22-slim@sha256:2f3571619daafc6b53232ebf2fcc0817c1e64795e92de317c1684a915d13f1a5

WORKDIR /app

# Copy built assets and server
COPY --from=web-builder /app/dist ./public

COPY --from=api-builder /app/dist ./dist
COPY --from=api-builder /app/node_modules ./node_modules
COPY --from=api-builder /app/package.json ./

EXPOSE 8080

CMD ["node", "dist/index.js"]

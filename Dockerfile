# Build web
FROM node:22-slim@sha256:2f3571619daafc6b53232ebf2fcc0817c1e64795e92de317c1684a915d13f1a5 AS web-builder

WORKDIR /app/web

RUN corepack enable && \
  corepack prepare pnpm@10.11.0 --activate

COPY web/package.json web/pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY web/tsconfig.json web/vite.config.ts web/index.html ./
COPY web/src ./src
COPY web/public ./public
COPY ./tsconfig.json ../

RUN pnpm build

# Build api
FROM node:22-slim@sha256:157c7ea6f8c30b630d6f0d892c4f961eab9f878e88f43dd1c00514f95ceded8a AS api-builder

WORKDIR /app/api

RUN corepack enable && \
  corepack prepare pnpm@10.11.0 --activate

COPY api/package.json api/pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY api/tsconfig.json api/tsup.config.ts ./
COPY api/src ./src
COPY ./tsconfig.json ../

RUN pnpm build

# Build final, combined image --------------------------------
FROM node:22-slim@sha256:2f3571619daafc6b53232ebf2fcc0817c1e64795e92de317c1684a915d13f1a5

WORKDIR /app

# Copy built assets and server
COPY --from=web-builder /app/web/dist ./public

COPY --from=api-builder /app/api/dist ./dist
COPY --from=api-builder /app/api/node_modules ./node_modules
COPY --from=api-builder /app/api/package.json ./

EXPOSE 8080

CMD ["node", "dist/index.js"]

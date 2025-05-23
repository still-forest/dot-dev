# Builder image -------------------------------------
FROM node:22-slim@sha256:2f3571619daafc6b53232ebf2fcc0817c1e64795e92de317c1684a915d13f1a5 AS builder

WORKDIR /app

RUN corepack enable && \
  corepack prepare pnpm@10.11.0 --activate

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY tsconfig.json tsconfig.server.json vite.config.ts index.html ./
COPY ./src ./src
COPY ./server ./server
COPY ./public ./public

RUN pnpm build

# Final image --------------------------------
FROM node:22-slim@sha256:2f3571619daafc6b53232ebf2fcc0817c1e64795e92de317c1684a915d13f1a5

WORKDIR /app

# Copy built assets and server
COPY --from=builder /app/dist-client ./public
COPY --from=builder /app/dist-server ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./

EXPOSE 8080

CMD ["node", "dist/index.js"]

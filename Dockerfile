FROM --platform=linux/amd64 node:22-slim@sha256:2f3571619daafc6b53232ebf2fcc0817c1e64795e92de317c1684a915d13f1a5 AS base

RUN corepack enable && \
  corepack prepare pnpm@10.11.0 --activate

FROM base AS build
WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc ./

COPY apps/api/package.json apps/api/pnpm-lock.yaml ./apps/api/
COPY apps/web/package.json apps/web/pnpm-lock.yaml ./apps/web/

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile --prefer-offline --no-optional --silent

COPY ./tsconfig.json ./

COPY apps/api/src ./apps/api/src
COPY apps/api/tsconfig.json apps/api/tsup.config.ts ./apps/api/

COPY apps/web/src apps/web/public ./apps/web/
COPY apps/web/vite.config.ts apps/web/tsconfig.json apps/web/index.html ./apps/web/


RUN pnpm run -r build

RUN pnpm deploy --filter=./apps/web --prod /prod/web
RUN pnpm deploy --filter=./apps/api --prod /prod/api

FROM base AS api
COPY --from=build /prod/api /prod/api
WORKDIR /prod/api

EXPOSE 8080

CMD [ "pnpm", "start" ]

FROM base AS web
COPY --from=build /prod/web /prod/web
WORKDIR /prod/web

EXPOSE 5173

CMD [ "pnpm", "start" ]

FROM node:20-alpine AS base

# Install pnpm
RUN corepack enable && corepack prepare pnpm@8.14.0 --activate

# Set working directory
WORKDIR /app

# Copy root package.json and pnpm files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./

# Copy the web package.json
COPY apps/web/package.json ./apps/web/package.json
COPY packages/ ./packages/

# Install dependencies
FROM base AS dependencies
RUN pnpm install --frozen-lockfile

# Development stage
FROM dependencies AS development
COPY . .
WORKDIR /app
ENV NEXT_PUBLIC_API_URL=http://localhost:3000/api
CMD ["pnpm", "dev:web"]

# Builder stage for production
FROM dependencies AS builder
COPY . .
ENV NEXT_PUBLIC_API_URL=https://your-api-url.com/api
RUN pnpm run build --filter=web

# Production stage
FROM node:20-alpine AS production
WORKDIR /app

COPY --from=builder /app/apps/web/.next /app/.next
COPY --from=builder /app/apps/web/public /app/public
COPY --from=builder /app/apps/web/package.json /app/package.json
COPY --from=builder /app/node_modules /app/node_modules

ENV NODE_ENV=production
ENV PORT=3400

EXPOSE 3400

CMD ["node_modules/.bin/next", "start", "-p", "3400"] 
FROM node:20-alpine AS base

# Install pnpm
RUN corepack enable && corepack prepare pnpm@8.14.0 --activate

# Set working directory
WORKDIR /app

# Copy root package.json and pnpm files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./

# Copy the api package.json
COPY apps/api/package.json ./apps/api/package.json
COPY packages/ ./packages/

# Build argument to control lockfile check
ARG SKIP_LOCKFILE_CHECK=false

# Install dependencies
FROM base AS dependencies
ARG SKIP_LOCKFILE_CHECK
RUN if [ "$SKIP_LOCKFILE_CHECK" = "true" ]; then \
      pnpm install --no-frozen-lockfile; \
    else \
      pnpm install; \
    fi

# Development stage
FROM dependencies AS development
COPY . .
WORKDIR /app
CMD ["pnpm", "dev:api"]

# Builder stage for production
FROM dependencies AS builder
COPY . .
RUN pnpm run build --filter=api

# Production stage
FROM node:20-alpine AS production
WORKDIR /app

# Copy package.json files
COPY --from=builder /app/package.json /app/
COPY --from=builder /app/apps/api/package.json /app/
COPY --from=builder /app/pnpm-lock.yaml /app/

# Build argument to control lockfile check
ARG SKIP_LOCKFILE_CHECK

# Install all dependencies (including dev dependencies since swagger is used in production)
RUN corepack enable && corepack prepare pnpm@8.14.0 --activate && \
    if [ "$SKIP_LOCKFILE_CHECK" = "true" ]; then \
      pnpm install --no-frozen-lockfile; \
    else \
      pnpm install; \
    fi

# Copy built application
COPY --from=builder /app/apps/api/dist /app/dist

ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

CMD ["node", "dist/main.js"] 
FROM node:20.19-alpine AS base

# Install pnpm
RUN corepack enable && corepack prepare pnpm@8.14.0 --activate

# Set working directory
WORKDIR /app

# Install dependencies only when needed
FROM base AS deps
COPY package.json pnpm-lock.yaml* pnpm-workspace.yaml* ./
COPY packages/eslint-config/package.json ./packages/eslint-config/
COPY packages/tsconfig/package.json ./packages/tsconfig/
COPY packages/ui/package.json ./packages/ui/
COPY apps/web/package.json ./apps/web/

RUN pnpm install

# Development image, keep all files and run development server
FROM base AS development
COPY --from=deps /app/node_modules ./node_modules
COPY . .

CMD ["pnpm", "dev"] 
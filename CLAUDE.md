# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands
- Build: `pnpm build`
- Dev: `pnpm dev`
- Lint: `pnpm lint`
- Format: `pnpm format`
- Clean: `pnpm clean`
- Web-specific: `pnpm --filter web <command>` (e.g., `pnpm --filter web dev`)

## Code Style
- **TypeScript**: Use strict mode with explicit typing
- **Imports**: Prefer type imports with inline style (`import type { X } from 'y'`)
- **Formatting**: Follow Prettier defaults 
- **Components**: Use React functional components with explicit type definitions
- **Naming**: PascalCase for components, camelCase for functions/variables
- **Error Handling**: Use try/catch with appropriate error logging
- **Project Structure**: Follow Next.js App Router conventions
- **Path Aliases**: Use `@/*` for imports from `src/` directory
- **State Management**: React Context or props (no Redux)
- **UI Components**: Use components from the shared UI package where possible

## Architecture
This is a Turborepo monorepo with Next.js frontend and NestJS backend, using pnpm workspaces.
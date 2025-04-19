# LinkedIn Generator

A monorepo containing a Next.js frontend and NestJS API for generating LinkedIn content.

## Development

```bash
# Install dependencies
pnpm install

# Run the development server
pnpm dev
```

## Project Structure

- `apps/web`: Next.js frontend running on port 3400
- `apps/api`: NestJS API running on port 3000
- `packages/`: Shared packages

## Deployment

This application is designed to be deployed as separate services:

### Frontend (Next.js)

The frontend can be deployed on Vercel:

1. Connect your GitHub repository to Vercel
2. Configure the project:
   - Framework Preset: Next.js
   - Root Directory: `apps/web`
   - Build Command: `cd ../.. && pnpm run build --filter=web`
   - Output Directory: `.next`
   - Install Command: `cd ../.. && pnpm install`

Make sure to set the environment variable:

- `NEXT_PUBLIC_API_URL` pointing to your deployed API URL

### API (NestJS)

The API can be deployed on platforms like:

- Railway
- Render
- Fly.io
- Heroku
- AWS/GCP/Azure

Configure the environment variables:

- `DATABASE_URL`: Your PostgreSQL connection string
- `PORT`: The port to run the server (default: 3000)

## Docker

You can also run the entire stack with Docker:

```bash
# Run the development environment
docker-compose up

# Build and run the production environment
docker-compose -f docker-compose.prod.yml up --build
```

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/linkedin_generator
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

## Overview

LinkedIn Content Generator is a multi-tool application that helps professionals maintain a consistent LinkedIn presence. The app retrieves your previous LinkedIn posts, stores them in a database, analyzes your writing patterns, and then generates new content that matches your personal style. It also offers the option to automatically post content to LinkedIn on your behalf.

## Features

- **Content Retrieval**: Fetch your previous LinkedIn posts
- **Content Analysis**: Classify and analyze your writing style
- **AI-Powered Generation**: Create new posts that match your voice and style
- **Automated Publishing**: Schedule and automatically post content to LinkedIn
- **Content Management**: Organize and edit your posts in one place

## Tech Stack

- **Frontend**: Next.js with [21st.dev](https://21st.dev/) UI components
- **Backend**: NestJS
- **Project Structure**: Turborepo monorepo
- **Database**: PostgreSQL
- **Containerization**: Docker & Docker Compose
- **Package Manager**: pnpm
- **CI/CD**: GitHub Actions

## Getting Started

### Prerequisites

- Node.js (version 20.19 or higher)
- pnpm
- Docker & Docker Compose
- [Any other prerequisites]

### Installation

1. Clone the repository

   ```
   git clone https://github.com/yourusername/linkedin-generator.git
   cd linkedin-generator
   ```

2. Start containers

   ```
   docker-compose up -d
   ```

3. Install dependencies (if developing locally)

   ```
   pnpm install
   ```

4. Set up environment variables

   ```
   cp .env.example .env
   # Edit .env with your configuration
   ```

5. Run the development server (if developing locally)
   ```
   pnpm dev
   ```

## Usage

[Brief usage instructions to be added]

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

[License information to be added]

## Acknowledgements

- [21st.dev](https://21st.dev/) for UI components
- [Any other acknowledgements]

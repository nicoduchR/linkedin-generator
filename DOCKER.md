# Docker Setup for LinkedIn Generator

This document explains how to use Docker with the LinkedIn Generator application.

## Prerequisites

- Docker
- Docker Compose

## Building and Running

### Using Docker Compose

To build and start all services:

```bash
docker-compose up -d
```

To rebuild all services:

```bash
docker-compose up -d --build
```

To stop all services:

```bash
docker-compose down
```

To stop all services and remove volumes:

```bash
docker-compose down -v
```

### Services

The application consists of the following services:

- **Web**: Next.js frontend application running on port 3400
- **API**: NestJS backend API running on port 3000
- **PostgreSQL**: Database running on port 5432

### Accessing Services

- Web UI: http://localhost:3400
- API: http://localhost:3000/api
- API Documentation: http://localhost:3000/api/docs

## Development with Docker

For development purposes, you can run:

```bash
docker-compose -f docker-compose.dev.yml up -d
```

This will mount your local directories for hot reloading.

## Individual Dockerfiles

Each application has its own Dockerfile:

- Web: `apps/web/Dockerfile`
- API: `apps/api/Dockerfile`

You can build them individually with:

```bash
# Build web app
docker build -t linkedin-generator-web -f apps/web/Dockerfile .

# Build API
docker build -t linkedin-generator-api -f apps/api/Dockerfile .
```

## CI/CD

The GitHub Actions workflow in `.github/workflows/build.yml` automatically:

1. Detects changes in the applications
2. Builds containers using docker-compose
3. Tests the containers to ensure they're working properly

The workflow uses smart detection to only trigger builds when relevant files have changed.

# LinkedIn Content Generator

A comprehensive tool to analyze, generate, and manage LinkedIn content based on your personal writing style.

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

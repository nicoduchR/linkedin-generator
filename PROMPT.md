# LinkedIn Content Generator - Development Prompt

## Project Overview

Create a full-stack application that retrieves, analyzes, generates, and automates LinkedIn posts based on a user's historical content and writing style. The system should seamlessly integrate with LinkedIn's API, use AI to understand and replicate personal writing patterns, and provide a clean, intuitive interface for content management.

## Core Requirements

### Authentication & Authorization

- Implement secure OAuth 2.0 integration with LinkedIn
- Support user registration/login via LinkedIn and email/password
- Include role-based permissions (admin, content manager, viewer)
- Store encrypted authentication tokens securely

### LinkedIn Content Retrieval

- Develop a robust LinkedIn API integration using their official SDK
- Retrieve all historical posts from a user's profile with pagination
- Extract metadata including engagement metrics (likes, comments, shares)
- Implement error handling for API rate limits and service disruptions
- Cache results appropriately to minimize API calls

### Database & Storage

- Design a PostgreSQL schema optimized for text analysis and content management
- Create tables for users, posts, post categories, metrics, and generated content
- Implement efficient indexing for quick text searches and filtering
- Store post content, metadata, and classification data with proper relationships
- Include database migrations and seeding capabilities

### Content Analysis & Classification

- Implement NLP processing pipeline to analyze writing patterns
- Create a classification system for posts (topics, tone, structure, etc.)
- Extract common phrases, vocabulary preferences, and sentence structures
- Generate statistical models of the user's writing style
- Allow for manual tagging and classification correction

### AI Content Generation

- Develop an AI model that generates LinkedIn posts matching the user's style
- Support different post formats (text-only, article summaries, etc.)
- Allow users to specify topic, tone, and length parameters
- Implement a feedback loop for content quality improvement
- Provide regeneration options with adjusted parameters

### Content Management UI

- Create a clean, modern dashboard using Next.js with 21st.dev UI components
- Implement a post calendar view for scheduling and planning
- Design an intuitive post editor with preview functionality
- Include filtering and search capabilities across all content
- Develop a metrics dashboard showing engagement statistics

### Automated Publishing

- Build a scheduling system for automated post publishing
- Implement configurable posting frequencies and optimal time detection
- Create approval workflows for generated content
- Develop a queueing system with priority management
- Include failover mechanisms and error handling

### Containerization & Infrastructure

- Configure Docker containers for all application components
- Set up Docker Compose for local development environment
- Create optimized production Docker images
- Implement health checks and container orchestration
- Design for horizontal scalability

### CI/CD Pipeline

- Configure GitHub Actions for continuous integration
- Implement automated testing for all components
- Set up continuous deployment to staging and production environments
- Include database migration automation
- Configure security scanning in the pipeline

## Technical Specifications

### Frontend (Next.js)

- TypeScript-based codebase with strict type checking
- Component-based architecture using React
- State management with React Context or Redux
- Responsive design supporting mobile and desktop
- Accessibility compliance (WCAG 2.1 AA)
- Integration with 21st.dev UI components
- Server-side rendering for performance optimization

### Backend (NestJS)

- TypeScript-based REST API with OpenAPI documentation
- Modular architecture with dependency injection
- Middleware for authentication, logging, and error handling
- Service-based business logic implementation
- Repository pattern for database interactions
- Comprehensive error handling and logging
- Rate limiting and security hardening

### Database (PostgreSQL)

- Normalized schema design with proper relationships
- Full-text search capabilities for content
- Indexing strategy for query optimization
- Transaction management for data integrity
- Query optimization and performance tuning
- Backup and restoration procedures

### Testing Strategy

- Unit tests for all business logic components
- Integration tests for API endpoints
- E2E tests for critical user flows
- Performance testing for database queries
- Load testing for concurrent user simulation

### Monitoring & Logging

- Centralized logging system
- Performance metrics collection
- Error tracking and alerting
- User activity monitoring
- API usage statistics

## Development Process

1. Set up project structure and monorepo configuration with Turborepo
2. Configure development environment with Docker and PostgreSQL
3. Implement LinkedIn API integration and content retrieval
4. Design and implement database schema
5. Develop content analysis and classification system
6. Create basic UI dashboard and content management
7. Implement AI content generation capabilities
8. Build automated publishing system
9. Set up CI/CD pipeline with GitHub Actions
10. Implement monitoring and logging
11. Conduct thorough testing and optimization
12. Deploy to production environment

## Success Criteria

- Seamless LinkedIn integration with reliable content retrieval
- Accurate classification of existing content
- Natural-sounding generated posts that match user's style
- Intuitive and responsive user interface
- Reliable automated publishing
- Comprehensive analytics on post performance
- Scalable and maintainable architecture
- Robust security and privacy protections

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Core Commands
- `npm run dev` - Start development server (frontend at http://localhost:3000, admin at /admin) - **DO NOT RUN**: Server runs in separate terminal
- `npm run build` - Build the application for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint for code quality checks

### Testing
- `npm run test` - Run all tests (integration and end-to-end)
- `npm run test:int` - Run integration tests with Vitest
- `npm run test:e2e` - Run end-to-end tests with Playwright

### Payload CMS Commands
- `npm run payload` - Access Payload CLI commands
- `npm run generate:types` - Generate TypeScript types from Payload collections
- `npm run generate:importmap` - Generate import map for admin panel

## Architecture Overview

This is a **dual-application Next.js project** combining a portfolio frontend with Payload CMS:

### Routing Structure
- **Frontend App**: `src/app/(frontend)/` - Public portfolio site
- **Admin/CMS App**: `src/app/(payload)/` - Payload CMS admin interface
- Route groups allow separate layouts and functionality for each application

### Key Technologies
- **Next.js 15** with App Router
- **Payload CMS 3.x** for content management
- **MongoDB** database with Mongoose adapter
- **TailwindCSS 4.x** for styling
- **TypeScript** for type safety
- **Framer Motion** and **GSAP** for animations

### Frontend Structure
- Components organized by purpose: `animations/`, `common/`, `home/`, `layout/`
- Custom fonts: Syne, Reddit Sans Condensed, Reddit Mono
- Custom cursor implementation with `TargetCursor`
- Path aliases: `@/*` maps to `src/app/(frontend)/*`

### Payload CMS Configuration
- **Collections**: Users (auth-enabled), Media (file uploads)
- **Admin Panel**: Accessible at `/admin` route
- **Database**: MongoDB via `DATABASE_URI` environment variable
- **Authentication**: Built-in user system for admin access
- **File Uploads**: Media collection with alt text support

### Testing Setup
- **Integration Tests**: Vitest with jsdom environment for React components
- **E2E Tests**: Playwright configured for Chromium with test server
- Test files: `tests/int/` for integration, `tests/e2e/` for end-to-end

### Environment Configuration
- Uses `test.env` file for testing environment variables
- Requires `DATABASE_URI` for MongoDB connection
- Requires `PAYLOAD_SECRET` for Payload authentication

### Development Notes
- The project uses `npm` as package manager (has both package-lock.json and yarn.lock)
- Docker setup available with docker-compose.yml
- ESLint configured with Next.js and TypeScript rules  
- Webpack configured for extension aliasing (.ts/.tsx resolution)
- **IMPORTANT**: Never run `npm run dev` or development server commands - server runs in separate terminal managed by user
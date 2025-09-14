# Overview

This is a full-stack web application built with React and Express that serves as a distance unit converter. The app allows users to convert between kilometers and miles with a clean, modern interface. It features a React frontend with shadcn/ui components, an Express backend, and is configured to use PostgreSQL with Drizzle ORM for data persistence. The application is set up as a monorepo with shared TypeScript types and database schema.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture

- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with CSS custom properties for theming
- **Build Tool**: Vite for fast development and optimized builds

## Backend Architecture

- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Pattern**: RESTful API design (currently minimal implementation)
- **Middleware**: Express JSON parsing, URL encoding, and custom logging
- **Development**: Hot reload via tsx and Vite dev server integration

## Data Storage

- **Database**: PostgreSQL (configured via DATABASE_URL)
- **ORM**: Drizzle ORM for type-safe database operations
- **Schema**: Shared schema definitions in TypeScript
- **Migrations**: Drizzle Kit for database migrations
- **Storage Interface**: Abstract storage layer with in-memory fallback for development

## Project Structure

- **Monorepo Layout**: Separate client, server, and shared directories
- **Shared Code**: Common types and database schema in `/shared`
- **Build Output**: Unified dist directory for production deployment
- **Configuration**: Centralized config files for TypeScript, Tailwind, and build tools

## Authentication & Session Management

- **Session Store**: PostgreSQL-backed sessions using connect-pg-simple
- **User Model**: Basic user schema with username/password fields
- **Storage Layer**: Abstracted user management with CRUD operations

## Development Features

- **Replit Integration**: Custom Vite plugins for Replit-specific development features
- **Error Handling**: Runtime error overlay and centralized error boundaries
- **Type Safety**: Strict TypeScript configuration across frontend and backend
- **Hot Reload**: Full-stack development with automatic reloading

# External Dependencies

## Core Framework Dependencies
- **React Ecosystem**: React 18, React DOM, React Query for state management
- **Express.js**: Web framework with standard middleware
- **Vite**: Build tool and development server

## Database & ORM
- **Drizzle ORM**: Type-safe PostgreSQL ORM with Zod integration
- **@neondatabase/serverless**: PostgreSQL driver for serverless environments
- **connect-pg-simple**: PostgreSQL session store for Express

## UI Component Libraries
- **Radix UI**: Comprehensive set of unstyled, accessible UI primitives
- **shadcn/ui**: Pre-built components using Radix UI and Tailwind CSS
- **Lucide React**: Icon library for consistent iconography

## Styling & Design
- **Tailwind CSS**: Utility-first CSS framework
- **class-variance-authority**: Utility for creating component variants
- **clsx**: Conditional CSS class utility

## Development Tools
- **TypeScript**: Static type checking across the entire codebase
- **tsx**: TypeScript execution for Node.js development
- **esbuild**: Fast JavaScript bundler for production builds

## Replit-Specific Tools
- **@replit/vite-plugin-runtime-error-modal**: Development error overlay
- **@replit/vite-plugin-cartographer**: Replit development integration
- **@replit/vite-plugin-dev-banner**: Development environment indicators
# replit.md

## Overview

This is a social media platform called "BloodSource" built with a modern full-stack architecture. It features user authentication, posts, stories, friend requests, and analytics. The application uses React for the frontend, Express for the backend, and PostgreSQL with Drizzle ORM for data management.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **UI Library**: Radix UI components with shadcn/ui styling
- **Styling**: Tailwind CSS with custom color scheme
- **State Management**: TanStack Query (React Query) for server state
- **Routing**: Wouter for lightweight client-side routing
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Runtime**: Node.js with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: JWT tokens with bcrypt for password hashing
- **Email Service**: SendGrid for email notifications
- **Connection Pool**: Neon Database serverless connection

### Build System
- **Frontend Builder**: Vite with React plugin
- **Backend Builder**: esbuild for production builds
- **Development**: tsx for TypeScript execution
- **Package Manager**: npm

## Key Components

### Authentication System
- JWT-based authentication with refresh tokens
- Role-based access control (staff vs regular users)
- Registration with invitation codes and email verification
- Password hashing with bcrypt
- Protected routes and middleware

### Social Features
- **Posts**: Create, read, update, delete posts with media support
- **Stories**: Temporary content with 24-hour expiration
- **Friends**: Friend requests and friendship management
- **Comments**: Nested commenting system on posts
- **Likes**: Like/unlike functionality for posts and comments
- **Analytics**: User engagement tracking and metrics

### User Interface
- **Landing Page**: Authentication forms for login/registration
- **Dashboard**: Admin interface for staff users with analytics
- **Newsfeed**: Social media feed for regular users
- **Responsive Design**: Mobile-first approach with Tailwind CSS

## Data Flow

### Authentication Flow
1. User submits login/registration form
2. Backend validates credentials and creates JWT token
3. Token stored in localStorage and included in API requests
4. Protected routes check for valid tokens

### Social Interaction Flow
1. User creates post/story through frontend form
2. Data sent to Express API with authentication
3. Drizzle ORM validates and stores in PostgreSQL
4. Real-time updates through React Query cache invalidation

### Analytics Flow
1. User actions tracked and stored in analytics table
2. Dashboard queries aggregated data for charts
3. Metrics displayed in admin interface

## External Dependencies

### Database
- **Neon Database**: Serverless PostgreSQL hosting
- **Drizzle Kit**: Database migrations and schema management
- **Connection Pooling**: @neondatabase/serverless for efficient connections

### UI Components
- **Radix UI**: Headless component primitives
- **Lucide Icons**: Icon library for consistent iconography
- **Tailwind CSS**: Utility-first CSS framework

### Development Tools
- **Replit Integration**: Vite plugins for development environment
- **TypeScript**: Type safety across frontend and backend
- **ESLint/Prettier**: Code formatting and linting

## Deployment Strategy

### Development Mode
- Vite dev server for frontend with HMR
- tsx for backend development with auto-reload
- Drizzle Kit for database schema management

### Production Build
- Vite builds optimized React bundle
- esbuild creates Node.js server bundle
- Static assets served from dist/public
- Environment variables for configuration

### Database Management
- Drizzle migrations in `/migrations` directory
- Schema definitions in `/shared/schema.ts`
- Push command for development schema updates

### File Structure
- `/client`: React frontend application
- `/server`: Express backend with API routes
- `/shared`: Shared TypeScript types and schema
- `/migrations`: Database migration files

The application follows a monorepo structure with clear separation between frontend, backend, and shared code, making it easy to maintain and scale.
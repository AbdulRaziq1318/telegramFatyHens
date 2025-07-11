# Fat Hen - Feed & Earn (Telegram MiniApp)

## Overview

This is a Telegram MiniApp called "Fat Hen - Feed & Earn" built with React, TypeScript, and TailwindCSS. It's a casual clicker/idle game where users collect eggs from a fat hen by keeping it fed. The application uses a modern full-stack architecture with a React frontend and Express backend, designed for mobile-first experience within Telegram.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **React 18** with TypeScript for the user interface
- **Single Page Application (SPA)** with client-side routing using state management
- **TailwindCSS** for styling with shadcn/ui component library
- **Mobile-first responsive design** optimized for Telegram WebApp viewport
- **Vite** as the build tool and development server

### Backend Architecture
- **Express.js** server with TypeScript
- **RESTful API** design with `/api` prefix for all endpoints
- **In-memory storage** with interface for easy database migration
- **Middleware-based** request/response handling with logging

### Database Strategy
- Currently uses **in-memory storage** (MemStorage class)
- **Drizzle ORM** configured for PostgreSQL migration
- **Schema-first approach** with Zod validation
- Database configuration ready for Neon serverless PostgreSQL

## Key Components

### Game Logic
- **useGameState hook**: Central state management for game mechanics
- **Offline progression**: Calculates earnings while app is closed
- **LocalStorage persistence**: Game state survives app restarts
- **Real-time updates**: Automatic egg laying with timer-based mechanics

### UI Components
- **Bottom Navigation**: Five-tab navigation (Home, Tasks, Referrals, Leaderboard, Profile)
- **Hen Character**: Interactive animated hen with tap mechanics
- **Ad Modal**: Simulated advertisement viewing system
- **Game Pages**: Dedicated pages for each game feature

### Game Features
1. **Automatic Egg Laying**: Hen lays eggs every 2 seconds when fed
2. **Manual Tapping**: Users can tap hen for eggs when out of food
3. **Booster System**: 3x speed multiplier activated by watching ads
4. **Task System**: Daily tasks that reward food packets
5. **Referral System**: Invite friends for additional food rewards
6. **Leaderboard**: Weekly rankings based on egg collection

## Data Flow

1. **Game State Management**: Centralized in `useGameState` hook with localStorage persistence
2. **Component Communication**: Props-based for parent-child, state lifting for sibling components
3. **API Communication**: TanStack Query for server state management (prepared but minimal backend currently)
4. **Real-time Updates**: JavaScript intervals for egg laying and booster timers
5. **Offline Handling**: Time-based calculations when app reopens

## External Dependencies

### Core Framework
- React 18 with TypeScript
- Express.js for backend API
- Vite for development and building

### UI & Styling
- TailwindCSS for utility-first styling
- Radix UI primitives for accessible components
- shadcn/ui component library
- Lucide React for icons

### State & Data Management
- TanStack React Query for server state
- localStorage for game persistence
- Drizzle ORM for database operations
- Zod for schema validation

### Database
- PostgreSQL (via Neon serverless) - configured but not actively used
- Drizzle Kit for migrations
- Connection ready via DATABASE_URL environment variable

## Deployment Strategy

### Development
- Vite dev server with HMR for frontend
- tsx for running TypeScript backend in development
- Replit-specific plugins for development environment

### Production Build
- Frontend: Vite builds static assets to `dist/public`
- Backend: esbuild bundles server code to `dist/index.js`
- Single deployment target with static file serving

### Environment Configuration
- Environment-based configuration (NODE_ENV)
- Database URL configuration for production PostgreSQL
- Replit-specific development tools and error overlays

### Scalability Considerations
- Stateless backend design ready for horizontal scaling
- Database abstraction layer allows easy migration from memory to PostgreSQL
- Component-based architecture supports feature additions
- Mobile-optimized performance for Telegram WebApp constraints
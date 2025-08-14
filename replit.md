# Marketing Analytics Dashboard

## Overview

This is a comprehensive marketing analytics dashboard that aggregates data from multiple sources including Google Analytics 4, Google Search Console, and HubSpot CRM. The application provides a unified view of key marketing metrics, traffic trends, and lead generation performance through interactive visualizations and data tables.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **React SPA**: Built with TypeScript and React, using Vite as the build tool and development server
- **UI Framework**: Implements shadcn/ui component library with Radix UI primitives for accessible, customizable components
- **Styling**: Uses Tailwind CSS with custom design tokens following Google's Material Design principles
- **State Management**: TanStack React Query for server state management and data caching
- **Routing**: Wouter for lightweight client-side routing

### Backend Architecture
- **Express.js Server**: RESTful API server with TypeScript support
- **Data Storage**: Currently uses in-memory storage with mock data generators for development
- **Database Ready**: Configured with Drizzle ORM and PostgreSQL schema definitions for production deployment
- **API Design**: Single endpoint architecture (`/api/dashboard/overview`) that aggregates all dashboard data

### Component Structure
- **Dashboard Layout**: Modular component architecture with separate components for header, metrics, charts, and data tables
- **Chart Components**: Uses Recharts library for interactive data visualizations including line charts and pie charts
- **Responsive Design**: Mobile-first approach with adaptive layouts using Tailwind's responsive utilities

### Data Integration Strategy
- **Mock Data Layer**: Comprehensive mock data generators for GA4 sessions, page analytics, search console queries, HubSpot leads, and funnel metrics
- **Aggregation Logic**: Server-side data processing to calculate trends, totals, and conversion rates
- **Type Safety**: Shared TypeScript schemas between frontend and backend using Zod validation

### Development Environment
- **Hot Reloading**: Vite development server with HMR for rapid development
- **Build Process**: Optimized production builds with code splitting and asset optimization
- **Path Aliases**: Configured import aliases for clean, maintainable code organization

## External Dependencies

### Core Framework Dependencies
- **React Ecosystem**: React 18 with TypeScript, React DOM, and development tools
- **Build Tools**: Vite for bundling and development server, esbuild for production builds
- **Server Framework**: Express.js with TypeScript support (tsx for development execution)

### UI and Styling Libraries
- **Component Library**: Comprehensive shadcn/ui implementation with 25+ Radix UI components
- **Styling**: Tailwind CSS with PostCSS and Autoprefixer for cross-browser compatibility
- **Icons**: Lucide React for consistent icon system
- **Charts**: Recharts for data visualization components

### Data Management
- **State Management**: TanStack React Query for server state and caching
- **Database ORM**: Drizzle ORM with PostgreSQL dialect and Zod schema validation
- **Database Provider**: Neon Database serverless PostgreSQL (configured but not actively used)
- **Session Management**: connect-pg-simple for PostgreSQL session store

### Form and Validation
- **Form Handling**: React Hook Form with Hookform Resolvers
- **Schema Validation**: Zod for runtime type checking and validation
- **UI Components**: Integrated form components with validation states

### Utility Libraries
- **Styling Utilities**: clsx and class-variance-authority for conditional styling
- **Date Handling**: date-fns for date manipulation and formatting
- **Development Tools**: Various development utilities including error overlays and debugging tools

### Planned Integrations
- **Google Analytics 4**: API integration for real-time analytics data
- **Google Search Console**: Search performance and keyword data
- **HubSpot CRM**: Lead management and customer relationship data
- **Authentication**: User authentication system for secure access
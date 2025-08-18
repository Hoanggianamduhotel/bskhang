# Medical Clinic Management System

## Overview

This is a comprehensive medical clinic management system built with Next.js and TypeScript. The application provides a complete solution for managing patient records, medical examinations, prescriptions, and clinical statistics. It supports multiple user roles including doctors, receptionists, and pharmacists, with role-based access control and specialized interfaces for each user type.

The system features a modern, responsive design with both light and dark theme support, real-time data synchronization, and an intuitive user interface that streamlines clinical workflows.

Recent updates (August 17, 2025):
- Optimized repository size with proper .gitignore for fast GitHub deployment
- Enhanced patient name formatting with automatic capitalization
- Improved age display logic (36-month threshold for month vs age display)
- Fixed TypeScript errors for better code quality

## User Preferences

Preferred communication style: Simple, everyday language.
Repository management: Lightweight repo structure, optimized for GitHub deployment.

## System Architecture

### Frontend Architecture
- **Framework**: Next.js 14 with TypeScript for type safety and modern React features
- **UI Components**: Combination of Material-UI (@mui/material) and shadcn/ui components for consistent design
- **Styling**: Tailwind CSS with custom CSS variables for theming support
- **State Management**: React hooks and local component state for data management
- **Navigation**: Role-based routing with conditional component rendering

### Authentication & Authorization
- **Provider**: Supabase Authentication with session management
- **Role System**: User roles stored in database (doctor, receptionist, pharmacist)
- **Session Handling**: Persistent authentication state with automatic token refresh
- **Access Control**: Role-based component visibility and feature access

### Database Architecture
- **Primary Database**: Supabase (PostgreSQL) for all application data
- **Key Tables**:
  - `benhnhan` (patients) - Patient demographic and contact information
  - `khambenh` (examinations) - Medical examination records and diagnoses
  - `toathuoc` (prescriptions) - Prescription details and medication data
  - `thuoc` (medications) - Medication inventory and pricing
  - `danhsachcho` (waiting list) - Daily patient queue management
- **Views**: Database views (`v_toaduocsi`) for complex statistical queries
- **Real-time**: Supabase real-time subscriptions for live data updates

### Component Architecture
- **Modular Design**: Feature-based component organization
- **Ref Forwarding**: Component communication through imperative handles
- **Form Management**: Controlled components with validation
- **Data Grids**: Material-UI DataGrid for tabular data presentation
- **Search & Autocomplete**: Real-time search with debounced API calls

### User Interface Features
- **Responsive Design**: Mobile-first approach with adaptive layouts
- **Theme System**: Light/dark mode toggle with CSS custom properties
- **Interactive Elements**: Drag-and-drop widgets and floating action buttons
- **Print Functionality**: Prescription printing with formatted layouts
- **Data Visualization**: Tables and statistics for medical data analysis

### Medical Workflow Integration
- **Patient Queue**: Daily waiting list management with real-time updates
- **Examination Flow**: Structured medical examination with symptom and diagnosis tracking
- **Prescription Management**: Comprehensive medication dosage calculations and inventory tracking
- **Visit History**: Complete patient medical history with searchable records
- **Statistical Reports**: Usage analytics and medication tracking reports

## External Dependencies

### Core Framework Dependencies
- **Next.js 14**: React framework for production applications
- **React 18**: Frontend library with concurrent features
- **TypeScript**: Static type checking and enhanced developer experience

### UI and Styling
- **Material-UI (MUI)**: Component library for consistent design patterns
- **shadcn/ui**: Modern component primitives with Radix UI foundation
- **Tailwind CSS**: Utility-first CSS framework for responsive design
- **Lucide React**: Icon library for user interface elements

### Database and Backend
- **Supabase**: Backend-as-a-Service providing authentication, database, and real-time features
- **PostgreSQL**: Relational database through Supabase hosting

### Development Tools
- **ESLint**: Code linting and quality enforcement
- **PostCSS**: CSS processing and optimization
- **Autoprefixer**: CSS vendor prefix automation

### Deployment Configuration
- **Vercel**: Hosting platform with build configuration
- **Environment Variables**: Secure configuration management for API keys and database connections

The system is designed to be easily deployable on cloud platforms with minimal configuration, using environment variables for sensitive data and supporting both development and production environments.
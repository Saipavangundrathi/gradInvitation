# UAB Graduation Celebration Website

A celebratory digital platform for UAB graduates that showcases their academic achievements and memorable moments.

## Project Overview

This project is a full-stack JavaScript application built with:
- React + Vite frontend
- Express backend
- In-memory database for storing RSVPs

## How to Run in VS Code

### Prerequisites
- Node.js (v16 or higher)
- npm (comes with Node.js)

### Setup Instructions

1. **Clone the Repository**
   ```
   git clone <repository-url>
   cd UABGradStory
   ```

2. **Install Dependencies**
   ```
   npm install
   ```

3. **Running the Project**

   There are two ways to run the project:

   **Option 1: Standard Method (May have port conflicts)**
   ```
   npm run dev
   ```
   This starts the server on port 5000 by default.

   **Option 2: Using local-start.js (Recommended for local development)**
   ```
   node local-start.js
   ```
   This will start the server on port 3000 by default, avoiding conflicts with port 5000.

   If you want to specify a different port:
   ```
   PORT=4000 node local-start.js
   ```

4. **Access the Application**
   
   Once started, the application will be available at:
   - Standard method: http://localhost:5000
   - Using local-start.js: http://localhost:3000 (or your specified port)

### Troubleshooting Port Issues

If you encounter errors like `ENOTSUP: operation not supported on socket` or `EADDRINUSE`:

1. Try using the local-start.js script which will use a different port.
2. Check if you have another service running on port 5000 and stop it.
3. Manually specify a different port using the PORT environment variable:
   ```
   PORT=3001 npm run dev
   ```

## Project Structure

- **client/src/** - Frontend React application
  - **/components** - UI components
  - **/pages** - Page components
  - **/lib** - Utility functions and hooks

- **server/** - Backend Express server
  - **index.ts** - Main server file
  - **routes.ts** - API route definitions
  - **storage.ts** - In-memory data storage

- **shared/** - Shared code between frontend and backend
  - **schema.ts** - Data schema definitions

- **attached_assets/** - Images and other static assets

## Features

- Countdown timer to graduation day
- Academic journey timeline
- Graduate profiles
- Photo gallery
- RSVP system for guests
- Directions to the venue
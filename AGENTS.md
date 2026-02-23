# AGENTS.md - Developer Guidelines for Meet Project

## Project Overview
- **Project Name**: meet (Google Meet clone)
- **Type**: Node.js/Express + Socket.io real-time application
- **Language**: TypeScript (ESM modules)
- **Main Entry**: `src/index.ts`

---

## Build, Lint, and Test Commands

### Build
```bash
npm run build    # Compiles TypeScript to JavaScript (outputs to dist/)
```

### Run
```bash
npm run dev      # Development server with hot reload (tsx watch)
npm run start    # Run compiled production server
```

### Type Checking
```bash
npx tsc --noEmit  # Type-check without emitting files
```

### Testing
- **No tests currently exist** in this project.
- If adding tests, use a framework compatible with ESM (e.g., Vitest, Node.js native test runner).
- Run a single test file: `npx vitest run <path-to-test>` or `node --test <path-to-test>`

---

## Code Style Guidelines

### General Principles
- No comments in code (unless explaining complex business logic)
- Keep functions small and focused
- Use meaningful variable and function names
- Prefer explicit over implicit

### TypeScript Configuration
The project uses strict TypeScript with these settings:
- `strict: true` - Enable all strict type-checking
- `noUncheckedIndexedAccess: true` - Accessing array elements requires checks
- `noImplicitAny: true` - No implicit `any` types
- `verbatimModuleSyntax: true` - Use `.js` extensions in imports
- `isolatedModules: true` - Ensure compatibility with bundlers

### Imports and Exports
- Use `.js` extension for all local imports (required by `verbatimModuleSyntax`)
- Use absolute imports from package names
- Group imports: external libraries first, then internal modules
- Example:
  ```typescript
  import express, { type Application } from "express";
  import { createServer } from "http";
  import { ENV } from "./config/env.js";
  import { AppError } from "./errors/AppError.js";
  ```

### Naming Conventions
- **Files**: PascalCase for classes/components, camelCase otherwise (e.g., `AppError.ts`, `SocketController.ts`)
- **Classes**: PascalCase (e.g., `AppError`, `ResponseTemplate`)
- **Functions/variables**: camelCase
- **Constants**: SCREAMING_SNAKE_CASE (e.g., `ENV.PORT`)
- **Interfaces**: PascalCase, often with `I` prefix optional (current codebase doesn't use prefix)

### Error Handling
- Use custom `AppError` class from `src/errors/AppError.ts`
- AppError properties: `message`, `status`, `appError: true`
- Return errors using the `Responder` utility:
  ```typescript
  return responder()
    .err(new AppError(`Route '${req.originalUrl}' does not exist`, 404))
    .send(res);
  ```

### Response Pattern
Use the `Responder` utility for consistent API responses:
```typescript
import { responder } from "./utils/Responder.js";

// Success response
responder()
  .code(200)
  .mess("success")
  .payload({ key: "value" })
  .send(res);

// Error response
responder()
  .err(new AppError("Something went wrong", 500))
  .send(res);
```

### Directory Structure
```
src/
├── index.ts           # Entry point
├── app.ts             # Express app setup
├── config/
│   └── env.ts         # Environment configuration
├── controllers/       # Socket.io controllers
├── errors/
│   └── AppError.ts    # Custom error class
├── routes/            # Express routers
├── types/             # TypeScript type definitions
└── utils/             # Utility functions (Responder, etc.)
```

### Express Routes
- Use Express Router for route modules
- Group routes under `/api/v1` prefix (set in `app.ts`)
- Export default router from route files

### Environment Variables
- Use `.env` file at project root
- Required variables managed in `src/config/env.ts`
- Valid profiles: `env`, `dev`, `uat`, `test`, `qa`, `prod`

### Logging
- Use `console.log` for server startup messages
- Use `morgan` middleware (enabled in dev profile) for HTTP request logging

---

## Adding New Features

### Adding a New Route
1. Create route file in `src/routes/`
2. Import Router from Express
3. Export default router
4. Import and use in `src/routes/IndexRouter.ts`

### Adding a New Controller
1. Create controller in `src/controllers/`
2. Export functions that handle business logic

### Adding Environment Variables
1. Add to `.env` file
2. Add to `ENV` object in `src/config/env.ts`
3. Add type definition if needed

---

## Important Notes
- This is an ESM-only project (no CommonJS)
- All imports must include `.js` extension
- Run `npm run build` before deploying
- The project uses Socket.io for real-time WebSocket connections

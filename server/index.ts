import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve static files from the attached_assets directory
app.use('/attached_assets', express.static('attached_assets'));

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  const server = await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // Try to serve the app on port 5000, fallback to other ports if needed
  // this serves both the API and the client
  const port = process.env.PORT ? parseInt(process.env.PORT) : 5000;
  
  // For local development, try alternative ports if 5000 is occupied
  const startServer = (currentPort: number, maxRetries = 3) => {
    server.listen({
      port: currentPort,
      host: "0.0.0.0",
    })
    .on('error', (err: any) => {
      if (err.code === 'EADDRINUSE' || err.code === 'ENOTSUP') {
        if (maxRetries > 0) {
          log(`Port ${currentPort} is in use or not supported, trying port ${currentPort + 1}`);
          startServer(currentPort + 1, maxRetries - 1);
        } else {
          log(`Could not find an available port. Try setting PORT environment variable.`);
          throw err;
        }
      } else {
        throw err;
      }
    })
    .on('listening', () => {
      log(`Server running at http://localhost:${currentPort}`);
    });
  };
  
  startServer(port);
})();

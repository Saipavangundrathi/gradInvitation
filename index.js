// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// server/storage.ts
var MemStorage = class {
  users;
  rsvpList;
  currentUserId;
  currentRsvpId;
  constructor() {
    this.users = /* @__PURE__ */ new Map();
    this.rsvpList = /* @__PURE__ */ new Map();
    this.currentUserId = 1;
    this.currentRsvpId = 1;
  }
  async getUser(id) {
    return this.users.get(id);
  }
  async getUserByUsername(username) {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }
  async createUser(insertUser) {
    const id = this.currentUserId++;
    const user = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  async createRsvp(insertRsvp) {
    const id = this.currentRsvpId++;
    const rsvp = {
      id,
      name: insertRsvp.name,
      email: insertRsvp.email,
      phone: insertRsvp.phone === void 0 ? null : insertRsvp.phone,
      attending: insertRsvp.attending,
      guests: insertRsvp.guests,
      message: insertRsvp.message === void 0 ? null : insertRsvp.message
    };
    this.rsvpList.set(id, rsvp);
    return rsvp;
  }
  async getRsvps() {
    return Array.from(this.rsvpList.values());
  }
  async getRsvpsByAttending(attending) {
    return Array.from(this.rsvpList.values()).filter(
      (rsvp) => rsvp.attending === attending
    );
  }
};
var storage = new MemStorage();

// shared/schema.ts
import { pgTable, text, serial } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
var users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull()
});
var rsvps = pgTable("rsvps", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  attending: text("attending").notNull(),
  guests: text("guests").notNull(),
  message: text("message")
});
var insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true
});
var insertRsvpSchema = createInsertSchema(rsvps).pick({
  name: true,
  email: true,
  phone: true,
  attending: true,
  guests: true,
  message: true
});

// server/routes.ts
import { z } from "zod";
import { fromZodError } from "zod-validation-error";
async function registerRoutes(app2) {
  app2.post("/api/rsvp", async (req, res) => {
    try {
      const validatedData = insertRsvpSchema.parse(req.body);
      const rsvp = await storage.createRsvp(validatedData);
      res.status(201).json({
        message: "RSVP submitted successfully",
        data: rsvp
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const validationError = fromZodError(error);
        res.status(400).json({
          message: "Validation failed",
          errors: validationError.message
        });
      } else {
        console.error("Error creating RSVP:", error);
        res.status(500).json({
          message: "Failed to submit RSVP"
        });
      }
    }
  });
  app2.get("/api/rsvp", async (_req, res) => {
    try {
      const rsvps2 = await storage.getRsvps();
      res.status(200).json({
        data: rsvps2
      });
    } catch (error) {
      console.error("Error fetching RSVPs:", error);
      res.status(500).json({
        message: "Failed to fetch RSVPs"
      });
    }
  });
  app2.get("/api/rsvp/attending/:status", async (req, res) => {
    try {
      const status = req.params.status;
      if (status !== "yes" && status !== "no") {
        return res.status(400).json({
          message: "Invalid status parameter. Must be 'yes' or 'no'."
        });
      }
      const rsvps2 = await storage.getRsvpsByAttending(status);
      res.status(200).json({
        data: rsvps2
      });
    } catch (error) {
      console.error("Error fetching RSVPs by attending status:", error);
      res.status(500).json({
        message: "Failed to fetch RSVPs"
      });
    }
  });
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2, { dirname as dirname2 } from "path";
import { fileURLToPath as fileURLToPath2 } from "url";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import themePlugin from "@replit/vite-plugin-shadcn-theme-json";
import path, { dirname } from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
import { fileURLToPath } from "url";
var __filename = fileURLToPath(import.meta.url);
var __dirname = dirname(__filename);
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    themePlugin(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client", "src"),
      "@shared": path.resolve(__dirname, "shared")
    }
  },
  root: path.resolve(__dirname, "client"),
  build: {
    outDir: path.resolve(__dirname, "dist/public"),
    emptyOutDir: true
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var __filename2 = fileURLToPath2(import.meta.url);
var __dirname2 = dirname2(__filename2);
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        __dirname2,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(__dirname2, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use("/attached_assets", express2.static("attached_assets"));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const isReplit = process.env.REPL_ID !== void 0;
  const port = process.env.PORT ? parseInt(process.env.PORT) : isReplit ? 5e3 : 3e3;
  const startServer = (currentPort, maxRetries = 3) => {
    server.listen({
      port: currentPort,
      host: "0.0.0.0"
    }).on("error", (err) => {
      if (err.code === "EADDRINUSE" || err.code === "ENOTSUP") {
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
    }).on("listening", () => {
      log(`Server running at http://localhost:${currentPort}`);
    });
  };
  startServer(port);
})();

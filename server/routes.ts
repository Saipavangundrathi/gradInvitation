import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertRsvpSchema } from "@shared/schema";
import { z } from "zod";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // put application routes here
  // prefix all routes with /api

  // RSVP endpoint to handle form submissions
  app.post("/api/rsvp", async (req: Request, res: Response) => {
    try {
      // Validate the request body against the schema
      const validatedData = insertRsvpSchema.parse(req.body);
      
      // Create the RSVP entry in storage
      const rsvp = await storage.createRsvp(validatedData);
      
      // Return success response
      res.status(201).json({
        message: "RSVP submitted successfully",
        data: rsvp
      });
    } catch (error) {
      // If there's a validation error, return a friendly error message
      if (error instanceof z.ZodError) {
        const validationError = fromZodError(error);
        res.status(400).json({
          message: "Validation failed",
          errors: validationError.message
        });
      } else {
        // For any other errors
        console.error("Error creating RSVP:", error);
        res.status(500).json({
          message: "Failed to submit RSVP"
        });
      }
    }
  });

  // Get all RSVPs
  app.get("/api/rsvp", async (_req: Request, res: Response) => {
    try {
      const rsvps = await storage.getRsvps();
      res.status(200).json({
        data: rsvps
      });
    } catch (error) {
      console.error("Error fetching RSVPs:", error);
      res.status(500).json({
        message: "Failed to fetch RSVPs"
      });
    }
  });

  // Get RSVPs filtered by attending status
  app.get("/api/rsvp/attending/:status", async (req: Request, res: Response) => {
    try {
      const status = req.params.status;
      if (status !== 'yes' && status !== 'no') {
        return res.status(400).json({
          message: "Invalid status parameter. Must be 'yes' or 'no'."
        });
      }
      
      const rsvps = await storage.getRsvpsByAttending(status);
      res.status(200).json({
        data: rsvps
      });
    } catch (error) {
      console.error("Error fetching RSVPs by attending status:", error);
      res.status(500).json({
        message: "Failed to fetch RSVPs"
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}

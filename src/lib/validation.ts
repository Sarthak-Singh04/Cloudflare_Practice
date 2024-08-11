import { z } from "zod";

export const ProjectSchema = z.object({
  id: z.string(),
  content: z.string(),
  userId: z.string(),
  createdAt: z.string().datetime(), // Expect an ISO 8601 date string
  // Add any other fields from your Project model
});

export const CreateProjectSchema = z.object({
  content: z.string().min(1),
  userId: z.string().uuid(),
});

export const UpdateProjectSchema = z.object({
  content: z.string().min(1).optional(),
  userId: z.string().uuid().optional(),
});

export type Project = z.infer<typeof ProjectSchema>;
import { z } from "zod";

export const zodUserSchema = z.object({
  PhoneNumber: z.string().min(10),
  password: z.string().min(8),
});

export const zodChannelSchema = z.object({
  name: z
    .string()
    .min(3, "Name is required and should be more than 3 character"),
});

export const zodMovieSchema = z.object({
  title: z.string().min(1, "Title is required"),
  duration: z.number().int().positive("Duration must be a positive integer"),
  description: z.string().min(1, "Description is required"),
  status: z.enum(["active", "inactive"]).optional().default("active"),
  channelId: z.number().int().positive("Channel ID must be a positive integer"),
  typeId: z.number().int().positive("Type ID must be a positive integer"),
  categoryId: z
    .number()
    .int()
    .positive("Category ID must be a positive integer"),
  videoUrl: z.string().url("Video URL must be a valid URL"),
});

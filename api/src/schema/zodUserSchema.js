import { z } from "zod";

export const zodUserSchema = z.object({
  PhoneNumber: z.string().min(10),
  password: z.string().min(8),
});

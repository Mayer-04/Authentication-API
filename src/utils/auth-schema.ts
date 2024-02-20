import { z } from "zod";

export const registerSchema = z.object({
  username: z.string().min(4),
  email: z.string().email(),
  password: z.string().min(6),
  passwordConfirmation: z.string().min(6),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

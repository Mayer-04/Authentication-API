import { z } from "zod";

const message = "Passwords do not match";
const path = ["confirmPassword"];

export const registerSchema = z
  .object({
    username: z.string().min(4),
    email: z.string().email(),
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message,
    path,
  });

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

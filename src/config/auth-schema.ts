import { z } from "zod";

export const registerSchema = z
  .object({
    username: z.string().min(4),
    email: z.string().email(),
    password: z.string().min(6),
    passwordConfirmation: z.string().min(6),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords do not match",
    path: ["passwordConfirmation"],
  });

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

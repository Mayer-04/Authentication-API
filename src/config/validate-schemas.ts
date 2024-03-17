import { loginSchema, registerSchema } from "@config/index";
import type { Login, Register } from "@src/types";

export const validateRegister = (body: Register) => {
  return registerSchema.safeParse(body);
};

export const validateLogin = (body: Login) => {
  return loginSchema.safeParse(body);
};

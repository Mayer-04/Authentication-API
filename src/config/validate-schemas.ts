import { Register, Login } from "@src/types";
import { registerSchema, loginSchema } from "@config/index";

export const validateRegister = (body: Register) => {
  return registerSchema.safeParse(body);
};

export const validateLogin = (body: Login) => {
  return loginSchema.safeParse(body);
};

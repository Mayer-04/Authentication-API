import type { CookieOptions } from "express";

export const cookieOptions: CookieOptions = {
  httpOnly: true,
  maxAge: 86400000,
  sameSite: "none",
  secure: true,
};

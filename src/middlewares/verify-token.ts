import { validateToken } from "@config/index";
import type { NextFunction, Request, Response } from "express";

type Token = string;

export const verifyToken = (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  try {
    // const token: Token = request.cookies["token"];
    const token: Token = request.cookies.token;
    if (!token) {
      return response.status(401).json({ message: "No token provided" });
    }

    const validPayload = validateToken(token);

    if (!validPayload) {
      return response.status(403).json({ message: "Invalid token" });
    }

    next();
  } catch (error) {
    console.error(error);
    return response.status(500).json({ message: "Internal server error" });
  }
};

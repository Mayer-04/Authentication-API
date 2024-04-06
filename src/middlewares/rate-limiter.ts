import { rateLimiterOptions } from "@utils/index";
import type { NextFunction, Request, Response } from "express";
import { RateLimiterMemory } from "rate-limiter-flexible";

const rateLimiter = new RateLimiterMemory(rateLimiterOptions);

export const rateLimitMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  try {
    const { ip } = request;

    if (!ip) {
      throw new Error("IP not found");
    }

    const remainingPoints = await rateLimiter.consume(ip);

    response.set({
      "X-RateLimit-Limit": rateLimiterOptions.points,
      "X-RateLimit-Remaining": remainingPoints,
      "X-RateLimit-Reset":
        new Date().getTime() / 1000 + rateLimiterOptions.duration,
    });

    next();
  } catch (error) {
    return response.status(429).json({ message: "Too Many Requests" });
  }
};

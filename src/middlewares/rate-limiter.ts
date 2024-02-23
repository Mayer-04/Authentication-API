import { Request, Response, NextFunction } from "express";
import { RateLimiterMemory } from "rate-limiter-flexible";
import { rateLimiterOptions } from "@utils/index";

const rateLimiter = new RateLimiterMemory(rateLimiterOptions);

export const rateLimitMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const { ip } = request;

    const userIdentifier = `${ip}`;
    const remainingPoints = await rateLimiter.consume(userIdentifier);

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
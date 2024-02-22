import { Router } from "express";
import { AuthController } from "@controllers/auth-controller";
import { AuthMongoDB } from "@src/models/mongo";
import { rateLimitMiddleware } from "@src/middlewares/rate-limiter";

export const authRouter = Router();

const authMongoDB = new AuthMongoDB();
const authController = new AuthController(authMongoDB);

authRouter.post("/register", authController.register);
authRouter.post("/login", rateLimitMiddleware, authController.login);

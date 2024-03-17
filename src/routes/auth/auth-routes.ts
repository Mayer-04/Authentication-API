import { AuthController } from "@controllers/auth-controller";
import { rateLimitMiddleware } from "@src/middlewares/rate-limiter";
import { AuthMongoDB } from "@src/models/mongo";
import { Router } from "express";

export const authRouter = Router();

const authMongoDB = new AuthMongoDB();
const authController = new AuthController(authMongoDB);

authRouter.post("/register", authController.register);
authRouter.post("/login", rateLimitMiddleware, authController.login);

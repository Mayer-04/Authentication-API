import { Router } from "express";
import { AuthController } from "@controllers/auth-controller";
import { AuthMongoDB } from "@src/models/mongo";

export const authRouter = Router();

const authMongoDB = new AuthMongoDB();
const authController = new AuthController(authMongoDB);

authRouter.post("/register", authController.register);
authRouter.post("/login", authController.login);

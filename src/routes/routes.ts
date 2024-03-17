import { authRouter } from "@routes/auth/auth-routes";
import { Router } from "express";

export const router = Router();

router.use("/api/auth", authRouter);

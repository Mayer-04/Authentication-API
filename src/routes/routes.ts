import { Router } from "express";
import { authRouter } from "@routes/auth/auth-routes";

export const router = Router();

router.use("/api/auth", authRouter);
router.use("/api/auth", authRouter);

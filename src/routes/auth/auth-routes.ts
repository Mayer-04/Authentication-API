import { Router } from "express";

export const authRouter = Router();

authRouter.post("/login", (req, res) => {
  res.send("Soy el Login");
});

authRouter.post("/register", (req, res) => {
  res.send("Soy el Register");
});

import { Request, Response } from "express";
import { AuthMongoDB } from "@src/models/mongo";
import { validateRegister, validateLogin } from "@src/utils";

export class AuthController {
  constructor(private authMongoDB: AuthMongoDB) {}

  register = async (request: Request, response: Response) => {
    const body = validateRegister(request.body);

    if (!body.success) {
      return response.status(400).json({ message: body.error.message });
    }
    try {
      const user = await this.authMongoDB.register(body.data);

      if (user) {
        return response.status(400).json({ message: "User already exists" });
      }

      return response.status(201).json({ user });
    } catch (error) {
      return response
        .status(500)
        .json({ message: "Internal server error", error });
    }
  };

  login = async (request: Request, response: Response) => {
    const body = validateLogin(request.body);

    if (!body.success) {
      return response.status(400).json({ message: body.error.message });
    }
    try {
      const user = await this.authMongoDB.login(body.data);

      return response.status(200).json({ user });
    } catch (error) {
      return response
        .status(500)
        .json({ message: "Internal server error", error });
    }
  };
}

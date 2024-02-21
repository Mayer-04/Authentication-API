import { Request, Response } from "express";
import { AuthMongoDB } from "@src/models/mongo";
import { validateRegister, validateLogin } from "@config/index";

export class AuthController {
  constructor(private authMongoDB: AuthMongoDB) {}

  register = async (request: Request, response: Response) => {
    const body = validateRegister(request.body);

    if (!body.success) {
      return response.status(400).json({ message: body.error });
    }
    try {
      const { data } = body;
      const { username, email } = data;
      const user = await this.authMongoDB.register(data);

      if (user) {
        return response
          .status(409)
          .json({ message: "Error creating user - User already exists" });
      }
      return response.status(201).json({
        message: "User created successfully",
        user: { username, email },
      });
    } catch (error) {
      return response
        .status(500)
        .json({ message: "Internal server error", error });
    }
  };

  login = async (request: Request, response: Response) => {
    const body = validateLogin(request.body);

    if (!body.success) {
      return response.status(400).json({ message: body.error });
    }

    try {
      const { data } = body;
      const user = await this.authMongoDB.login(data);
      console.log({ controler: user });

      if (!user) {
        return response.status(404).json({
          message: "User not found",
        });
      }

      return response.status(200).json({ user });
    } catch (error) {
      return response
        .status(500)
        .json({ message: "Internal server error", error });
    }
  };
}

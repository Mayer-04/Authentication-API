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
      const user = await this.authMongoDB.register(body.data);

      if (user) {
        return response
          .status(409)
          .json({ message: "Error creating user - User already exists" });
      }
      return response
        .status(201)
        .json({ message: "User created successfully", user: body.data });
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

    console.log(body);
    try {
      const user = await this.authMongoDB.login(body.data);

      if (user === null) {
        return response
          .status(404)
          .json({ message: "User does not exists - email" });
      }

      return response.status(200).json({
        message: "User logged in successfully",
        user: body.data,
      });
    } catch (error) {
      return response
        .status(500)
        .json({ message: "Internal server error", error });
    }
  };
}

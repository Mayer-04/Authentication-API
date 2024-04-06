import { generateToken, validateLogin, validateRegister } from "@config/index";
import type { AuthMongoDB } from "@src/models/mongo";
import { cookieOptions } from "@src/utils";
import type { Request, Response } from "express";

export class AuthController {
  constructor(private authMongoDB: AuthMongoDB) {}

  register = async (request: Request, response: Response) => {
    const body = validateRegister(request.body);

    if (!body.success) {
      return response
        .status(400)
        .json({ message: body.error.issues[0].message });
    }
    try {
      const { data } = body;
      const { username, email } = data;
      const user = await this.authMongoDB.register(data);

      if (user) {
        return response
          .status(409)
          .json({ success: false, message: "Error creating user" });
      }
      return response.status(201).json({
        success: true,
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
      return response
        .status(400)
        .json({ message: body.error.issues[0].message });
    }

    try {
      const { data } = body;
      const loginResult = await this.authMongoDB.login(data);

      if (!loginResult.user) {
        return response.status(401).json({ message: "Invalid email" });
      }

      if (!loginResult.passwordMatch) {
        return response.status(401).json({ message: "Invalid password" });
      }

      const userId = loginResult.user._id;

      if (!userId) {
        return response.status(404).json({ message: "User id not found" });
      }

      const tokenPayload = {
        _id: userId,
        username: loginResult.user.username,
      };

      const token = generateToken(tokenPayload);

      response.cookie("token", token, cookieOptions);

      return response.status(200).json({
        success: true,
        token,
      });
    } catch (error) {
      return response
        .status(500)
        .json({ message: "Internal server error", error });
    }
  };
}

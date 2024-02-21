import { Request, Response } from "express";
import { AuthMongoDB } from "@src/models/mongo";
import { validateRegister, validateLogin } from "@config/index";
import { Jwt } from "@config/index";
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
      const loginResult = await this.authMongoDB.login(data);

      if (!loginResult.user) {
        return response.status(401).json({ message: "Invalid email" });
      }

      if (!loginResult.passwordMatch) {
        return response.status(401).json({ message: "Invalid password" });
      }

      const userId = loginResult.user._id;

      if (!userId) {
        return response.status(500).json({ message: "User id not found" });
      }

      const token = Jwt.generateToken({
        _id: userId,
        username: loginResult.user.username,
      });

      response.cookie("token", token, { httpOnly: true });

      return response.status(200).json({
        message: "Login successful",
        token,
      });
    } catch (error) {
      return response
        .status(500)
        .json({ message: "Internal server error", error });
    }
  };
}

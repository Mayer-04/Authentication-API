import { createCollection } from "@database/mongodb/create-collection";
import { comparePassword, hashPassword } from "@src/config";
import type { Login, LoginResult, Register } from "@src/types";

export class AuthMongoDB {
  private usersCollection = createCollection();

  async getUserByEmail(email: string) {
    try {
      const user = await this.usersCollection.findOne({ email });
      return user;
    } catch (error) {
      throw new Error("Error finding user by email", { cause: error });
    }
  }

  async register(userData: Register) {
    const { username, email, password } = userData;

    const existingUser = await this.getUserByEmail(email);

    if (existingUser) {
      return existingUser;
    }

    const hashedPassword = await hashPassword(password);

    const user = {
      username: username,
      email: email,
      password: hashedPassword,
    };

    try {
      await this.usersCollection.insertOne(user);
    } catch (error) {
      throw new Error("Error creating user in document", {
        cause: error,
      });
    }
  }

  async login(userData: Login): Promise<LoginResult> {
    const { email, password } = userData;

    const loggedInUser = await this.getUserByEmail(email);

    if (!loggedInUser) {
      return { user: null, passwordMatch: false };
    }

    const passwordMatches = await comparePassword(
      password,
      loggedInUser.password,
    );

    return { user: loggedInUser, passwordMatch: passwordMatches };
  }
}

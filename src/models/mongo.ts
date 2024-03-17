import { createCollection } from "@database/mongodb/create-collection";
import { comparePassword, hashPassword } from "@src/config";
import type { Login, LoginResult, Register } from "@src/types";

export class AuthMongoDB {
  async register(userData: Register) {
    const usersCollection = createCollection();
    const { username, email, password } = userData;

    try {
      const existingUser = await usersCollection.findOne({
        email: { $eq: email },
      });

      if (existingUser) {
        return existingUser;
      }
    } catch (error) {
      throw new Error("Error finding user in document", { cause: error });
    }

    const hashedPassword = await hashPassword(password);

    const user = {
      username: username,
      email: email,
      password: hashedPassword,
    };

    try {
      await usersCollection.insertOne(user);
    } catch (error) {
      throw new Error("Error creating user in document", {
        cause: error,
      });
    }
  }

  async login(userData: Login): Promise<LoginResult> {
    const usersCollection = createCollection();
    const { email, password } = userData;
    try {
      const loggedInUser = await usersCollection.findOne({ email });

      if (!loggedInUser) {
        return { user: null, passwordMatch: false };
      }

      const passwordMatches = await comparePassword(
        password,
        loggedInUser.password,
      );

      return { user: loggedInUser, passwordMatch: passwordMatches };
    } catch (error) {
      throw new Error("Credentials are not valid", { cause: error });
    }
  }
}

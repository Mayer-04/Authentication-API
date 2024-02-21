import { createCollection } from "@database/mongodb/create-collection";
import { Register, Login, LoginResult } from "@src/types";
import { BcryptAdapter } from "@src/config";

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

    const hashedPassword = await BcryptAdapter.hashPassword(password);

    try {
      await usersCollection.insertOne({
        username,
        email,
        password: hashedPassword,
      });
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

      const passwordMatches = await BcryptAdapter.comparePassword(
        password,
        loggedInUser.password
      );

      return { user: loggedInUser, passwordMatch: passwordMatches };
    } catch (error) {
      throw new Error("Credentials are not valid", { cause: error });
    }
  }
}

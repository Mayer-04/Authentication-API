import { createCollection } from "@database/mongodb/create-collection";
import { Register, Login } from "@src/types";
import { BcryptAdapter } from "@src/config";

export class AuthMongoDB {
  async register(userData: Register) {
    const usersCollection = createCollection();
    const { username, email, password, confirmPassword } = userData;

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
    const hashedPasswordConfirmation = await BcryptAdapter.hashPassword(
      confirmPassword
    );

    try {
      await usersCollection.insertOne({
        username,
        email,
        password: hashedPassword,
        confirmPassword: hashedPasswordConfirmation,
      });
    } catch (error) {
      throw new Error("Error creating user in document", {
        cause: error,
      });
    }
  }

  async login(userData: Login) {
    const usersCollection = createCollection();
    const { email, password } = userData;
    try {
      const loggedInUser = await usersCollection.findOne({ email });

      if (!loggedInUser) {
        return loggedInUser;
      }

      const passwordMatches = await BcryptAdapter.comparePassword(
        password,
        loggedInUser.password
      );

      if (!passwordMatches) {
        return passwordMatches;
      }

      return loggedInUser;
    } catch (error) {
      throw new Error("Credentials are not valid", { cause: error });
    }
  }
}

import { createCollection } from "@database/mongodb/create-collection";
import { Register, Login } from "@src/types";
import { BcryptAdapter } from "@src/config";

export class AuthMongoDB {
  async register(userData: Register) {
    const usersCollection = createCollection();
    const { username, email, password, passwordConfirmation } = userData;

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
      passwordConfirmation
    );

    try {
      await usersCollection.insertOne({
        username,
        email,
        password: hashedPassword,
        passwordConfirmation: hashedPasswordConfirmation,
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
      return loggedInUser;
    } catch (error) {
      throw new Error("User not found in document", { cause: error });
    }
  }
}

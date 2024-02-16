import { createCollection } from "@database/mongodb/create-collection";
import { Register, Login } from "@src/types";

export class AuthMongoDB {
  static async register(userData: Register) {
    const usersCollection = createCollection();
    try {
      const insertUser = await usersCollection.insertOne(userData);
      return insertUser;
    } catch (error) {
      throw new Error("Error creating user in document", {
        cause: error,
      });
    }
  }

  static async login(userData: Login) {
    const usersCollection = createCollection();
    const { email } = userData;
    try {
      const loggedInUser = await usersCollection.findOne({ email });
      return loggedInUser;
    } catch (error) {
      throw new Error("User not found in document", { cause: error });
    }
  }
}

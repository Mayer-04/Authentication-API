import { createCollection } from "@database/mongodb/create-collection";
import { Register, Login } from "@src/types";

export class AuthService {
  static async register(user: Register) {
    const usersCollection = createCollection();
    try {
      const registerUser = await usersCollection.insertOne({ user });
      return registerUser;
    } catch (error) {
      throw Error("Failed to register user", { cause: error });
    }
  }

  static async login(user: Login) {
    const usersCollection = createCollection();
    const { email } = user;
    try {
      const loginUser = await usersCollection.findOne({ email });
      return loginUser;
    } catch (error) {
      throw Error("Failed to login user", { cause: error });
    }
  }
}

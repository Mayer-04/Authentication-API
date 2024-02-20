import { createCollection } from "@database/mongodb/create-collection";
import { Register, Login } from "@src/types";

export class AuthMongoDB {
  async register(userData: Register) {
    const usersCollection = createCollection();

    try {
      const existingUser = await usersCollection.findOne({
        email: { $eq: userData.email },
      });

      if (existingUser) {
        return existingUser;
      }
    } catch (error) {
      throw new Error("Error finding user in document", {
        cause: error,
      });
    }

    try {
      const newUser = await usersCollection.insertOne(userData);
      return newUser;
    } catch (error) {
      throw new Error("Error creating user in document", {
        cause: error,
      });
    }
  }

  async login(userData: Login) {
    const usersCollection = createCollection();
    const { email } = userData;
    try {
      const loggedInUser = await usersCollection.findOne({ email });
      console.log(loggedInUser);
      return loggedInUser;
    } catch (error) {
      throw new Error("User not found in document", { cause: error });
    }
  }
}

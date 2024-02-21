import { hash, compare } from "bcrypt";

export class BcryptAdapter {
  static async hashPassword(
    password: string,
    saltRounds = 10
  ): Promise<string> {
    try {
      const hashedPassword = await hash(password, saltRounds);
      return hashedPassword;
    } catch (error) {
      throw new Error("Error hashing password", { cause: error });
    }
  }

  static async comparePassword(
    password: string,
    hashed: string
  ): Promise<boolean> {
    try {
      const passwordMatches = await compare(password, hashed);
      return passwordMatches;
    } catch (error) {
      throw new Error("Error comparing password", { cause: error });
    }
  }
}

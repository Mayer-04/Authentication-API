import { ObjectId } from "mongodb";

interface LoginResult {
  user: User | null;
  passwordMatch: boolean;
}

interface User {
  _id?: ObjectId;
  username: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

export { LoginResult, User };

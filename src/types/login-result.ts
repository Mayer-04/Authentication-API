import { ObjectId } from "mongodb";

export interface LoginResult {
  user: User | null;
  passwordMatch: boolean;
}

export interface User {
  _id?: ObjectId;
  username: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

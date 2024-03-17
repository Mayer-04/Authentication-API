import type { ObjectId } from "mongodb";

export interface LoginResult {
  user: UserCollection | null;
  passwordMatch: boolean;
}

export interface UserCollection {
  _id?: ObjectId;
  username: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

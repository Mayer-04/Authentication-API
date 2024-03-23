import type { ObjectId } from "mongodb";

export interface UserCollection {
  _id?: ObjectId;
  username: string;
  email: string;
  password: string;
  confirmPassword?: string;
}
export interface LoginResult {
  user: UserCollection | null;
  passwordMatch: boolean;
}

export type User = Omit<UserCollection, "_id">;

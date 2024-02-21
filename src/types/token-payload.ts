import { ObjectId } from "mongodb";

export interface TokenPayload {
  _id: ObjectId;
  username: string;
}

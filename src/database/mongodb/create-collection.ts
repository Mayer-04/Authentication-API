import { client } from "@src/utils/mongo-client";
import { User } from "@src/types";

export const createCollection = () => {
  const db = client.db("authentication");
  const collection = db.collection<User>("users");
  return collection;
};

import type { User } from "@src/types";
import { client } from "@utils/index";

export const createCollection = () => {
  const db = client.db("authentication");
  const collection = db.collection<User>("users");
  return collection;
};

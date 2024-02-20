import { client } from "@utils/index";
import { User } from "@src/types";

export const createCollection = () => {
  const db = client.db("authentication");
  const collection = db.collection<User>("users");
  return collection;
};

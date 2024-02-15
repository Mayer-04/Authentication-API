import { client } from "@src/utils/mongo-client";

export const createCollection = () => {
  const db = client.db("authentication");
  const collection = db.collection("users");
  return collection;
};

import { MongoClient, ServerApiVersion } from "mongodb";
import { envs } from "@src/config";

export const client = new MongoClient(envs.MONGO_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

import { envs } from "@src/config";
import { MongoClient, ServerApiVersion } from "mongodb";

export const client = new MongoClient(envs.MONGO_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
  serverMonitoringMode: "stream",
});

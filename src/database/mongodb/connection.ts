import { client } from "@src/utils/mongo-client";

export const connectionToMongodb = async () => {
  try {
    await client.connect();
    console.log(`Successfully connected to MongoDB Atlas!`);
  } catch (error) {
    console.error(`Failed to connect to MongoDB: ${error}`);
    await client.close();
  }
};

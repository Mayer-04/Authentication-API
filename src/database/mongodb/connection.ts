import { DatabaseError, client } from "@utils/index";

export const connectionToMongodb = async () => {
  try {
    await client.connect();
    console.log("Successfully connected to MongoDB Atlas!");
  } catch (error) {
    // Si ocurre un error, cierra el cliente y lanza un error personalizado
    await client.close();
    throw new DatabaseError("Failed to connect to MongoDB");
  }
};

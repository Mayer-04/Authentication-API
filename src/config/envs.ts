import "dotenv/config";
import { cleanEnv, port, str } from "envalid";

const PROCESS_ENV = process.env;

export const envs = cleanEnv(PROCESS_ENV, {
  PORT: port(),
  JWT_SECRET: str(),
  MONGO_URI: str(),
});

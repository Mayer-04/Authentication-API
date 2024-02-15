import express from "express";
import { corsOptions, envs, morganAdapter } from "@config/index";

const app = express();
const SERVER_PORT = envs.PORT ?? 5001;

app.disable("x-powered-by");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(corsOptions());
app.use(morganAdapter("dev"));

app.listen(SERVER_PORT, () => {
  console.log(`Server running on port http://localhost:${SERVER_PORT}`);
});

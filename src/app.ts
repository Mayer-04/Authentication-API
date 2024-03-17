import { corsAdapter, envs, morganAdapter } from "@config/index";
import { connectionToMongodb } from "@database/mongodb/connection";
import { router } from "@routes/routes";
import cookieParser from "cookie-parser";
import express from "express";
import helmet from "helmet";

const app = express();
const SERVER_PORT = envs.PORT ?? 5001;

app.disable("x-powered-by");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(corsAdapter());
app.use(helmet());
app.use(cookieParser());
app.use(morganAdapter("dev"));

app.use(router);

app.listen(SERVER_PORT, async () => {
  await connectionToMongodb();
  console.log(`Server running on port http://localhost:${SERVER_PORT}`);
});

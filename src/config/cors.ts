import { ACCEPTED_ORIGINS } from "@utils/index";
import cors, { type CorsOptions } from "cors";

const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || ACCEPTED_ORIGINS.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error("Not allowed by CORS"));
  },
  methods: ["GET", "POST"],
};

export const corsAdapter = () => cors(corsOptions);

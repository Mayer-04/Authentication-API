import { envs } from "@config/index";
import type { TokenPayload } from "@src/types/index";
import { TOKEN_EXPIRATION } from "@utils/index";
import jwt from "jsonwebtoken";

const { JWT_SECRET } = envs;

export const generateToken = ({ _id, username }: TokenPayload): string => {
  const token = jwt.sign({ _id, username }, JWT_SECRET, {
    expiresIn: TOKEN_EXPIRATION,
  });
  return token;
};

export const validateToken = (token: string): TokenPayload | null => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as TokenPayload;
    return decoded;
  } catch (error) {
    console.error(error);
    return null;
  }
};

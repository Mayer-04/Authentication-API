import jwt from "jsonwebtoken";
import { envs } from "@config/index";
import { TokenPayload } from "@src/types/index";
import { TOKEN_EXPIRATION } from "@utils/index";
const { JWT_SECRET } = envs;

export class Jwt {
  static generateToken({ _id, username }: TokenPayload): string {
    const token = jwt.sign({ _id, username }, JWT_SECRET, {
      expiresIn: TOKEN_EXPIRATION,
    });
    return token;
  }

  static validateToken(token: string): TokenPayload | null {
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as TokenPayload;
      return decoded;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}

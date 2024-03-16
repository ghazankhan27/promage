import jwt from "jsonwebtoken";
import { TokenData } from "../types";

export function generateToken(data: TokenData, type: "access" | "refresh" | "reset" | "verifyEmail" = "access") {
  let expiryInMinutes: number;
  let secret: string;

  switch (type) {
    case "refresh":
      expiryInMinutes = parseInt(process.env.REFRESH_TOKEN_EXPIRY_IN_MINUTES!);
      secret = process.env.REFRESH_TOKEN_SECRET!;
      break;
    case "reset":
      expiryInMinutes = parseInt(process.env.RESET_TOKEN_EXPIRY_IN_MINUTES!);
      secret = process.env.RESET_TOKEN_SECRET!;
      break;
    case "verifyEmail":
      expiryInMinutes = parseInt(process.env.VERIFY_EMAIL_TOKEN_EXPIRY_IN_MINUTES!);
      secret = process.env.VERIFY_EMAIL_TOKEN_SECRET!;
      break;
    default:
      expiryInMinutes = parseInt(process.env.TOKEN_EXPIRY_IN_MINUTES!);
      secret = process.env.TOKEN_SECRET!;
  }

  const token = jwt.sign(data, secret, {
    expiresIn: expiryInMinutes * 60,
  });

  return token;
}

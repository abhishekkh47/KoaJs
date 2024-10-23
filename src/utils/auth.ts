import jwt from "jsonwebtoken";
import { IUser } from "../types";
import config from "../config";

export const signJWT = (user: IUser) => {
  return jwt.sign(
    { email: user.email },
    process.env.JWT_SECRET || "jwtsecret",
    {
      expiresIn: "1h",
    }
  );
};

export const verifyJWT = (token: string) => {
  return jwt.verify(token, process.env.JWT_SECRET || "jwtsecret");
};

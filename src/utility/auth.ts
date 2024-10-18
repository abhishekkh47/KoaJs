import jwt from "jsonwebtoken";
import config from "../config";

export const getJwtToken = (body: any, expireTime: any = null) => {
  return jwt.sign(body, config.JWT_SECRET ?? "secret", {
    expiresIn: expireTime ? expireTime : 36000,
  });
};

export const verifyToken = (token: string) => {
  try {
    const response = jwt.verify(token, config.JWT_SECRET ?? "secret") as any;
    return response;
  } catch (error) {
    return {
      status: 401,
      message: "Unauthorised User",
    };
  }
};

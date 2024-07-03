import Jwt from "jsonwebtoken";
import config from "@app/config";
import { IUserSchema } from "@app/models/mongo";

export const getJwtToken = (body: any, expireTime: any = null) => {
  return Jwt.sign(body, config.JWT_SECRET ?? "secret", {
    expiresIn: expireTime ? expireTime : config.JWT_EXPIRE,
  });
};

export const verifyToken = (token: string) => {
  try {
    const response = Jwt.verify(token, config.JWT_SECRET ?? "secret") as any;
    return response;
  } catch (error) {
    return {
      status: 401,
      message: "Unauthorised User",
    };
  }
};

export const getRefreshToken = (body: any) => {
  return Jwt.sign(body, config.JWT_SECRET ?? "secret", {
    expiresIn: "365d",
  });
};

export const decodeJwtToken = (body: any) => {
  return Jwt.decode(body);
};

export const getJwtAuthInfo = (user: IUserSchema) => {
  const expiredOn = Date.now() + 36000;

  return {
    _id: user._id,
    issuedOn: Date.now(),
    expiredOn,
    email: user.email,
  };
};

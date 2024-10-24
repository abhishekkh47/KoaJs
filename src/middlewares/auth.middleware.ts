import { Request, Response, NextFunction } from "express";
import { verifyJWT } from "../utils";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const token = req.headers.authorization?.split(" ")[1]; //for Bearer token
  if (!token) {
    res.status(401).json({ message: "No token provided" });
    return; // Early return if no token
  }

  try {
    const decoded = verifyJWT(token as string);
    (req as any).user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid Token" });
  }
};

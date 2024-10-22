import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = (
  req: any,
  res: Response,
  next: NextFunction
): void => {
  const token = req.headers["authorization"]?.split(" ")[1]; // Assuming "Bearer <token>"

  if (!token) {
    res
      .status(401)
      .json({ message: "No token provided, authorization denied" });
    return; // Return here to prevent further execution
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    // Attach the decoded user info to the request object
    req.user = decoded; // Make sure to have user defined in Request type
    next(); // Call the next middleware
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

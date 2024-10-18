import { verifyToken } from "@app/utility";
import { Request, Response, NextFunction } from "express";

export const Auth = () => {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;

    descriptor.value = async function (
      req: Request,
      res: Response,
      next: NextFunction
    ) {
      const token =
        (req.headers["x-access-token"] as string) ||
        (req.query.token as string);

      if (!token) {
        return res.status(401).json({ message: "No token provided" });
      }

      try {
        const decoded = await verifyToken(token);

        // Now TypeScript recognizes req.user
        req.user = decoded; // Attach user info to the request object
        return originalMethod.apply(this, [req, res, next]); // Call the original method
      } catch (error) {
        return res.status(401).json({ message: "Invalid or expired token" });
      }
    };

    return descriptor;
  };
};

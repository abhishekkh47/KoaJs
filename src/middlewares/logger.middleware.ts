import { Request, Response, NextFunction } from "express";
export const loggingMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(`${req.path} - ${JSON.parse(JSON.stringify(req.body.query))}`);
  next();
};

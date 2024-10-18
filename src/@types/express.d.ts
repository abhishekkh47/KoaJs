import * as express from "express";

declare global {
  namespace Express {
    interface Request {
      user?: any; // You can specify a more detailed type instead of 'any' if you have a user type
    }
  }
}

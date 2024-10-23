import { Response } from "express";
// src/controllers/base.controller.ts
export class BaseController {
  successResponse(res: Response, data: any, message: string = "Success") {
    return res.status(200).json({ message, data });
  }

  errorResponse(
    res: Response,
    error: any,
    code: number = 500,
    message: string = "Error"
  ) {
    return res.status(code).json({ message, error });
  }

  notFound(res: Response, message: string = "Not Found") {
    return res.status(404).json({ message });
  }

  unauthorized(res: Response, message: string = "Unauthorized") {
    return res.status(401).json({ message });
  }
}

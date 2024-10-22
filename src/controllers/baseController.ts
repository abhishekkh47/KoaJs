import { Response } from "express";

export abstract class BaseController {
  public successResponse(res: Response, message: string, data: any = {}) {
    return res.status(200).json({ message, data });
  }

  public errorResponse(res: Response, message: string, code: number = 500) {
    return res.status(code).json({ error: message });
  }
}

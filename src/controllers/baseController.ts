import { Response } from "express";

export class BaseController {
  protected success(res: Response, data: any, status: number = 200) {
    return res.status(status).json(data);
  }

  protected error(res: Response, message: any, status: number = 404) {
    return res.status(status).json({ error: message });
  }
}

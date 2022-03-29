import { Request, Response } from "express";

export class UserController {
  getUsers(req: Request, res: Response) {
    res.status(200).json({
      user: "Rodrigo Rios",
    });
  }
}

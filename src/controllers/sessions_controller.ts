import { Request, Response, NextFunction } from "express";
import returnReponse from "../utils/genericResponses";

export async function register(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const response = returnReponse(201, "The account has been created!")
      return res.json(response)
    } catch (error) {
        return next(error)
    }
}
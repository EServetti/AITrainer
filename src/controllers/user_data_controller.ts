import {Request, Response, NextFunction } from "express";
import { create } from "../DAO/user_data_dao";
import returnReponse from "../utils/genericResponses";

export async function create_data(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      await create(req.body)
      const response = returnReponse(200, "The data has been saved")
      return res.json(response)
    } catch (error) {
        return next(error)
    }
}
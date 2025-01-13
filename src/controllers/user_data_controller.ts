import {Request, Response, NextFunction } from "express";
import { create, update } from "../DAO/user_data_dao";
import returnReponse from "../utils/genericResponses";

export async function createData(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      await create(req.body)
      const response = returnReponse(201, "The data has been saved")
      return res.json(response)
    } catch (error) {
        return next(error)
    }
}

export async function updateData(req: Request, res: Response, next: NextFunction): Promise<any> {
  try {
    const {user_id} = req.body
    const data = req.body;
    delete data.user_id;
    for(const prop in data) {
      await update(user_id, prop, data[prop])
    }
    const response = returnReponse(200, "Data updated!")
    return res.json(response)
  } catch (error) {
      return next(error)
  }
}
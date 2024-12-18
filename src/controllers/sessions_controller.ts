import { Request, Response, NextFunction } from "express";
import returnReponse from "../utils/genericResponses";
import { readByEmail, updateUser } from "../DAO/users_dao";
import CustomError from "../utils/customError";
import { createToken } from "../utils/jwt";

export async function register(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const response = returnReponse(201, "The account has been created!")
      return res.json(response)
    } catch (error) {
        return next(error)
    }
}

export async function verifyAccount(req: Request, res: Response, next: NextFunction): Promise<any> {
  try {
    const {email, verifyCode} = req.params
    const user = await readByEmail(email)
    if (user.length == 0) {
      const error = new CustomError("Not found usser", 400)
      throw error
    }
    if (user[0].verifyCode === verifyCode) {
      updateUser(user[0].id, "verified", true)
      const response = returnReponse(200, "The account has been verified!")
      return res.json(response)
    }
  } catch (error) {
    return next(error)
  }
}

export async function login(req: Request, res: Response, next: NextFunction): Promise<any> {
  try {
    if (!req.user) {
      throw new CustomError("Auth error", 500)
    }
    const user = req.user
    const token = createToken(user)
    const response = returnReponse(200, "Successfully loged in!")
    return res.cookie("token", token, {maxAge: 60 * 60 * 1000}).json(response)
  } catch (error) {
    return next(error)
  }
}
import { Request, Response, NextFunction } from "express";
import returnReponse from "../utils/genericResponses";
import { readByEmail, readUsers, updateUser } from "../DAO/users_dao";
import CustomError from "../utils/customError";
import { createToken, verifyToken } from "../utils/jwt";
import recoverEmail from "../utils/recoverEmail";
import { createHash } from "../utils/hash";
import crypto from "crypto"

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
    console.log(verifyCode);
    console.log(user[0]);
    if (user.length == 0) {
      const error = new CustomError("Not found usser", 400)
      throw error
    }
    if (user[0].verifyCode === verifyCode) {
      updateUser(user[0].id, "verified", true)
      const response = returnReponse(200, "The account has been verified!")
      return res.json(response)
    } else {
      const error = new CustomError("Invalid credentials!", 400)
      throw error
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

export async function data(req: Request, res: Response, next: NextFunction): Promise<any> {
  try {
    const token = req.cookies["token"]
    const data = verifyToken(token)
    if (typeof data === "string") return new CustomError("Bad Token!",500)
    const dataToSend = {
      id: data.id,
      first_name: data.first_name,
      last_name: data.last_name,
      sex: data.sex,
      date_of_birth: data.date_of_birth,
      email: data.email,
      role: data.role
    } 
    const response = returnReponse(200, dataToSend)
    return res.json(response)
  } catch (error) {
    return next(error)
  }
}

export async function recover(req: Request, res: Response, next: NextFunction): Promise<any> {
  try {
    const {email} = req.body
    const user = await readByEmail(email)
    if (!user[0]) {
      const error = new CustomError("Invalid credentials!", 400)
      throw error
    }
    const resetPasswordToken = crypto.randomBytes(12).toString("hex");
    const resetPAsswordExpires = Date.now() + 36000000;
    await updateUser(user[0].id, "resetPasswordToken", resetPasswordToken);
    await updateUser(user[0].id, "resetPasswordExpires", resetPAsswordExpires);
    await recoverEmail({
      to: email, 
      token: resetPasswordToken
    })
    const response = returnReponse(200, "We've sent you a recover email")
    return res.json(response)
  } catch (error) {
    return next(error)
  }
}

export async function updatePass(req: Request, res: Response, next: NextFunction): Promise<any> {
  try {
    const {token, password} = req.body
    const user = await readUsers({
      column: "resetPasswordToken",
      value: token
    })
    if (user.length === 0) {
      const error = new CustomError("This token is not valid", 400)
      throw error
    }
    if (user[0].resetPasswordExpires < Date.now()) {
      const error = new CustomError("This token has expired!", 400)
      throw error
    }
    const newPassword = createHash(password)
    await updateUser(user[0].id, "password", newPassword)
    await updateUser(user[0].id, "resetPasswordToken", "")
    await updateUser(user[0].id, "resetPasswordExpires", 0)
  } catch (error) {
    return next(error)
  }
}
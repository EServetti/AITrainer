import jwt, { Jwt } from "jsonwebtoken";
import { User } from "../types";
import CustomError from "./customError";

export function createToken(data: User | Express.User) {
  try {
    if (!process.env.JWT) {
      const error = new CustomError("Not JWT code provided!", 500);
      throw error;
    }
    const token = jwt.sign(data, process.env.JWT, { expiresIn: 60 * 60 });
    return token;
  } catch (error) {
    throw error;
  }
}

export function verifyToken(token: string) {
    try {
        if (!process.env.JWT) {
            const error = new CustomError("Not JWT code provided!", 500);
            throw error;
        }
        const data = jwt.verify(token, process.env.JWT)
        return data
    } catch (error) {
        throw error
    }
}

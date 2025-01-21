import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";
import CustomError from "../utils/customError";

function validate(requiredRole: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {

      const token = req.cookies["token"];

      if (requiredRole.includes("PUBLIC")) {
        return next();
      } else if (!token) {
        const error = new CustomError("Not cookie provided!", 400)
        throw error
      }
      const user = verifyToken(token)
      if (typeof user === "string") {
        throw new CustomError("Wrong JWT", 500)
      }

      if (!requiredRole.includes(user.role)) {
        const error = new CustomError("Bad auth", 400)
        throw error
      } else {
        return next()
      }
    } catch (error) {
      return next(error);
    }
  };
}

export default validate

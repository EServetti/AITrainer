import Joi from "joi";
import {Request, Response, NextFunction} from "express"
import CustomError from "./customError";
import { User } from "../types";


export function validatorMiddleware(schema: Joi.ObjectSchema) {
    return (req: Request, res: Response, next: NextFunction) => {
      try {
        const validation = schema.validate(req.body, { abortEarly: false });
        if (validation.error) {
          // console.log(validation.error);
          const message = validation.error.details.map((error) => error.message);
          const error = new CustomError(message.join(", "), 400); 
          throw error;
        }
        return next();
      } catch (error) {
        return next(error);
      }
    };
  }

 export function validatorFunction(schema: Joi.ObjectSchema, user: User) {
  try {
    const validation = schema.validate(user, {abortEarly: false})
    if (validation.error) {
      console.log(validation.error);
      const message = validation.error.details.map((error) => error.message);
      const error = new CustomError(message.join(", "), 400); 
      throw error;
    }
    return 
  } catch (error) {
    throw error
  }
 }
  
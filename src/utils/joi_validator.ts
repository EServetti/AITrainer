import Joi from "joi";
import {Request, Response, NextFunction} from "express"
import CustomError from "./customError";


function validator(schema: Joi.ObjectSchema) {
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
  
  export default validator;
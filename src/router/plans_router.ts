import { Request, Response, NextFunction, Router } from "express";
import { getPlan } from "../controllers/plans_controller";
import {validatorMiddleware} from "../utils/joi_validator";
import validatePlan from "../schemas/plan_schema";
import validate from "../middlewares/validate";



const planRouter = Router()
//Rutas para pedido de planes
planRouter.post("/plan", validate("PUBLIC"), validatorMiddleware(validatePlan), getPlan)


export default planRouter
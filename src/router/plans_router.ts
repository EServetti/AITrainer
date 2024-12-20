import { Request, Response, NextFunction, Router } from "express";
import { getPlan } from "../controllers/plans_controller";
import {validatorMiddleware} from "../utils/joi_validator";
import validatePlan from "../schemas/plan_schema";



const planRouter = Router()
//Rutas para pedido de planes
planRouter.post("/plan", validatorMiddleware(validatePlan), getPlan)


export default planRouter
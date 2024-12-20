import { Request, Response, NextFunction } from "express";
import returnReponse from "../utils/genericResponses";
import getPlanFromGPT from "../utils/openAI";

async function getPlan(req: Request, res:Response, next: NextFunction):Promise<any> {
    try {
        const {age, weight, height, daysOfTraining, goal, extra, trainingTime, sex, bodyType, dificulty} = req.body
        const plan = await getPlanFromGPT(weight, height, daysOfTraining, age, goal, trainingTime, sex, extra, bodyType, dificulty)
        
        const response = returnReponse(200, plan)
        return res.json(response)
    } catch (error) {
        return next(error)
    }
}

export {getPlan}
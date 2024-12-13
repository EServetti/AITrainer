import { Request, Response, NextFunction, Router } from "express";
import planRouter from "./plans_router";
import { createUser } from "../DAO/users_dao";
import { User } from "../types";
import usersRouter from "./users_router";

const indexRouter = Router();

function logPetitions(req: Request, res: Response, next: NextFunction): void {
  const now = new Date();
  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, "0"); 
  const day = now.getDate().toString().padStart(2, "0"); 
  const hours = now.getHours().toString().padStart(2, "0"); 
  const minutes = now.getMinutes().toString().padStart(2, "0"); 
  const date = `${day}/${month}/${year} | ${hours}:${minutes}`;
  const petition = `${date} | ${req.method} | ${req.url}`;
  console.log(petition);
  next(); 
}

indexRouter.use("/", logPetitions, planRouter);
indexRouter.use("/", logPetitions, usersRouter)
export default indexRouter;

import { Router } from "express";
import planRouter from "./plans_router";

const indexRouter = Router()

indexRouter.use("/", planRouter)

export default indexRouter
import { Router } from "express";
import passport from "../middlewares/passport";
import { register } from "../controllers/sessions_controller";

const usersRouter = Router()

usersRouter.post("/register", passport.authenticate("register", {session: false}), register)

export default usersRouter
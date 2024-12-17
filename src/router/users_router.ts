import { Router } from "express";
import passport from "../middlewares/passport";
import { register, verifyAccount } from "../controllers/sessions_controller";
import { readByEmail } from "../DAO/users_dao";

const usersRouter = Router()

usersRouter.post("/register", passport.authenticate("register", {session: false}), register)
usersRouter.post("/verify/:email/:verifyCode", verifyAccount)

export default usersRouter
import { Router } from "express";
import passport from "../middlewares/passport";
import { login, register, verifyAccount } from "../controllers/sessions_controller";
import { readByEmail } from "../DAO/users_dao";
import validate from "../middlewares/validate";

const usersRouter = Router()

usersRouter.post("/register", validate("PUBLIC"), passport.authenticate("register", {session: false}), register)
usersRouter.post("/verify/:email/:verifyCode", validate("PUBLIC"), verifyAccount)
usersRouter.post("/login", validate("PUBLIC"), passport.authenticate("login", {session: false}), login)

export default usersRouter
import { Router } from "express";
import passport from "../middlewares/passport";
import { data, login, loginGoogle, logout, recover, register, updatePass, verifyAccount } from "../controllers/sessions_controller";
import validate from "../middlewares/validate";
import { validatorMiddleware } from "../utils/joi_validator";
import { password } from "../schemas/user_schema";

const usersRouter = Router()

usersRouter.post("/register", validate(["PUBLIC"]), passport.authenticate("register", {session: false}), register)
usersRouter.post("/verify/:email/:verifyCode", validate(["PUBLIC"]), verifyAccount)
usersRouter.post("/login", validate(["PUBLIC"]), passport.authenticate("login", {session: false}), login)
usersRouter.post("/data", validate(["USER","ADMIN"]), data);
usersRouter.post("/logout", validate(["USER","ADMIN"]), logout)
usersRouter.post("/recover", validate(["PUBLIC"]), recover)
usersRouter.post("/password", validate(["PUBLIC"]), validatorMiddleware(password), updatePass)
usersRouter.get("/google", validate(["PUBLIC"]), passport.authenticate("google", {scope: ["email", "profile"]}))
usersRouter.get("/google/callback", validate(["PUBLIC"]), passport.authenticate("google", { session: false }), loginGoogle)

export default usersRouter
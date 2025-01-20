import { Router } from "express";
import passport from "../middlewares/passport";
import { data, login, loginGoogle, logout, recover, register, updateDateOfBirth, updatePass, verifyAccount } from "../controllers/sessions_controller";
import validate from "../middlewares/validate";
import { validatorMiddleware } from "../utils/joi_validator";
import { password, updateUserData, validateUserData } from "../schemas/user_schema";
import { createData, updateData } from "../controllers/user_data_controller";

const usersRouter = Router()

usersRouter.post("/register", validate(["PUBLIC"]), passport.authenticate("register", {session: false}), register)
usersRouter.post("/verify/:email/:verifyCode", validate(["PUBLIC"]), verifyAccount)
usersRouter.post("/login", validate(["PUBLIC"]), passport.authenticate("login", {session: false}), login)
usersRouter.post("/data", validate(["USER","ADMIN"]), data);
usersRouter.post("/userdata", validate(["USER","ADMIN"]), validatorMiddleware(validateUserData), createData)
usersRouter.post("/logout", validate(["USER","ADMIN"]), logout)
usersRouter.post("/recover", validate(["PUBLIC"]), recover)
usersRouter.post("/password", validate(["PUBLIC"]), validatorMiddleware(password), updatePass)
usersRouter.get("/google", validate(["PUBLIC"]), passport.authenticate("google", {scope: ["email", "profile"]}))
usersRouter.get("/google/callback", validate(["PUBLIC"]), passport.authenticate("google", { session: false }), loginGoogle)
usersRouter.put("/bithDate", validate(["USER", "ADMIN"]), updateDateOfBirth)
usersRouter.put("/updateuserdata", validate(["USER", "ADMIN"]), validatorMiddleware(updateUserData), updateData)


export default usersRouter
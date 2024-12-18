import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Request } from "express";
import { createUser, readByEmail } from "../DAO/users_dao";
import CustomError from "../utils/customError";
import { validatorFunction } from "../utils/joi_validator";
import { User } from "../types";
import { validateUser } from "../schemas/user_schema";
import { compareHash, createHash } from "../utils/hash";
import sendMail from "../utils/nodemailer";
import { RowDataPacket } from "mysql2";

passport.use("register", new LocalStrategy({passReqToCallback: true, usernameField: "email"}, 
    async (req: Request, email: string, password: string, done: (error: any, user?: User | false, options?: any) => void) => {
        try {
            const exists = await readByEmail(email)
            if (exists.length != 0) {
                const error = new CustomError("This account already exists!", 400)
                return done(error, false)
            }
            validatorFunction(validateUser, req.body)
            req.body.password = createHash(password)
            const user = await createUser(req.body)

            await sendMail({to: user[0].email, verifyCode: user[0].verifyCode})
            return done(null, user)
        } catch (error) {
            return done(error, false)
        }
    }
))

passport.use("login", new LocalStrategy({passReqToCallback: true, usernameField: "email"}, 
    async (req: Request, email: string, password: string, done: (error: any, user?: User | RowDataPacket | false, options?: any) => void) => {
        try {
            const user = await readByEmail(email)            
            const equals = compareHash(password, user[0].password)

            if (user.length === 0 || !equals) {
                const error = new CustomError("Invalid credentials!", 400)
                return done(error, false)
            } else {
                return done(null, user[0])
            }
        } catch (error) {
            return done(error, false)
        }
    }
))

export default passport
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import { Profile } from "passport-google-oauth";
import { Request } from "express";
import { createUser, readByEmail } from "../DAO/users_dao";
import CustomError from "../utils/customError";
import { validatorFunction } from "../utils/joi_validator";
import { User } from "../types";
import { validateUser } from "../schemas/user_schema";
import { compareHash, createHash } from "../utils/hash";
import sendMail from "../utils/nodemailer";
import { RowDataPacket } from "mysql2";

passport.use(
  "register",
  new LocalStrategy(
    { passReqToCallback: true, usernameField: "email" },
    async (
      req: Request,
      email: string,
      password: string,
      done: (error: any, user?: User | false, options?: any) => void
    ) => {
      try {
        const exists = await readByEmail(email);
        if (exists.length != 0) {
          const error = new CustomError("¡Ya existe una cuenta con este email!", 400);
          return done(error, false);
        }
        validatorFunction(validateUser, req.body);
        req.body.password = createHash(password);
        const user = await createUser(req.body);

        await sendMail({ to: user[0].email, verifyCode: user[0].verifyCode });
        return done(null, user);
      } catch (error) {
        return done(error, false);
      }
    }
  )
);

passport.use(
  "login",
  new LocalStrategy(
    { passReqToCallback: true, usernameField: "email" },
    async (
      req: Request,
      email: string,
      password: string,
      done: (
        error: any,
        user?: any | RowDataPacket | false,
        options?: any
      ) => void
    ) => {
      try {
        const user = await readByEmail(email);
        const equals = compareHash(password, user[0].password);

        if (user.length === 0 || !equals) {
          const error = new CustomError("Invalid credentials!", 400);
          return done(error, false);
        } else if (user[0].verified === 0) {
          const error = new CustomError(
            "Please verify tour account first",
            400
          );
          return done(error, false);
        } else {
          const data = {
            id: user[0].id,
            first_name: user[0].first_name,
            last_name: user[0].last_name,
            sex: user[0].sex,
            date_of_birth: user[0].date_of_birth,
            email: user[0].email,
            role: user[0].role,
          };
          return done(null, data);
        }
      } catch (error) {
        return done(error, false);
      }
    }
  )
);

passport.use(
  "google",
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      callbackURL: "http://localhost:8000/google/callback",
      passReqToCallback: true,
    },
    async (
      req: Request,
      accesstoken: any,
      refreshToken: any,
      profile: Profile,
      done: (
        error: any,
        user?: any | RowDataPacket | false,
        options?: any
      ) => void
    ) => {
      try {

        if (profile.emails?.[0]?.value) {
          const exists = await readByEmail(profile.emails?.[0]?.value);
          if (exists.length === 0) {
            await createUser({
              email: profile.emails?.[0]?.value,
              password: profile.id,
              first_name: profile.name?.givenName || "No name provided",
              last_name: profile.name?.familyName || "No last name provided",
              photo:
                profile.photos && profile.photos.length > 0
                  ? profile.photos[0].value
                  : "No profile picture provided",
              sex: (profile as any)._json.gender || "x",
              verified: true,
              date_of_birth: (profile as any)._json.birthday || new Date,
              role: "USER",
              verifyCode: "",
            });
          }
          const user = await readByEmail(profile.emails?.[0]?.value);
          const data = {
            id: user[0].id,
            first_name: user[0].first_name,
            last_name: user[0].last_name,
            sex: user[0].sex,
            date_of_birth: user[0].date_of_birth,
            email: user[0].email,
            role: user[0].role,
          };
          return done(null, data)
        }
        const error = new CustomError("No email provided!", 400);
        throw error;
      } catch (error) {
        return done(error, false);
      }
    }
  )
);

export default passport;

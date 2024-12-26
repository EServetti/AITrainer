"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = require("passport-local");
const passport_google_oauth2_1 = require("passport-google-oauth2");
const users_dao_1 = require("../DAO/users_dao");
const customError_1 = __importDefault(require("../utils/customError"));
const joi_validator_1 = require("../utils/joi_validator");
const user_schema_1 = require("../schemas/user_schema");
const hash_1 = require("../utils/hash");
const nodemailer_1 = __importDefault(require("../utils/nodemailer"));
passport_1.default.use("register", new passport_local_1.Strategy({ passReqToCallback: true, usernameField: "email" }, (req, email, password, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const exists = yield (0, users_dao_1.readByEmail)(email);
        if (exists.length != 0) {
            const error = new customError_1.default("This account already exists!", 400);
            return done(error, false);
        }
        (0, joi_validator_1.validatorFunction)(user_schema_1.validateUser, req.body);
        req.body.password = (0, hash_1.createHash)(password);
        const user = yield (0, users_dao_1.createUser)(req.body);
        yield (0, nodemailer_1.default)({ to: user[0].email, verifyCode: user[0].verifyCode });
        return done(null, user);
    }
    catch (error) {
        return done(error, false);
    }
})));
passport_1.default.use("login", new passport_local_1.Strategy({ passReqToCallback: true, usernameField: "email" }, (req, email, password, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, users_dao_1.readByEmail)(email);
        const equals = (0, hash_1.compareHash)(password, user[0].password);
        if (user.length === 0 || !equals) {
            const error = new customError_1.default("Invalid credentials!", 400);
            return done(error, false);
        }
        else if (user[0].verified === 0) {
            const error = new customError_1.default("Please verify tour account first", 400);
            return done(error, false);
        }
        else {
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
    }
    catch (error) {
        return done(error, false);
    }
})));
passport_1.default.use("google", new passport_google_oauth2_1.Strategy({
    clientID: process.env.GOOGLE_CLIENT_ID || "",
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    callbackURL: "http://localhost:8000/google/callback",
    passReqToCallback: true,
}, (req, accesstoken, refreshToken, profile, done) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
    try {
        if ((_b = (_a = profile.emails) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.value) {
            const exists = yield (0, users_dao_1.readByEmail)((_d = (_c = profile.emails) === null || _c === void 0 ? void 0 : _c[0]) === null || _d === void 0 ? void 0 : _d.value);
            if (exists.length === 0) {
                yield (0, users_dao_1.createUser)({
                    email: (_f = (_e = profile.emails) === null || _e === void 0 ? void 0 : _e[0]) === null || _f === void 0 ? void 0 : _f.value,
                    password: profile.id,
                    first_name: ((_g = profile.name) === null || _g === void 0 ? void 0 : _g.givenName) || "No name provided",
                    last_name: ((_h = profile.name) === null || _h === void 0 ? void 0 : _h.familyName) || "No last name provided",
                    photo: profile.photos && profile.photos.length > 0
                        ? profile.photos[0].value
                        : "No profile picture provided",
                    sex: profile._json.gender || "x",
                    verified: true,
                    date_of_birth: profile._json.birthday || new Date,
                    role: "USER",
                    verifyCode: "",
                });
            }
            const user = yield (0, users_dao_1.readByEmail)((_k = (_j = profile.emails) === null || _j === void 0 ? void 0 : _j[0]) === null || _k === void 0 ? void 0 : _k.value);
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
        const error = new customError_1.default("No email provided!", 400);
        throw error;
    }
    catch (error) {
        return done(error, false);
    }
})));
exports.default = passport_1.default;

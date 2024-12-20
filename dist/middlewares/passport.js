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
const users_dao_1 = require("../DAO/users_dao");
const customError_1 = __importDefault(require("../utils/customError"));
const joi_validator_1 = require("../utils/joi_validator");
const user_schema_1 = require("../schemas/user_schema");
const hash_1 = require("../utils/hash");
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
        return done(null, user);
    }
    catch (error) {
        return done(error, false);
    }
})));
exports.default = passport_1.default;

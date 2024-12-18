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
exports.register = register;
exports.verifyAccount = verifyAccount;
exports.login = login;
const genericResponses_1 = __importDefault(require("../utils/genericResponses"));
const users_dao_1 = require("../DAO/users_dao");
const customError_1 = __importDefault(require("../utils/customError"));
const jwt_1 = require("../utils/jwt");
function register(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = (0, genericResponses_1.default)(201, "The account has been created!");
            return res.json(response);
        }
        catch (error) {
            return next(error);
        }
    });
}
function verifyAccount(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { email, verifyCode } = req.params;
            const user = yield (0, users_dao_1.readByEmail)(email);
            if (user.length == 0) {
                const error = new customError_1.default("Not found usser", 400);
                throw error;
            }
            if (user[0].verifyCode === verifyCode) {
                (0, users_dao_1.updateUser)(user[0].id, "verified", true);
                const response = (0, genericResponses_1.default)(200, "The account has been verified!");
                return res.json(response);
            }
        }
        catch (error) {
            return next(error);
        }
    });
}
function login(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!req.user) {
                throw new customError_1.default("Auth error", 500);
            }
            const user = req.user;
            const token = (0, jwt_1.createToken)(user);
            const response = (0, genericResponses_1.default)(200, "Successfully loged in!");
            return res.cookie("token", token, { maxAge: 60 * 60 * 1000 }).json(response);
        }
        catch (error) {
            return next(error);
        }
    });
}

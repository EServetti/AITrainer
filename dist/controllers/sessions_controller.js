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
exports.data = data;
exports.recover = recover;
exports.updatePass = updatePass;
exports.loginGoogle = loginGoogle;
exports.logout = logout;
exports.updateDateOfBirth = updateDateOfBirth;
const genericResponses_1 = __importDefault(require("../utils/genericResponses"));
const users_dao_1 = require("../DAO/users_dao");
const customError_1 = __importDefault(require("../utils/customError"));
const jwt_1 = require("../utils/jwt");
const recoverEmail_1 = __importDefault(require("../utils/recoverEmail"));
const hash_1 = require("../utils/hash");
const crypto_1 = __importDefault(require("crypto"));
const user_data_dao_1 = require("../DAO/user_data_dao");
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
                const error = new customError_1.default("Not found user", 400);
                throw error;
            }
            if (user[0].verifyCode === verifyCode) {
                (0, users_dao_1.updateUser)(user[0].id, "verified", true);
                const response = (0, genericResponses_1.default)(200, "The account has been verified!");
                return res.json(response);
            }
            else {
                const error = new customError_1.default("Invalid credentials!", 400);
                throw error;
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
            return res
                .cookie("token", token, {
                httpOnly: true,
                secure: true,
                maxAge: 3600000,
                sameSite: "none",
            })
                .json(response);
        }
        catch (error) {
            return next(error);
        }
    });
}
function data(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let token = req.cookies["token"];
            token = (0, jwt_1.verifyToken)(token);
            const data = yield (0, users_dao_1.readByEmail)(token.email);
            if (typeof data === "string")
                return new customError_1.default("Bad Token!", 500);
            const planData = yield (0, user_data_dao_1.readData)(data[0].id);
            const dataToSend = {
                id: data[0].id,
                first_name: data[0].first_name,
                last_name: data[0].last_name,
                sex: data[0].sex,
                date_of_birth: data[0].date_of_birth,
                email: data[0].email,
                role: data[0].role,
                photo: data[0].photo,
                planData: planData[0],
            };
            const response = (0, genericResponses_1.default)(200, dataToSend);
            return res.json(response);
        }
        catch (error) {
            return next(error);
        }
    });
}
function recover(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { email } = req.body;
            const user = yield (0, users_dao_1.readByEmail)(email);
            if (!user[0]) {
                const error = new customError_1.default("Invalid credentials!", 400);
                throw error;
            }
            const resetPasswordToken = crypto_1.default.randomBytes(12).toString("hex");
            const resetPAsswordExpires = Date.now() + 36000000;
            yield (0, users_dao_1.updateUser)(user[0].id, "resetPasswordToken", resetPasswordToken);
            yield (0, users_dao_1.updateUser)(user[0].id, "resetPasswordExpires", resetPAsswordExpires);
            yield (0, recoverEmail_1.default)({
                to: email,
                token: resetPasswordToken,
            });
            const response = (0, genericResponses_1.default)(200, "We've sent you a recover email");
            return res.json(response);
        }
        catch (error) {
            return next(error);
        }
    });
}
function updatePass(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { token, password } = req.body;
            const user = yield (0, users_dao_1.readUsers)({
                column: "resetPasswordToken",
                value: token,
            });
            if (user.length === 0) {
                const error = new customError_1.default("This token is not valid", 400);
                throw error;
            }
            if (user[0].resetPasswordExpires < Date.now()) {
                const error = new customError_1.default("This token has expired!", 400);
                throw error;
            }
            const newPassword = (0, hash_1.createHash)(password);
            yield (0, users_dao_1.updateUser)(user[0].id, "password", newPassword);
            yield (0, users_dao_1.updateUser)(user[0].id, "resetPasswordToken", "");
            yield (0, users_dao_1.updateUser)(user[0].id, "resetPasswordExpires", 0);
        }
        catch (error) {
            return next(error);
        }
    });
}
function loginGoogle(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!req.user) {
                throw new customError_1.default("Auth error", 500);
            }
            const user = req.user;
            const token = (0, jwt_1.createToken)(user);
            return res
                .cookie("token", token, {
                httpOnly: true,
                secure: true,
                maxAge: 3600000,
                sameSite: "none",
            })
                .redirect("https://ai-trainer-app.vercel.app/");
        }
        catch (error) {
            return next(error);
        }
    });
}
function logout(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = (0, genericResponses_1.default)(200, "Loged out");
            return res
                .clearCookie("token", { secure: true, sameSite: "none" })
                .json(response);
        }
        catch (error) {
            return next(error);
        }
    });
}
function updateDateOfBirth(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id, date_of_birth } = req.body;
            yield (0, users_dao_1.updateUser)(id, "date_of_birth", date_of_birth);
            const response = (0, genericResponses_1.default)(200, "The account has been updated!");
            return res.json(response);
        }
        catch (error) {
            return next(error);
        }
    });
}

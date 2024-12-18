"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt_1 = require("../utils/jwt");
const customError_1 = __importDefault(require("../utils/customError"));
function validate(requiredRole) {
    return (req, res, next) => {
        try {
            const token = req.cookies["token"];
            if (requiredRole === "PUBLIC") {
                return next();
            }
            else if (!token) {
                const error = new customError_1.default("Not cookie provided!", 400);
                throw error;
            }
            const user = (0, jwt_1.verifyToken)(token);
            if (typeof user === "string") {
                throw new customError_1.default("Wrong JWT", 500);
            }
            if (requiredRole != user.role) {
                const error = new customError_1.default("Bad auth", 400);
                throw error;
            }
            else {
                return next();
            }
        }
        catch (error) {
            return next(error);
        }
    };
}
exports.default = validate;

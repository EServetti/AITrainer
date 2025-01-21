"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatorMiddleware = validatorMiddleware;
exports.validatorFunction = validatorFunction;
const customError_1 = __importDefault(require("./customError"));
function validatorMiddleware(schema) {
    return (req, res, next) => {
        try {
            const validation = schema.validate(req.body, { abortEarly: false });
            if (validation.error) {
                // console.log(validation.error);
                const message = validation.error.details.map((error) => error.message);
                const error = new customError_1.default(message.join(", "), 400);
                throw error;
            }
            return next();
        }
        catch (error) {
            return next(error);
        }
    };
}
function validatorFunction(schema, user) {
    try {
        const validation = schema.validate(user, { abortEarly: false });
        if (validation.error) {
            console.log(validation.error);
            const message = validation.error.details.map((error) => error.message);
            const error = new customError_1.default(message.join(", "), 400);
            throw error;
        }
        return;
    }
    catch (error) {
        throw error;
    }
}

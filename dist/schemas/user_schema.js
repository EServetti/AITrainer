"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUser = void 0;
const joi_1 = __importDefault(require("joi"));
exports.validateUser = joi_1.default.object({
    first_name: joi_1.default.string().min(3).max(20).required(),
    last_name: joi_1.default.string().min(3).max(25).required(),
    sex: joi_1.default.string().valid("x", "male", "female").required(),
    date_of_birth: joi_1.default.date().iso().required(),
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string()
        .min(8)
        .max(15)
        .pattern(/[A-Z]/)
        .pattern(/\d/)
        .required(),
    verified: joi_1.default.boolean(),
});

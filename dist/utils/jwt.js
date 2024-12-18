"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createToken = createToken;
exports.verifyToken = verifyToken;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const customError_1 = __importDefault(require("./customError"));
function createToken(data) {
    try {
        if (!process.env.JWT) {
            const error = new customError_1.default("Not JWT code provided!", 500);
            throw error;
        }
        const token = jsonwebtoken_1.default.sign(data, process.env.JWT, { expiresIn: 60 * 60 });
        return token;
    }
    catch (error) {
        throw error;
    }
}
function verifyToken(token) {
    try {
        if (!process.env.JWT) {
            const error = new customError_1.default("Not JWT code provided!", 500);
            throw error;
        }
        const data = jsonwebtoken_1.default.verify(token, process.env.JWT);
        return data;
    }
    catch (error) {
        throw error;
    }
}

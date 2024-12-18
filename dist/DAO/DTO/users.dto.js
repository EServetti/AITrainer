"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
class UserDTO {
    constructor(data) {
        this.first_name = data.first_name;
        this.last_name = data.last_name;
        this.sex = data.sex;
        this.date_of_birth = data.date_of_birth;
        this.email = data.email;
        this.password = data.password;
        this.verifyCode = crypto_1.default.randomBytes(6).toString("hex");
        this.verified = data.verified || false;
        this.role = data.role || "USER";
    }
}
exports.default = UserDTO;

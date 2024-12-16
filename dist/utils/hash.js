"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createHash = createHash;
const bcryptjs_1 = require("bcryptjs");
function createHash(password) {
    try {
        const salt = (0, bcryptjs_1.genSaltSync)(10);
        const hashedPass = (0, bcryptjs_1.hashSync)(password, salt);
        return hashedPass;
    }
    catch (error) {
        throw error;
    }
}

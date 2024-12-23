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
exports.createUser = createUser;
exports.readUsers = readUsers;
exports.readByEmail = readByEmail;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
const promise_1 = __importDefault(require("mysql2/promise"));
const customError_1 = __importDefault(require("../utils/customError"));
const users_dto_1 = __importDefault(require("./DTO/users.dto"));
const database = promise_1.default.createPool({
    host: "localhost",
    user: "root",
    password: process.env.DATABASE_PASSWORD,
    database: "aitrainer_dev",
});
function createUser(data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userData = new users_dto_1.default(data);
            const [result] = yield database.query(`insert into users (first_name, last_name, sex, date_of_birth, email, password, verifyCode, verified, role, photo) values(?,?,?,?,?,?,?,?,?,?);`, [
                userData.first_name,
                userData.last_name,
                userData.sex,
                userData.date_of_birth,
                userData.email,
                userData.password,
                userData.verifyCode,
                userData.verified,
                userData.role,
                userData.photo
            ]);
            const [rows] = yield database.query("SELECT * FROM USERS WHERE email = ?", [data.email]);
            return rows;
        }
        catch (error) {
            throw error;
        }
    });
}
function readUsers(filter) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (filter) {
                const allowedColumns = [
                    "first_name",
                    "last_name",
                    "email",
                    "password",
                    "verified",
                    "date_of_birth",
                    "resetPasswordToken"
                ];
                if (!allowedColumns.includes(filter.column)) {
                    const error = new customError_1.default("Not valid column!", 400);
                    throw error;
                }
                const [rows] = yield database.query(`select * from users where ${filter.column} = ?`, [filter.value]);
                return rows;
            }
            else {
                const [rows] = yield database.query("select * from users");
                return rows;
            }
        }
        catch (error) {
            throw error;
        }
    });
}
function readByEmail(email) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const [rows] = yield database.query("select * from users where email = ?;", [email]);
            return rows;
        }
        catch (error) {
            throw error;
        }
    });
}
function updateUser(id_user, column, newValue) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const allowedColumns = [
                "first_name",
                "last_name",
                "email",
                "password",
                "verified",
                "date_of_birth",
                "resetPasswordToken",
                "resetPasswordExpires"
            ];
            if (!allowedColumns.includes(column)) {
                const error = new customError_1.default("Not valid column!", 400);
                throw error;
            }
            const [result] = yield database.query(`update users set ${column} = ? where id = ?;`, [newValue, id_user]);
            return result;
        }
        catch (error) {
            throw error;
        }
    });
}
function deleteUser(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const [result] = yield database.query("delete from users where id = ?", [id]);
            return result;
        }
        catch (error) {
            throw error;
        }
    });
}

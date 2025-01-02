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
exports.create = create;
exports.readData = readData;
exports.update = update;
const promise_1 = __importDefault(require("mysql2/promise"));
const customError_1 = __importDefault(require("../utils/customError"));
const database = promise_1.default.createPool({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: "aitrainer_dev",
});
function create(data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const [result] = yield database.query("insert into user_data (user_id, weight, height, goal, bodyType, difficulty) values(?,?,?,?,?,?)", [
                data.user_id,
                data.weight,
                data.height,
                data.goal,
                data.bodyType,
                data.difficulty,
            ]);
            return result;
        }
        catch (error) {
            throw error;
        }
    });
}
function readData(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const [rows] = yield database.query("select * from user_data where user_id = ?", [id]);
            return rows;
        }
        catch (error) {
            throw error;
        }
    });
}
function update(id, column, newValue) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const allowedColumns = [
                "user_id",
                "weight",
                "height",
                "difficulty",
                "bodyType",
                "goal"
            ];
            if (!allowedColumns.includes(column)) {
                const error = new customError_1.default("Not valid column!", 400);
                throw error;
            }
        }
        catch (error) {
            throw error;
        }
    });
}

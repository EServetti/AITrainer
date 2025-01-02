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
exports.create_data = create_data;
const user_data_dao_1 = require("../DAO/user_data_dao");
const genericResponses_1 = __importDefault(require("../utils/genericResponses"));
function create_data(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield (0, user_data_dao_1.create)(req.body);
            const response = (0, genericResponses_1.default)(200, "The data has been saved");
            return res.json(response);
        }
        catch (error) {
            return next(error);
        }
    });
}

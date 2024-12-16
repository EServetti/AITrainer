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
exports.getPlan = getPlan;
const genericResponses_1 = __importDefault(require("../utils/genericResponses"));
const openAI_1 = __importDefault(require("../utils/openAI"));
function getPlan(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { age, weight, height, daysOfTraining, goal, extra, trainingTime, sex, bodyType, dificulty } = req.body;
            const plan = yield (0, openAI_1.default)(weight, height, daysOfTraining, age, goal, trainingTime, sex, extra, bodyType, dificulty);
            const response = (0, genericResponses_1.default)(200, plan);
            return res.json(response);
        }
        catch (error) {
            return next(error);
        }
    });
}

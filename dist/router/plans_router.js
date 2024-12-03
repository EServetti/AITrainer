"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const plans_controller_1 = require("../controllers/plans_controller");
const joi_validator_1 = __importDefault(require("../utils/joi_validator"));
const plan_schema_1 = __importDefault(require("../schemas/plan_schema"));
const planRouter = (0, express_1.Router)();
//Rutas para pedido de planes
planRouter.post("/plan", (0, joi_validator_1.default)(plan_schema_1.default), plans_controller_1.getPlan);
exports.default = planRouter;

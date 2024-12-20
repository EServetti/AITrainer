"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const plans_controller_1 = require("../controllers/plans_controller");
const joi_validator_1 = require("../utils/joi_validator");
const plan_schema_1 = __importDefault(require("../schemas/plan_schema"));
const validate_1 = __importDefault(require("../middlewares/validate"));
const planRouter = (0, express_1.Router)();
//Rutas para pedido de planes
planRouter.post("/plan", (0, validate_1.default)(["PUBLIC"]), (0, joi_validator_1.validatorMiddleware)(plan_schema_1.default), plans_controller_1.getPlan);
exports.default = planRouter;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const plans_router_1 = __importDefault(require("./plans_router"));
const indexRouter = (0, express_1.Router)();
function logPetitions(req, res, next) {
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, "0");
    const day = now.getDate().toString().padStart(2, "0");
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const date = `${day}/${month}/${year} | ${hours}:${minutes}`;
    const petition = `${date} | ${req.method} | ${req.url}`;
    console.log(petition);
    next();
}
indexRouter.use("/", logPetitions, plans_router_1.default);
exports.default = indexRouter;

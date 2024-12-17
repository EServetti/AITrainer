"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport_1 = __importDefault(require("../middlewares/passport"));
const sessions_controller_1 = require("../controllers/sessions_controller");
const usersRouter = (0, express_1.Router)();
usersRouter.post("/register", passport_1.default.authenticate("register", { session: false }), sessions_controller_1.register);
usersRouter.post("/verify/:email/:verifyCode", sessions_controller_1.verifyAccount);
exports.default = usersRouter;

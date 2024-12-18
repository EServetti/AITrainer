"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport_1 = __importDefault(require("../middlewares/passport"));
const sessions_controller_1 = require("../controllers/sessions_controller");
const validate_1 = __importDefault(require("../middlewares/validate"));
const usersRouter = (0, express_1.Router)();
usersRouter.post("/register", (0, validate_1.default)("PUBLIC"), passport_1.default.authenticate("register", { session: false }), sessions_controller_1.register);
usersRouter.post("/verify/:email/:verifyCode", (0, validate_1.default)("PUBLIC"), sessions_controller_1.verifyAccount);
usersRouter.post("/login", (0, validate_1.default)("PUBLIC"), passport_1.default.authenticate("login", { session: false }), sessions_controller_1.login);
exports.default = usersRouter;

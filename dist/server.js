"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const index_router_1 = __importDefault(require("./router/index_router"));
const errorHandler_1 = __importDefault(require("./middlewares/errorHandler"));
const cors_1 = __importDefault(require("cors"));
const pathHandler_1 = __importDefault(require("./middlewares/pathHandler"));
dotenv_1.default.config();
const port = process.env.PORT || 3000;
const server = (0, express_1.default)();
const startCb = () => {
    console.log(`Server running on port ${port}`);
};
server.listen(port, startCb);
//Middlewares
server.use(express_1.default.json());
server.use(express_1.default.urlencoded({ extended: true }));
const corsOptions = {
    origin: 'https://ai-trainer-app.vercel.app',
    credentials: true
};
server.use((0, cors_1.default)(corsOptions));
//Routers
server.use(index_router_1.default);
server.use(errorHandler_1.default);
server.use(pathHandler_1.default);

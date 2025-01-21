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
const cluster_1 = __importDefault(require("cluster"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
dotenv_1.default.config();
const port = process.env.PORT || 3000;
const server = (0, express_1.default)();
const startCb = () => {
    console.log(`Server running on port ${port}`);
};
if (cluster_1.default.isPrimary) {
    for (let i = 1; i <= 2; i++) {
        const worker = cluster_1.default.fork();
        worker.on('error', (err) => {
            console.error(`Worker ${worker.process.pid} encountered an error: ${err.message}`);
        });
    }
    console.log("proceso primario");
}
else {
    console.log("proceso worker " + process.pid);
    server.listen(port, startCb);
}
//Middlewares
const corsOptions = {
    origin: 'https://ai-trainer-app.vercel.app',
    credentials: true
};
// const corsOptions = {
//   origin: 'http://localhost:5173',
//   credentials: true
// };
server.use((0, cookie_parser_1.default)(process.env.SECRET_COOKIE));
server.use((0, cors_1.default)(corsOptions));
server.use(express_1.default.json());
server.use(express_1.default.urlencoded({ extended: true }));
//Routers
server.use(index_router_1.default);
server.use(errorHandler_1.default);
server.use(pathHandler_1.default);

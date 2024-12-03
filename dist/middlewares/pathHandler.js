"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function pathHandler(req, res, next) {
    res.json({
        statusCode: 400,
        message: `${req.method} | ${req.url} Not found path`
    });
}
exports.default = pathHandler;

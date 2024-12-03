"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const herrorHandler = (error, req, res, next) => {
    console.log(error);
    res.json({
        statusCode: error.statusCode || 500,
        message: error.message || "API error",
    });
};
exports.default = herrorHandler;

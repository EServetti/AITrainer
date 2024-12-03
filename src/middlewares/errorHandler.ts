import { Request, Response, NextFunction, ErrorRequestHandler } from "express";

const herrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  console.log(error);
  res.json({
    statusCode: error.statusCode || 500,
    message: error.message || "API error",
  });
};

export default herrorHandler;

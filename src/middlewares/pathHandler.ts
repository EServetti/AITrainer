import { Request, Response, NextFunction } from "express";

function pathHandler(req: Request, res: Response, next: NextFunction){
    res.json({
        statusCode: 400,
        message: `${req.method} | ${req.url} Not found path`
    })
}

export default pathHandler
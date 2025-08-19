import { NextFunction, Request, Response } from "express";
import { customRequest } from "./verifyToken";

function isAdmin(req: customRequest, res: Response, next: NextFunction){
    if(req.user.userInfo.role !== "ADMIN"){
        return res.status(403).json({
            "error": "access denied, admins only"
        })
    }

    return next()
}

export default isAdmin
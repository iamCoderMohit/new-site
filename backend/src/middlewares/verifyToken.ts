import { NextFunction, Request, Response } from "express";
import jwt, { decode } from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET ?? ""

export interface customRequest extends Request{
    user?: any
}

function validateUser(req: customRequest, res: Response, next: NextFunction){
    const authorization = req.headers.authorization || ""
    
    try {
        const decoded = jwt.verify(authorization, JWT_SECRET)

        req.user = decoded

        return next()
    } catch (error) {
        return res.status(500).json({
            "error": "unauthorized"
        })  
    }
}

export default validateUser
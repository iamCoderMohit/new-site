"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = (_a = process.env.JWT_SECRET) !== null && _a !== void 0 ? _a : "";
function validateUser(req, res, next) {
    const authorization = req.headers.authorization || "";
    try {
        const decoded = jsonwebtoken_1.default.verify(authorization, JWT_SECRET);
        req.user = decoded;
        return next();
    }
    catch (error) {
        return res.status(500).json({
            "error": "unauthorized"
        });
    }
}
exports.default = validateUser;

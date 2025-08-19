"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const prisma_1 = require("../config/prisma");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyToken_1 = __importDefault(require("../middlewares/verifyToken"));
const userRouter = express_1.default.Router();
const JWT_SECRET = process.env.JWT_SECRET;
userRouter.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    try {
        const userExists = yield prisma_1.prisma.user.findUnique({
            where: { email },
        });
        if (userExists) {
            return res.status(500).json({
                error: "user already exists",
            });
        }
        const user = yield prisma_1.prisma.user.create({
            data: {
                name,
                email,
                password,
            },
        });
        const userInfo = yield prisma_1.prisma.user.findUnique({
            where: { email },
            select: { id: true, role: true },
        });
        const token = jsonwebtoken_1.default.sign({ email, userInfo }, JWT_SECRET !== null && JWT_SECRET !== void 0 ? JWT_SECRET : "SOME_DEFAULT_SECRET");
        res.json({
            token,
        });
    }
    catch (error) {
        res.status(500).json({
            error,
        });
    }
}));
userRouter.post("/signin", verifyToken_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield prisma_1.prisma.user.findUnique({
            where: { email },
        });
        if (!user || user.password !== password) {
            return res.status(401).json({
                error: "invalid email or password",
            });
        }
        const userInfo = yield prisma_1.prisma.user.findUnique({
            where: { email },
            select: { id: true, role: true },
        });
        const token = jsonwebtoken_1.default.sign({ email, userInfo }, JWT_SECRET !== null && JWT_SECRET !== void 0 ? JWT_SECRET : "SOME_DEFAULT_SECRET");
        return res.json({
            token,
        });
    }
    catch (error) {
        return res.status(500).json({
            error,
        });
    }
}));
exports.default = userRouter;

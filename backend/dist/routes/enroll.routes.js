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
const verifyToken_1 = __importDefault(require("../middlewares/verifyToken"));
const prisma_1 = require("../config/prisma");
const isAdmin_1 = __importDefault(require("../middlewares/isAdmin"));
const enrollRouter = express_1.default.Router();
enrollRouter.post("/:courseId", verifyToken_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { courseId } = req.params;
    const userId = req.user.userInfo.id;
    try {
        yield prisma_1.prisma.enrollment.create({
            data: {
                userId: userId,
                courseId: Number(courseId),
            },
        });
        return res.json({
            msg: "enrolled successfully",
        });
    }
    catch (error) {
        return res.status(500).json({
            error,
        });
    }
}));
enrollRouter.get("/", verifyToken_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.userInfo.id;
    try {
        const enrollments = yield prisma_1.prisma.enrollment.findMany({
            where: {
                userId,
            },
            include: {
                course: true,
            },
        });
        return res.json({
            enrollments,
        });
    }
    catch (error) {
        return res.status(500).json({
            error,
        });
    }
}));
enrollRouter.get("/admin/enrollments", verifyToken_1.default, isAdmin_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const enrollments = yield prisma_1.prisma.enrollment.findMany();
        return res.json({
            enrollments,
        });
    }
    catch (error) {
        return res.status(500).json({
            error,
        });
    }
}));
enrollRouter.get("/admin/enrollments/:courseId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { courseId } = req.params;
    try {
        const enrollments = yield prisma_1.prisma.enrollment.findMany({
            where: {
                courseId: Number(courseId),
            },
        });
        return res.json({
            enrollments,
        });
    }
    catch (error) {
        return res.status(500).json({
            error,
        });
    }
}));
enrollRouter.delete('/admin/enrollments/:userId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    try {
        yield prisma_1.prisma.enrollment.deleteMany({
            where: {
                userId: Number(userId)
            }
        });
        return res.json({
            "msg": "removed successfully"
        });
    }
    catch (error) {
        return res.status(500).json({
            error
        });
    }
}));
exports.default = enrollRouter;

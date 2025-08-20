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
const verifyToken_1 = __importDefault(require("../middlewares/verifyToken"));
const isAdmin_1 = __importDefault(require("../middlewares/isAdmin"));
const courseRouter = express_1.default.Router();
courseRouter.post("/", verifyToken_1.default, isAdmin_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, price, thumbnail } = req.body;
    try {
        const course = yield prisma_1.prisma.course.create({
            data: {
                title,
                description,
                price,
                thumbnail
            },
        });
        return res.json({
            course,
        });
    }
    catch (error) {
        return res.status(500).json({
            error,
        });
    }
}));
courseRouter.put("/:courseId", verifyToken_1.default, isAdmin_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { courseId } = req.params;
    const { title, description, price, thumbnail } = req.body;
    try {
        const course = yield prisma_1.prisma.course.update({
            where: {
                id: Number(courseId),
            },
            data: {
                title,
                description,
                price,
                thumbnail
            },
        });
        return res.json({
            course,
        });
    }
    catch (error) {
        return res.status(500).json({
            error,
        });
    }
}));
courseRouter.delete("/:courseId", verifyToken_1.default, isAdmin_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { courseId } = req.params;
    try {
        yield prisma_1.prisma.course.delete({
            where: {
                id: Number(courseId),
            },
        });
        return res.json({
            msg: "course deleted successfully",
        });
    }
    catch (error) {
        return res.status(500).json({
            error,
        });
    }
}));
courseRouter.get('/all', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const courses = yield prisma_1.prisma.course.findMany();
        return res.json({
            courses
        });
    }
    catch (error) {
        return res.status(500).json({
            error
        });
    }
}));
courseRouter.get('/:courseId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { courseId } = req.params;
    try {
        const course = yield prisma_1.prisma.course.findUnique({
            where: {
                id: Number(courseId)
            }
        });
        return res.json({
            course
        });
    }
    catch (error) {
        return res.status(500).json({
            error
        });
    }
}));
courseRouter.get('/reviews/:courseId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { courseId } = req.params;
    try {
        const reviews = yield prisma_1.prisma.course.findMany({
            where: {
                id: Number(courseId)
            },
            select: {
                review: true
            }
        });
        return res.json({
            reviews
        });
    }
    catch (error) {
        return res.status(500).json({
            error
        });
    }
}));
exports.default = courseRouter;

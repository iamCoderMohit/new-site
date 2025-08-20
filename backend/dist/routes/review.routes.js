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
const reviewRouter = express_1.default.Router();
reviewRouter.post('/:courseId', verifyToken_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { courseId } = req.params;
    const userId = req.user.userInfo.id;
    const { rating, comment } = req.body;
    try {
        const review = yield prisma_1.prisma.review.create({
            data: {
                rating,
                comment,
                courseId: Number(courseId),
                userId: userId
            }
        });
        return res.json({
            review
        });
    }
    catch (error) {
        return res.status(500).json({
            error
        });
    }
}));
reviewRouter.delete('/:reviewId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { reviewId } = req.params;
    try {
        yield prisma_1.prisma.review.delete({
            where: {
                id: Number(reviewId)
            }
        });
        return res.json({
            "msg": "review deleted successfully"
        });
    }
    catch (error) {
        return res.status(500).json({
            error
        });
    }
}));
exports.default = reviewRouter;

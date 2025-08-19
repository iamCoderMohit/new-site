"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const course_routes_1 = __importDefault(require("./routes/course.routes"));
const enroll_routes_1 = __importDefault(require("./routes/enroll.routes"));
const review_routes_1 = __importDefault(require("./routes/review.routes"));
const certificate_routes_1 = __importDefault(require("./routes/certificate.routes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/api/v1/user', user_routes_1.default);
app.use('/api/v1/course', course_routes_1.default);
app.use('/api/v1/enroll', enroll_routes_1.default);
app.use('/api/v1/review', review_routes_1.default);
app.use('/api/v1/certificate', certificate_routes_1.default);
exports.default = app;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isAdmin(req, res, next) {
    if (req.user.userInfo.role !== "ADMIN") {
        return res.status(403).json({
            "error": "access denied, admins only"
        });
    }
    return next();
}
exports.default = isAdmin;

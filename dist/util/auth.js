"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRefreshToken = exports.createAccessToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
require("dotenv/config");
const createAccessToken = (user) => {
    return jsonwebtoken_1.sign({
        id: user._id,
        tag: user.account.tag,
    }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
};
exports.createAccessToken = createAccessToken;
const createRefreshToken = (user) => {
    return jsonwebtoken_1.sign({
        id: user._id,
    }, process.env.REFRESH_TOEKEN_SECRET, { expiresIn: "7d" });
};
exports.createRefreshToken = createRefreshToken;
//# sourceMappingURL=auth.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRefreshToken = exports.createAccessToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const config_1 = require("../../config");
const createAccessToken = (user) => {
    return jsonwebtoken_1.sign({
        id: user.id,
        tag: user.account.tag,
    }, config_1.dbKeys.SECRET_KEY, { expiresIn: "15m" });
};
exports.createAccessToken = createAccessToken;
const createRefreshToken = (user) => {
    return jsonwebtoken_1.sign({
        id: user.id,
    }, config_1.dbKeys.R_SECRET_KEY, { expiresIn: "7d" });
};
exports.createRefreshToken = createRefreshToken;
//# sourceMappingURL=auth.js.map
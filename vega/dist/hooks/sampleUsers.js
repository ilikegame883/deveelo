"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRandomUser = void 0;
const User_1 = __importDefault(require("../models/User"));
const getRandomUser = async (onlyId) => {
    const user = await User_1.default.aggregate([{ $sample: { size: 1 } }]);
    if (onlyId) {
        return user._id;
    }
    else {
        return user;
    }
};
exports.getRandomUser = getRandomUser;
//# sourceMappingURL=sampleUsers.js.map
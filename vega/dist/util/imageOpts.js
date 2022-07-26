"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertToWebpPfp = void 0;
const sharp_1 = __importDefault(require("sharp"));
exports.convertToWebpPfp = sharp_1.default()
    .resize({
    width: 400,
    height: 400,
    fit: "cover",
})
    .webp({ quality: 75 });
//# sourceMappingURL=imageOpts.js.map
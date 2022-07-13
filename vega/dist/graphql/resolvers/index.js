"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_upload_1 = require("graphql-upload");
const posts_1 = __importDefault(require("./posts"));
const users_1 = __importDefault(require("./users"));
const uploads_1 = __importDefault(require("./uploads"));
const resolvers = {
    Upload: graphql_upload_1.GraphQLUpload,
    Query: Object.assign(Object.assign({}, users_1.default.Query), posts_1.default.Query),
    Mutation: Object.assign(Object.assign({}, users_1.default.Mutation), uploads_1.default.Mutation),
};
exports.default = resolvers;
//# sourceMappingURL=index.js.map
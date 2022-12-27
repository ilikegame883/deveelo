"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const User_1 = __importDefault(require("../../models/User"));
const Post_1 = __importDefault(require("../../models/Post"));
const postsResolvers = {
    Query: {
        getPosts: async (_parent, { number }, _context) => {
            try {
                const posts = await Post_1.default.find().sort({ _id: -1 }).limit(number);
                return posts;
            }
            catch (err) {
                throw new Error(err);
            }
        },
        getPostsByTag: async (_parent, { tag, number }, _context) => {
            const user = await User_1.default.findOne({ "account.tag": tag });
            if (!user) {
                throw new Error("user not found");
            }
            try {
                const posts = await Post_1.default.find({ user_id: user._id }).sort({ _id: -1 }).limit(number);
                return posts;
            }
            catch (err) {
                throw new Error(err);
            }
        },
    },
    Mutation: {
        like: async (_parent, { id }, context) => {
            const myID = context.payload.id;
            try {
                await Post_1.default.findByIdAndUpdate(new mongodb_1.ObjectID(id), { $addToSet: { likes: myID } }, { useFindAndModify: false });
                return {
                    success: true,
                };
            }
            catch (error) {
                throw new Error(error);
            }
        },
        unlike: async (_parent, { id }, context) => {
            const myID = context.payload.id;
            try {
                await Post_1.default.findByIdAndUpdate(new mongodb_1.ObjectID(id), { $pull: { likes: myID } }, { useFindAndModify: false });
                return {
                    success: true,
                };
            }
            catch (error) {
                throw new Error(error);
            }
        },
    },
};
exports.default = postsResolvers;
//# sourceMappingURL=posts.js.map
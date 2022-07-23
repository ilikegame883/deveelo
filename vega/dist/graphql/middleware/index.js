"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const resolvers_composition_1 = require("@graphql-tools/resolvers-composition");
const resolvers_1 = __importDefault(require("../resolvers"));
const isAuth_1 = require("./isAuth");
const noMiddleware = () => (next) => async (parent, args, context, info) => {
    const result = await next(parent, args, context, info);
    return result;
};
const resolversComposition = {
    Query: {
        myAccount: [isAuth_1.loggedInOnlyAuth()],
    },
    Mutation: {
        logout: [isAuth_1.loggedInOnlyAuth()],
        follow: [isAuth_1.loggedInOnlyAuth()],
        unfollow: [isAuth_1.loggedInOnlyAuth()],
        updateProfile: [isAuth_1.loggedInOnlyAuth()],
    },
};
const composedResolvers = resolvers_composition_1.composeResolvers(resolvers_1.default, resolversComposition);
//# sourceMappingURL=index.js.map
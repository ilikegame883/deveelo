"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddlewares = void 0;
const isAuth_1 = require("./isAuth");
exports.authMiddlewares = [isAuth_1.isAuth];
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
//# sourceMappingURL=index.js.map
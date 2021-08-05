"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuth = void 0;
const loggedInOnlyAuth = async (reslolve, parent, args, context, info) => { };
exports.isAuth = {
    Query: {
        getPosts: loggedInOnlyAuth,
    },
};
//# sourceMappingURL=isAuth.js.map